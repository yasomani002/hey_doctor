import { useQuery } from "@tanstack/react-query"

const useGetUserRoleList = () => {
    return useQuery({
        queryKey: ["user-role-list"],
        queryFn: () => {
            return dummyData
        }
    })
}

const dummyData = {
    "status": true,
    "code": 200,
    "message": "User Role List",
    "data": {
        "total_records": 4,
        "total_pages": 1,
        "current_page": 1,
        "data": [
            {
                "role_id": "ROLE-00000000000000000000000000000001",
                "role_name": "Admin",
                "role_code": "role_admin",
                "description": "Full system access and administrative controls",
                "created_at": "2024-01-10T10:00:00Z"
            },
            {
                "role_id": "ROLE-00000000000000000000000000000002",
                "role_name": "Doctor",
                "role_code": "role_doctor",
                "description": "Access to patient history, appointments, and prescriptions",
                "created_at": "2024-01-12T11:30:00Z"
            },
            {
                "role_id": "ROLE-00000000000000000000000000000003",
                "role_name": "Nurse",
                "role_code": "role_nurse",
                "description": "Patient care assistance and record updates",
                "created_at": "2024-01-15T09:15:00Z"
            },
            {
                "role_id": "ROLE-00000000000000000000000000000004",
                "role_name": "Receptionist",
                "role_code": "role_receptionist",
                "description": "Front desk management and appointment bookings",
                "created_at": "2024-01-18T14:20:00Z"
            }
        ]
    }
}

export default useGetUserRoleList
