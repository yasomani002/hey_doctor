import { useQuery } from "@tanstack/react-query"

const useGetEmployeeList = () => {
    return useQuery({
        queryKey: ["employee-list"],
        queryFn: () => {
            return dummyData
        }
    })
}

const dummyData = {
    "status": true,
    "code": 200,
    "message": "Employee List",
    "data": {
        "total_records": 8,
        "total_pages": 1,
        "current_page": 1,
        "data": [
            {
                "employee_id": "EMP-00000000000000000000000000000001",
                "employee_name": "Dr. Prasanth",
                "employee_contact": "6358948585",
                "employee_email": "pransanth@gmail.com",
                "user_name": "prasanth@123",
                "created_at": "2024-01-10T10:00:00Z"
            },
            {
                "employee_id": "EMP-00000000000000000000000000000002",
                "employee_name": "Dr. Sarah Jenkins",
                "employee_contact": "+919876543211",
                "employee_email": "sarah.jenkins@gmail.com",
                "user_name": "sarah@123",
                "created_at": "2024-01-12T11:30:00Z"
            },
            {
                "employee_id": "EMP-00000000000000000000000000000003",
                "employee_name": "Dr. Rajesh Kumar",
                "employee_contact": "+919876543212",
                "employee_email": "rajesh.kumar@gmail.com",
                "user_name": "rajesh@123",
                "created_at": "2024-01-15T09:15:00Z"
            },
            {
                "employee_id": "EMP-00000000000000000000000000000004",
                "employee_name": "Dr. Emily Watson",
                "employee_contact": "+919876543213",
                "employee_email": "emily.watson@gmail.com",
                "user_name": "emily@123",
                "created_at": "2024-01-18T14:20:00Z"
            },
            {
                "employee_id": "EMP-00000000000000000000000000000005",
                "employee_name": "Dr. Michael Chen",
                "employee_contact": "+919876543214",
                "employee_email": "michael.chen@gmail.com",
                "user_name": "michael@123",
                "created_at": "2024-01-20T16:45:00Z"
            }
        ]
    }
}

export default useGetEmployeeList
