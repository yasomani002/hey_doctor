import { Tab, Text } from "@/components/common"
import { Drawer, DrawerContent, DrawerHeader } from "@/components/ui/drawer"
import { Divider } from "../style/PatientHistroyStyle"
import { useState } from "react"
import PatientRecordDrawer from "./PatientRecordDrawer"

interface props {
    open: boolean
    onClose: () => void
}

const labelValueComponent = (label: string, value: string) => {
    return (
        <>
            <div className="flex items-center gap-2 justify-between">
                <Text fontSize="12px" fontWeight="bold">{label} : </Text>
                <Text fontSize="12px">{value}</Text>
            </div>
            <Divider margin="4px 0" />
        </>
    )
}

const TABS = [
    {
        id: "patient_details",
        label: "Patient Details"
    },
    {
        id: "patient_history_data",
        label: "Patient History"
    }
]
const PatientDetailsDrawer = ({ open, onClose }: props) => {
    const [tab, setTab] = useState("patient_details")
    const changeTab = (tab: string) => {
        setTab(tab)
    }
    const patientDetails = [
        {
            label: "Name",
            value: "Yash Anilkumar Somani"
        },
        {
            label: "Mobile",
            value: "1234567890"
        },
        {
            label: "Gender",
            value: "Male"
        },
        {
            label: "Age",
            value: "25"
        },
        {
            label: "Date of Birth",
            value: "23/10/1998"
        },
        {
            label: "Appointment Date",
            value: "26/07/2026"
        },
        {
            label: "Appointment Time",
            value: "10:00 AM"
        },
        {
            label: "Created At",
            value: "26/07/2026 10:00 AM"
        },
    ]
    return (
        <Drawer open={open} onOpenChange={(val) => { if (!val) onClose(); }} direction="right">
            <DrawerContent>
                <DrawerHeader>
                    <Text fontSize="18px" fontWeight="bold">Patient Details</Text>
                    <Divider />
                    <Tab tabs={TABS} activeTab={tab} onChange={(val) => changeTab(val)} />
                    {tab === "patient_details" && (
                        <div className="flex flex-col gap-2 ">
                            {patientDetails.map((item) => (
                                <>
                                    {labelValueComponent(item.label, item.value)}
                                </>
                            ))}
                        </div>
                    )}
                    {tab === "patient_history_data" && (
                        <PatientRecordDrawer />
                    )}
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    )
}

export default PatientDetailsDrawer