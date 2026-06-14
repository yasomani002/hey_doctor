import { useMutation } from "@tanstack/react-query";
// import { axiosInstance } from "@/api/axiosInstance";
// import { API_ENDPOINT } from "@/api/endpoints";

// type payload = {
//     email: string,
//     password: string
// }
// const submitLoginData = async (payload: payload): Promise<any> => {
//     const response = await axiosInstance.post(
//         API_ENDPOINT.LOGIN,
//         payload
//     );
//     return response.data;
// };

export const useSubmitLoginData = () => {
    return useMutation({
        // mutationFn: submitLoginData,
        mutationFn: async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return dummyData
        },
    });
};

const dummyData = {
    "status": true,
    "code": 200,
    "message": "Login Successfully",
    "data": {
        "user_role": "role_silver",
        "user_name": "info@hospitalmngmt.com",
        "permissions": [
            {
                "nav_menu_id": "dashboard",
                "nav_menu_name": "Dashboard",
                "nav_path": "/dashboard",
                "is_active": true,
                "is_visible": true,
                "nav_order": 1,
                "level": 1,
                "actions": [
                    1
                ],
                "sub_menu": []
            },
            {
                "nav_menu_id": "appointment",
                "nav_menu_name": "Appointment",
                "nav_path": "/appointment",
                "is_active": true,
                "is_visible": true,
                "nav_order": 2,
                "level": 1,
                "actions": [
                    1,
                    2,
                    3,
                    4
                ],
                "sub_menu": [
                    {
                        "nav_menu_id": "appointment-appointments",
                        "nav_menu_name": "Appointments",
                        "nav_path": "/appointments",
                        "is_active": true,
                        "is_visible": false,
                        "nav_order": 1,
                        "level": 2,
                        "actions": [
                            1,
                            2,
                            3,
                            4
                        ]
                    },
                    // {
                    //     "nav_menu_id": "appointment-history",
                    //     "nav_menu_name": "History",
                    //     "nav_path": "/history",
                    //     "is_active": true,
                    //     "is_visible": false,
                    //     "nav_order": 2,
                    //     "level": 2,
                    //     "actions": [
                    //         1
                    //     ]
                    // },
                    // {
                    //     "nav_menu_id": "notes",
                    //     "nav_menu_name": "Notes",
                    //     "nav_path": "/appointment-notes",
                    //     "is_active": true,
                    //     "is_visible": false,
                    //     "nav_order": 3,
                    //     "level": 2,
                    //     "actions": [
                    //         1,
                    //         2,
                    //         3,
                    //         4
                    //     ]
                    // },
                    // {
                    //     "nav_menu_id": "prescriptions",
                    //     "nav_menu_name": "Prescriptions",
                    //     "nav_path": "/appointment-priscriptions",
                    //     "is_active": true,
                    //     "is_visible": false,
                    //     "nav_order": 4,
                    //     "level": 2,
                    //     "actions": [
                    //         1,
                    //         2,
                    //         3,
                    //         4
                    //     ]
                    // },
                    // {
                    //     "nav_menu_id": "folloups",
                    //     "nav_menu_name": "Follow-ups",
                    //     "nav_path": "/appointment-folloups",
                    //     "is_active": true,
                    //     "is_visible": false,
                    //     "nav_order": 5,
                    //     "level": 2,
                    //     "actions": [
                    //         1,
                    //         2,
                    //         3,
                    //         4
                    //     ]
                    // },
                    // {
                    //     "nav_menu_id": "treatment",
                    //     "nav_menu_name": "Treatment",
                    //     "nav_path": "/appointment-treatment",
                    //     "is_active": true,
                    //     "is_visible": false,
                    //     "nav_order": 6,
                    //     "level": 2,
                    //     "actions": [
                    //         1,
                    //         2,
                    //         3,
                    //         4
                    //     ]
                    // },
                    // {
                    //     "nav_menu_id": "reports",
                    //     "nav_menu_name": "Reports",
                    //     "nav_path": "/appointment-reports",
                    //     "is_active": true,
                    //     "is_visible": false,
                    //     "nav_order": 7,
                    //     "level": 2,
                    //     "actions": [
                    //         1,
                    //         2,
                    //         3,
                    //         4
                    //     ]
                    // },
                    // {
                    //     "nav_menu_id": "payments",
                    //     "nav_menu_name": "Payments",
                    //     "nav_path": "/appointment-payment",
                    //     "is_active": true,
                    //     "is_visible": false,
                    //     "nav_order": 8,
                    //     "level": 2,
                    //     "actions": [
                    //         1
                    //     ]
                    // },
                    // {
                    //     "nav_menu_id": "message",
                    //     "nav_menu_name": "Message",
                    //     "nav_path": "/appointment-message",
                    //     "is_active": true,
                    //     "is_visible": false,
                    //     "nav_order": 9,
                    //     "level": 2,
                    //     "actions": [
                    //         1,
                    //         2,
                    //         3,
                    //         4
                    //     ]
                    // }
                ]
            }
        ],
        "token": "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX3JvbGUiOiJyb2xlX3NpbHZlciIsInN1YiI6ImluZm9AaG9zcGl0YWxtbmdtdC5jb20iLCJpYXQiOjE3NzcxMzU4MjMsImV4cCI6MTc3NzIyMjIyM30.bEK2W6wStk93wIC4TRVuzC-wrJaT7CMjAUppAQI79Bt6tZAvXicjPrLMF5Crk2AldmCYxsgLFmrRRJkdbEF2gA"
    },
    "timeStamp": "2026-04-25T16:50:24.321Z"
}