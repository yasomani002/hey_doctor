import Header from "@/components/common/Header/Header"
import SubHeader from "@/components/common/SubHeader/SubHeader"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import CreateAppointment from "../component/CreateAppointment"

const AppoinmentPage = () => {
    const [createAppointmentOpen, setCreateAppointmentOpen] = useState(false)

    const handleCreateAppointment = () => {
        setCreateAppointmentOpen(true)
    }
    return (
        <>
            <Header
                currentPage="Appointments"
                mainPage="Appointment"
            />
            <SubHeader>
                <Button onClick={handleCreateAppointment}>Create Appointment</Button>
            </SubHeader>


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