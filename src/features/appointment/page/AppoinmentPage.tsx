import Header from "@/components/common/Header/Header"
import SubHeader from "@/components/common/SubHeader/SubHeader"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import CreateAppointment from "../component/CreateAppointment"
import { Table } from "@/components/common"
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
            render: (row: any,) => row.patient_mobile
        },
        {
            key: "patient_email",
            name: "Email",
            minWidth: "150px",
            flexGrow: "0.5",
            render: (row: any,) => row.patient_email
        },
        {
            key: "doctor_name",
            name: "Doctor Name",
            minWidth: "150px",
            flexGrow: "0.5",
            render: (row: any,) => row.doctor_name
        },
        {
            key: "department_name",
            name: "Department",
            minWidth: "150px",
            flexGrow: "0.5",
            render: (row: any,) => row.department_name
        },
        {
            key: "appointment_date",
            name: "Date",
            minWidth: "150px",
            flexGrow: "0.5",
            render: (row: any,) => row.appointment_date
        },
        {
            key: "appointment_time",
            name: "Time",
            minWidth: "150px",
            flexGrow: "0.5",
            render: (row: any,) => row.appointment_time
        },
        {
            key: "appointment_type",
            name: "Type",
            minWidth: "150px",
            flexGrow: "0.5",
            render: (row: any,) => row.appointment_type
        },
        {
            key: "appointment_status",
            name: "Status",
            minWidth: "150px",
            flexGrow: "0.5",
            render: (row: any,) => row.appointment_status
        },
        {
            key: "appointment_notes",
            name: "Notes",
            minWidth: "150px",
            flexGrow: "0.5",
            render: (row: any,) => row.appointment_notes
        },
        {
            key: "created_at",
            name: "Created At",
            minWidth: "150px",
            flexGrow: "0.5",
            render: (row: any,) => row.created_at
        },
        {
            key: "updated_at",
            name: "Updated At",
            minWidth: "150px",
            flexGrow: "0.5",
            render: (row: any,) => row.updated_at
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
                <Button onClick={handleCreateAppointment}>Create Appointment</Button>
            </SubHeader>

            <Table
                config={{ columns }}
                data={appoinmentData}
                isLoading={isLoading}
                emptyMessage="No Appointments Found"
            ></Table>


            {/* create appointment dialog */}
            {createAppointmentOpen &&
                <CreateAppointment
                    open={createAppointmentOpen}
                    onClose={() => setCreateAppointmentOpen(false)}
                />
            }
        </>
    )
}

export default AppoinmentPage