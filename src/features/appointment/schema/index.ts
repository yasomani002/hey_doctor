import { z } from "zod"

export const CreateAppoinmentSchema = z.object({
    patient_name: z.string().min(1, "Patient Name is required"),
    patient_number: z.string().min(1, "Patient Number is required"),
    gender: z.string().min(1, "Gender is required"),
    age: z.number().min(1, "Age is required"),
    date_of_birth: z.string().min(1, "Date of Birth is required"),
    appointment_date: z.string().min(1, "Appointment Date is required"),
    appointment_time: z.string().min(1, "Appointment Time is required"),
    symptoms: z.string().optional(),
})

