// import { axiosInstance } from "@/api/axiosInstance";
// import { API_ENDPOINT } from "@/api/endpoints";
import { useQuery } from "@tanstack/react-query"

// interface payload {

// }

// const getAppoinmentList = async (payload: payload): Promise<any> => {
//     const response = await axiosInstance.post(
//         API_ENDPOINT.APPOINTMENT_LIST,
//         payload
//     );
//     return response.data;
// };

const useGetAppoinmentList = () => {
    return useQuery({
        queryKey: ["appointment-list"],
        // queryFn: getAppoinmentList
        queryFn: () => {
            return dummyData
        }
    })
}

const dummyData = {
    "status": true,
    "code": 200,
    "message": "Appointments List",
    "data": {
        "total_records": 1,
        "total_pages": 1,
        "current_page": 1,
        "data": [
            {
                "appointment_id": "APPT-00000000000000000000000000000001",
                "patient_id": "PT-00000000000000000000000000000001",
                "patient_name": "John Doe",
                "patient_mobile": "+919876543210",
                "patient_email": "smith@gmail.com",
                "doctor_id": "DOC-00000000000000000000000000000001",
                "doctor_name": "Dr. Smith",
                "department_id": "DEPT-00000000000000000000000000000001",
                "department_name": "Cardiology",
                "appointment_date": "2024-01-15",
                "appointment_time": "10:00 AM",
                "appointment_type": "OPD",
                "appointment_status": "Confirmed",
                "appointment_notes": "Routine check-up",
                "created_at": "2024-01-10T10:00:00Z",
                "updated_at": "2024-01-10T10:00:00Z"
            },
            {
                "appointment_id": "APPT-00000000000000000000000000000001",
                "patient_id": "PT-00000000000000000000000000000001",
                "patient_name": "John Doe",
                "patient_mobile": "+919876543210",
                "patient_email": "smith@gmail.com",
                "doctor_id": "DOC-00000000000000000000000000000001",
                "doctor_name": "Dr. Smith",
                "department_id": "DEPT-00000000000000000000000000000001",
                "department_name": "Cardiology",
                "appointment_date": "2024-01-15",
                "appointment_time": "10:00 AM",
                "appointment_type": "OPD",
                "appointment_status": "Confirmed",
                "appointment_notes": "Routine check-up",
                "created_at": "2024-01-10T10:00:00Z",
                "updated_at": "2024-01-10T10:00:00Z"
            },
            {
                "appointment_id": "APPT-00000000000000000000000000000001",
                "patient_id": "PT-00000000000000000000000000000001",
                "patient_name": "John Doe",
                "patient_mobile": "+919876543210",
                "patient_email": "smith@gmail.com",
                "doctor_id": "DOC-00000000000000000000000000000001",
                "doctor_name": "Dr. Smith",
                "department_id": "DEPT-00000000000000000000000000000001",
                "department_name": "Cardiology",
                "appointment_date": "2024-01-15",
                "appointment_time": "10:00 AM",
                "appointment_type": "OPD",
                "appointment_status": "Confirmed",
                "appointment_notes": "Routine check-up",
                "created_at": "2024-01-10T10:00:00Z",
                "updated_at": "2024-01-10T10:00:00Z"
            },
            {
                "appointment_id": "APPT-00000000000000000000000000000001",
                "patient_id": "PT-00000000000000000000000000000001",
                "patient_name": "John Doe",
                "patient_mobile": "+919876543210",
                "patient_email": "smith@gmail.com",
                "doctor_id": "DOC-00000000000000000000000000000001",
                "doctor_name": "Dr. Smith",
                "department_id": "DEPT-00000000000000000000000000000001",
                "department_name": "Cardiology",
                "appointment_date": "2024-01-15",
                "appointment_time": "10:00 AM",
                "appointment_type": "OPD",
                "appointment_status": "Confirmed",
                "appointment_notes": "Routine check-up",
                "created_at": "2024-01-10T10:00:00Z",
                "updated_at": "2024-01-10T10:00:00Z"
            },
            {
                "appointment_id": "APPT-00000000000000000000000000000001",
                "patient_id": "PT-00000000000000000000000000000001",
                "patient_name": "John Doe",
                "patient_mobile": "+919876543210",
                "patient_email": "smith@gmail.com",
                "doctor_id": "DOC-00000000000000000000000000000001",
                "doctor_name": "Dr. Smith",
                "department_id": "DEPT-00000000000000000000000000000001",
                "department_name": "Cardiology",
                "appointment_date": "2024-01-15",
                "appointment_time": "10:00 AM",
                "appointment_type": "OPD",
                "appointment_status": "Confirmed",
                "appointment_notes": "Routine check-up",
                "created_at": "2024-01-10T10:00:00Z",
                "updated_at": "2024-01-10T10:00:00Z"
            },
            {
                "appointment_id": "APPT-00000000000000000000000000000001",
                "patient_id": "PT-00000000000000000000000000000001",
                "patient_name": "John Doe",
                "patient_mobile": "+919876543210",
                "patient_email": "smith@gmail.com",
                "doctor_id": "DOC-00000000000000000000000000000001",
                "doctor_name": "Dr. Smith",
                "department_id": "DEPT-00000000000000000000000000000001",
                "department_name": "Cardiology",
                "appointment_date": "2024-01-15",
                "appointment_time": "10:00 AM",
                "appointment_type": "OPD",
                "appointment_status": "Confirmed",
                "appointment_notes": "Routine check-up",
                "created_at": "2024-01-10T10:00:00Z",
                "updated_at": "2024-01-10T10:00:00Z"
            },
            {
                "appointment_id": "APPT-00000000000000000000000000000001",
                "patient_id": "PT-00000000000000000000000000000001",
                "patient_name": "John Doe",
                "patient_mobile": "+919876543210",
                "patient_email": "smith@gmail.com",
                "doctor_id": "DOC-00000000000000000000000000000001",
                "doctor_name": "Dr. Smith",
                "department_id": "DEPT-00000000000000000000000000000001",
                "department_name": "Cardiology",
                "appointment_date": "2024-01-15",
                "appointment_time": "10:00 AM",
                "appointment_type": "OPD",
                "appointment_status": "Confirmed",
                "appointment_notes": "Routine check-up",
                "created_at": "2024-01-10T10:00:00Z",
                "updated_at": "2024-01-10T10:00:00Z"
            },
            {
                "appointment_id": "APPT-00000000000000000000000000000001",
                "patient_id": "PT-00000000000000000000000000000001",
                "patient_name": "John Doe",
                "patient_mobile": "+919876543210",
                "patient_email": "smith@gmail.com",
                "doctor_id": "DOC-00000000000000000000000000000001",
                "doctor_name": "Dr. Smith",
                "department_id": "DEPT-00000000000000000000000000000001",
                "department_name": "Cardiology",
                "appointment_date": "2024-01-15",
                "appointment_time": "10:00 AM",
                "appointment_type": "OPD",
                "appointment_status": "Confirmed",
                "appointment_notes": "Routine check-up",
                "created_at": "2024-01-10T10:00:00Z",
                "updated_at": "2024-01-10T10:00"
            }
        ]
    }
}

export default useGetAppoinmentList