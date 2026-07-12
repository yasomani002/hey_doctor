import Header from "@/components/common/Header/Header"
import SubHeader from "@/components/common/SubHeader/SubHeader"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import CreateAppointmentDialog from "../component/CreateAppointmentDialog"
import { Table, Text } from "@/components/common"
import useGetAppoinmentList from "../hook/useGetAppoinmentList"

const AppoinmentPage = () => {
    const [createAppointmentOpen, setCreateAppointmentOpen] = useState(false)

    const { data, isLoading } = useGetAppoinmentList()
    const appoinmentData = data?.data?.data || []
    const handleCreateAppointment = () => {
        setCreateAppointmentOpen(true)
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
            render: (row: any,) => (<Text fontSize="12px" >{row.patient_mobile}</Text>)
        },
        {
            key: "patient_gender",
            name: "Gender",
            minWidth: "150px",
            flexGrow: "0.5",
            render: (row: any,) => (
                <>
                    <Text fontSize="12px" >{row.gender} - {row.age}</Text>
                </>
            )
        },
        {
            key: "date_of_birth",
            name: "Date of Birth",
            minWidth: "150px",
            flexGrow: "0.5",
            render: (row: any) => row.date_of_birth
        },
        {
            key: "appointment_date",
            name: "Date",
            minWidth: "150px",
            flexGrow: "0.5",
            render: (row: any,) => (
                <>
                    <Text fontSize="12px" >{row.appointment_date}</Text>
                    <Text fontSize="10px">{row.appointment_time}</Text>
                </>
            )
        },
        {
            key: "created_at",
            name: "Created At",
            minWidth: "150px",
            flexGrow: "0.5",
            render: (row: any,) => row.created_at
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
                <Button onClick={handleCreateAppointment} className="cursor-pointer">Create Appointment</Button>
            </SubHeader>

            <Table
                config={{ columns }}
                data={appoinmentData}
                isLoading={isLoading}
                emptyMessage="No Appointments Found"
            ></Table>


            {/* create appointment dialog */}
            {createAppointmentOpen &&
                <CreateAppointmentDialog
                    open={createAppointmentOpen}
                    onClose={() => setCreateAppointmentOpen(false)}
                />
            }
        </>
    )
}

export default AppoinmentPage