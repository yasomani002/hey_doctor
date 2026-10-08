import Header from "@/components/common/Header/Header"
import SubHeader from "@/components/common/SubHeader/SubHeader"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import CreateAppointmentDialog from "../component/CreateAppointmentDialog"
import BillPaymentDialog from "../component/BillPaymentDialog"
import { Table, Text } from "@/components/common"
import useGetAppoinmentList from "../hook/useGetAppoinmentList"

type AppointmentStatus = "in_queue" | "consulting" | "complete"

const STATUS_CONFIG: Record<
    AppointmentStatus,
    { label: string; bg: string; color: string; dot: string }
> = {
    in_queue: {
        label: "In Queue",
        bg: "#FFF7E6",
        color: "#D46B08",
        dot: "#FA8C16",
    },
    consulting: {
        label: "Consulting",
        bg: "#E6F4FF",
        color: "#0958D9",
        dot: "#1677FF",
    },
    complete: {
        label: "Complete",
        bg: "#F6FFED",
        color: "#389E0D",
        dot: "#52C41A",
    },
}

const StatusBadge = ({ status }: { status: AppointmentStatus }) => {
    const cfg = STATUS_CONFIG[status]
    return (
        <span
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "3px 10px",
                borderRadius: "999px",
                backgroundColor: cfg.bg,
                color: cfg.color,
                fontSize: "12px",
                fontWeight: 600,
                whiteSpace: "nowrap",
                border: `1px solid ${cfg.dot}33`,
            }}
        >
            <span
                style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    backgroundColor: cfg.dot,
                    flexShrink: 0,
                }}
            />
            {cfg.label}
        </span>
    )
}

// ─── Action Dropdown ────────────────────────────────────────────────────────

interface ActionItem {
    label: string
    icon: string
    color: string
    hoverBg: string
    onClick: () => void
    disabled?: boolean
}

const ActionDropdown = ({ items }: { items: ActionItem[] }) => {
    const [open, setOpen] = useState(false)
    const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 })
    const triggerRef = useRef<HTMLButtonElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Close on outside click
    useEffect(() => {
        if (!open) return
        const handler = (e: MouseEvent) => {
            const target = e.target as Node
            if (
                triggerRef.current && !triggerRef.current.contains(target) &&
                dropdownRef.current && !dropdownRef.current.contains(target)
            ) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [open])

    const handleToggle = () => {
        if (!open && triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect()
            setDropdownPos({
                top: rect.bottom + window.scrollY + 6,
                left: rect.right + window.scrollX - 170, // right-align to button
            })
        }
        setOpen(v => !v)
    }

    const dropdown = open ? createPortal(
        <div
            ref={dropdownRef}
            style={{
                position: "absolute",
                top: dropdownPos.top,
                left: dropdownPos.left,
                minWidth: "175px",
                background: "#fff",
                border: "1px solid #e8e8e8",
                borderRadius: "10px",
                boxShadow: "0 8px 28px rgba(0,0,0,0.14)",
                zIndex: 9999,
                overflow: "hidden",
                padding: "4px 0",
            }}
        >
            {items.map((item, i) => (
                <button
                    key={i}
                    disabled={item.disabled}
                    onClick={() => { item.onClick(); setOpen(false) }}
                    style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "9px 14px",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: item.disabled ? "#bfbfbf" : item.color,
                        background: "transparent",
                        border: "none",
                        cursor: item.disabled ? "not-allowed" : "pointer",
                        textAlign: "left",
                        transition: "background 0.12s",
                        whiteSpace: "nowrap",
                    }}
                    onMouseEnter={e => {
                        if (!item.disabled) (e.currentTarget as HTMLButtonElement).style.background = item.hoverBg
                    }}
                    onMouseLeave={e => {
                        (e.currentTarget as HTMLButtonElement).style.background = "transparent"
                    }}
                >
                    <span style={{ fontSize: "15px", lineHeight: 1 }}>{item.icon}</span>
                    {item.label}
                </button>
            ))}
        </div>,
        document.body
    ) : null

    return (
        <>
            <button
                ref={triggerRef}
                onClick={handleToggle}
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "5px 12px",
                    fontSize: "12px",
                    fontWeight: 600,
                    border: "1px solid #d9d9d9",
                    borderRadius: "7px",
                    background: open ? "#f5f5f5" : "#fff",
                    color: "#262626",
                    cursor: "pointer",
                    boxShadow: open ? "0 0 0 2px #e6e6e6" : "none",
                    transition: "background 0.15s",
                    whiteSpace: "nowrap",
                }}
            >
                Actions
                <span style={{
                    display: "inline-block",
                    transform: open ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                    fontSize: "10px",
                    lineHeight: 1,
                }}>▾</span>
            </button>
            {dropdown}
        </>
    )
}

const AppoinmentPage = () => {
    const [createAppointmentOpen, setCreateAppointmentOpen] = useState(false)
    const [statusMap, setStatusMap] = useState<Record<string, AppointmentStatus>>({})
    const [billDialog, setBillDialog] = useState<{
        open: boolean
        patientName: string
        appointmentId: string
    }>({ open: false, patientName: "", appointmentId: "" })

    const { data, isLoading } = useGetAppoinmentList()
    const appoinmentData = data?.data?.data || []

    const handleCreateAppointment = () => {
        setCreateAppointmentOpen(true)
    }

    const getStatus = (row: any, index: number): AppointmentStatus => {
        const key = `${row.appointment_id}_${index}`
        return statusMap[key] ?? "in_queue"
    }

    const updateStatus = (row: any, index: number, next: AppointmentStatus) => {
        const key = `${row.appointment_id}_${index}`
        setStatusMap(prev => ({ ...prev, [key]: next }))
    }

    const handleBillPayment = (row: any) => {
        setBillDialog({
            open: true,
            patientName: row.patient_name,
            appointmentId: row.appointment_id,
        })
    }

    const columns = [
        {
            key: "Sr_no",
            name: "No",
            minWidth: "50px",
            flexGrow: "0.2",
            render: (_: any, index: number) => index + 1
        },
        {
            key: "patient_name",
            name: "Name",
            minWidth: "200px",
            flexGrow: "1",
            render: (row: any) => row.patient_name
        },
        {
            key: "patient_mobile",
            name: "Mobile",
            minWidth: "150px",
            flexGrow: "0.5",
            render: (row: any) => (<Text fontSize="12px">{row.patient_mobile}</Text>)
        },
        {
            key: "patient_gender",
            name: "Gender",
            minWidth: "150px",
            flexGrow: "0.5",
            render: (row: any) => (
                <Text fontSize="12px">{row.gender} - {row.age}</Text>
            )
        },
        {
            key: "appointment_date",
            name: "Date",
            minWidth: "150px",
            flexGrow: "0.5",
            render: (row: any) => (
                <>
                    <Text fontSize="12px">{row.appointment_date}</Text>
                    <Text fontSize="10px">{row.appointment_time}</Text>
                </>
            )
        },
        {
            key: "status",
            name: "Status",
            minWidth: "130px",
            flexGrow: "0.5",
            render: (row: any, index: number) => (
                <StatusBadge status={getStatus(row, index)} />
            )
        },
        {
            key: "actions",
            name: "Actions",
            minWidth: "130px",
            flexGrow: "0.3",
            rawCell: true,
            render: (row: any, index: number) => {
                const status = getStatus(row, index)
                const items: ActionItem[] = [
                    {
                        label: "Start Consulting",
                        icon: "▶",
                        color: "#0958D9",
                        hoverBg: "#E6F4FF",
                        disabled: status !== "in_queue",
                        onClick: () => updateStatus(row, index, "consulting"),
                    },
                    {
                        label: "Mark as Done",
                        icon: "✓",
                        color: "#389E0D",
                        hoverBg: "#F6FFED",
                        disabled: status !== "consulting",
                        onClick: () => updateStatus(row, index, "complete"),
                    },
                    {
                        label: "Bill Payment",
                        icon: "💳",
                        color: "#722ED1",
                        hoverBg: "#F9F0FF",
                        onClick: () => handleBillPayment(row),
                    },
                ]
                return <ActionDropdown items={items} />
            }
        },
    ]

    return (
        <>
            <Header
                currentPage="Appointments"
                mainPage="Operations"
            />
            <SubHeader>
                <div></div>
                <Button onClick={handleCreateAppointment} className="cursor-pointer">Add Appointment</Button>
            </SubHeader>

            <Table
                config={{ columns }}
                data={appoinmentData}
                isLoading={isLoading}
                emptyMessage="No Appointments Found"
            />

            {/* create appointment dialog */}
            {createAppointmentOpen &&
                <CreateAppointmentDialog
                    open={createAppointmentOpen}
                    onClose={() => setCreateAppointmentOpen(false)}
                />
            }

            {/* bill payment dialog */}
            <BillPaymentDialog
                open={billDialog.open}
                patientName={billDialog.patientName}
                appointmentId={billDialog.appointmentId}
                onClose={() => setBillDialog(prev => ({ ...prev, open: false }))}
            />
        </>
    )
}

export default AppoinmentPage