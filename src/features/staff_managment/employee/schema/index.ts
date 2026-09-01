import { z } from "zod"

export const CreateEmployeeSchema = z.object({
    employee_name: z.string().min(1, "Employee Name is required"),
    employee_contact: z.string().min(1, "Employee Contact is required"),
    employee_email: z.string().min(1, "Employee Email is required").email("Invalid email address"),
    user_name: z.string().min(1, "User Name is required"),
    password: z.string().min(1, "Password is required"),
})
