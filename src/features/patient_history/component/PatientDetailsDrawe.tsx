import { Tab, Text } from "@/components/common"
import { Drawer, DrawerContent, DrawerHeader } from "@/components/ui/drawer"
import { Divider } from "../style/PatientHistroyStyle"

interface props {
    open: boolean
    onClose: () => void
}

const labelValueComponent = (label: string, value: string) => {
    return (
        <div className="flex items-center gap-2 justify-between">
            <Text>{label} : </Text>
            <Text>{value}</Text>
        </div>
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
const PatientDetailsDrawe = ({ open, onClose }: props) => {
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
            value: "2001-01-01"
        },
        {
            label: "Appointment Date",
            value: "2022-01-01"
        },
        {
            label: "Appointment Time",
            value: "10:00 AM"
        },
        {
            label: "Created At",
            value: "2022-01-01"
        },
    ]
    return (
        <Drawer open={open} onOpenChange={(val) => { if (!val) onClose(); }} direction="right">
            <DrawerContent>
                <DrawerHeader>
                    <Text fontSize="18px" fontWeight="bold">Patient Details</Text>
                    <Divider />
                    <Tab tabs={TABS} activeTab="patient_details" onChange={() => { }} />
                    <div className="flex flex-col gap-2 ">
                        {patientDetails.map((item) => (
                            <>
                                {labelValueComponent(item.label, item.value)}
                            </>
                        ))}
                    </div>

                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    )
}

export default PatientDetailsDrawe