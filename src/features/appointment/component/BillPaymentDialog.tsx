import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { BillPaymentSchema } from "../schema/index"
import type z from "zod"
import InputBox from "@/components/common/InputBox/InputBox"
import { Input } from "@/components/ui/input"

type TBillPayment = z.infer<typeof BillPaymentSchema>

const PAYMENT_METHODS: { value: TBillPayment["payment_method"]; label: string; icon: string }[] = [
    { value: "cash", label: "Cash", icon: "💵" },
    { value: "card", label: "Card", icon: "💳" },
    { value: "upi", label: "UPI", icon: "📲" },
]

interface Props {
    open: boolean
    onClose: () => void
    patientName: string
    appointmentId?: string
}

const BillPaymentDialog = ({ open, onClose, patientName, appointmentId }: Props) => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<TBillPayment>({
        resolver: zodResolver(BillPaymentSchema),
        defaultValues: {
            patient_name: patientName,
            bill_amount: undefined,
            payment_method: "cash",
            notes: "",
        },
    })

    useEffect(() => {
        if (open) {
            reset({
                patient_name: patientName,
                bill_amount: undefined,
                payment_method: "cash",
                notes: "",
            })
        }
    }, [open, patientName, reset])

    const selectedMethod = watch("payment_method")

    const onSubmit = (data: TBillPayment) => {
        console.log("Bill Payment submitted:", { ...data, appointmentId })
        // TODO: call your API here
        reset()
        onClose()
    }

    const handleClose = () => {
        reset()
        onClose()
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <DialogHeader>
                        {/* Receipt icon header */}
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            marginBottom: "4px",
                        }}>
                            <span style={{
                                fontSize: "28px",
                                lineHeight: 1,
                                background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                                borderRadius: "10px",
                                padding: "8px",
                                display: "inline-flex",
                            }}>🧾</span>
                            <div>
                                <DialogTitle style={{ margin: 0 }}>Bill Payment</DialogTitle>
                                <DialogDescription style={{ margin: 0 }}>
                                    Generate and record payment for this appointment.
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="space-y-4">

                        {/* Patient Name */}
                        <InputBox label="Patient Name" required>
                            <Input
                                type="text"
                                {...register("patient_name")}
                            />
                        </InputBox>

                        {/* Bill Amount */}
                        <InputBox
                            label="Bill Amount (₹)"
                            error={errors.bill_amount?.message}
                            required
                        >
                            <div style={{ position: "relative" }}>
                                <span style={{
                                    position: "absolute",
                                    left: "12px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: "#8c8c8c",
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    pointerEvents: "none",
                                    zIndex: 1,
                                }}>₹</span>
                                <Input
                                    type="number"
                                    min={0}
                                    step="0.01"
                                    placeholder="0.00"
                                    style={{ paddingLeft: "28px" }}
                                    {...register("bill_amount", { valueAsNumber: true })}
                                />
                            </div>
                        </InputBox>

                        {/* Payment Method — pill toggle */}
                        <div>
                            <label style={{
                                display: "block",
                                fontSize: "13px",
                                fontWeight: 600,
                                color: "#374151",
                                marginBottom: "8px",
                            }}>
                                Payment Method <span style={{ color: "#ef4444" }}>*</span>
                            </label>
                            <div style={{ display: "flex", gap: "8px" }}>
                                {PAYMENT_METHODS.map(({ value, label, icon }) => {
                                    const isActive = selectedMethod === value
                                    return (
                                        <button
                                            key={value}
                                            type="button"
                                            onClick={() => setValue("payment_method", value, { shouldValidate: true })}
                                            style={{
                                                flex: 1,
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                gap: "4px",
                                                padding: "10px 8px",
                                                borderRadius: "10px",
                                                border: isActive ? "2px solid #7c3aed" : "2px solid #e5e7eb",
                                                background: isActive ? "#f5f3ff" : "#fff",
                                                color: isActive ? "#7c3aed" : "#6b7280",
                                                fontWeight: isActive ? 700 : 500,
                                                fontSize: "12px",
                                                cursor: "pointer",
                                                transition: "all 0.15s",
                                            }}
                                        >
                                            <span style={{ fontSize: "20px", lineHeight: 1 }}>{icon}</span>
                                            {label}
                                        </button>
                                    )
                                })}
                            </div>
                            {/* hidden input to register with RHF */}
                            <input type="hidden" {...register("payment_method")} />
                            {errors.payment_method && (
                                <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>
                                    {errors.payment_method.message}
                                </p>
                            )}
                        </div>

                        {/* Notes (optional) */}
                        <InputBox label="Notes" error={errors.notes?.message}>
                            <textarea
                                rows={2}
                                placeholder="Any additional notes…"
                                {...register("notes")}
                                style={{
                                    width: "100%",
                                    padding: "8px 12px",
                                    borderRadius: "8px",
                                    border: "1px solid #e5e7eb",
                                    fontSize: "13px",
                                    resize: "vertical",
                                    fontFamily: "inherit",
                                    outline: "none",
                                    transition: "border-color 0.15s",
                                }}
                                onFocus={e => (e.currentTarget.style.borderColor = "#7c3aed")}
                                onBlur={e => (e.currentTarget.style.borderColor = "#e5e7eb")}
                            />
                        </InputBox>
                    </div>

                    <DialogFooter showCloseButton>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            style={{
                                background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                                color: "#fff",
                                fontWeight: 600,
                                minWidth: "140px",
                            }}
                        >
                            {isSubmitting ? "Processing…" : "💳 Confirm Payment"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default BillPaymentDialog
