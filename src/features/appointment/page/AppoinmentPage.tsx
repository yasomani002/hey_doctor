import Header from "@/components/common/Header/Header"
import SubHeader from "@/components/common/SubHeader/SubHeader"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import CreateAppointment from "../component/CreateAppointment"
import { Table } from "@/components/common"

const AppoinmentPage = () => {
    const [createAppointmentOpen, setCreateAppointmentOpen] = useState(false)

    const handleCreateAppointment = () => {
        setCreateAppointmentOpen(true)
    }

    const columns = [
        {
            key: "Sr_no",
            name: "No",

        }
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
                data={[]}
                isLoading={false}
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