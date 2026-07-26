import { z } from "zod"

export const AddRecordSchema = z.object({
    date: z.string().min(1, "Date is required"),
    symptoms: z.string().min(1, "Symptoms are required"),
    diagnosis: z.string().min(1, "Diagnosis is required"),
    report: z.any().optional(),
})
