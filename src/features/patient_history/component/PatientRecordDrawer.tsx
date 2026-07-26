import { Text } from "@/components/common"
import { Divider, RecordBox } from "../style/PatientHistroyStyle"
import { useState } from "react"
import { ChevronDown, ChevronUp, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import AddRecordDialog from "./AddRecordDialog"

const PatientRecordDrawer = () => {
    const [openRecords, setOpenRecords] = useState<Set<number>>(new Set())
    const [showAddRecord, setShowAddRecord] = useState(false)

    const toggleRecord = (index: number) => {
        setOpenRecords(prev => {
            const next = new Set(prev)
            next.has(index) ? next.delete(index) : next.add(index)
            return next
        })
    }

    const recordData = [
        {
            date: "24/07/2026 10:00 AM",
            symptoms: "Fever, Cough, Cold",
            diagnosis: "Viral Infection",
            reports: "*"
        },
        {
            date: "20/07/2026 10:00 AM",
            symptoms: "Fever, Cough, Cold",
            diagnosis: "Viral Infection",
            reports: "*"
        }
    ]
    return (
        <>
            <Button onClick={() => setShowAddRecord(true)}>Add Record</Button>
            {recordData.map((item, index) => (
                <RecordBox key={index}>
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleRecord(index)}>
                        <Text fontSize="12px" fontWeight="bold">{item.date}</Text>
                        <div className="flex items-center gap-2">
                            <Edit className="w-4 h-4s" />
                            {openRecords.has(index) ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                        </div>
                    </div>
                    {openRecords.has(index) && (
                        <>
                            <Divider />
                            <div className="flex items-center gap-2">
                                <Text fontSize="12px" fontWeight="bold">Symptoms : </Text>
                                <Text fontSize="12px">{item.symptoms}</Text>
                            </div>
                            <div className="flex items-center gap-2">
                                <Text fontSize="12px" fontWeight="bold">Diagnosis : </Text>
                                <Text fontSize="12px">{item.diagnosis}</Text>
                            </div>
                            <div className="flex items-center gap-2">
                                <Text fontSize="12px" fontWeight="bold">Reports : </Text>
                                <Text fontSize="12px">{item.reports}</Text>
                            </div>
                        </>
                    )}
                </RecordBox>
            ))}
            <AddRecordDialog open={showAddRecord} onClose={() => setShowAddRecord(false)} />
        </>
    )
}

export default PatientRecordDrawer