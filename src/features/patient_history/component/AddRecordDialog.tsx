import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AddRecordSchema } from "../schema/index"
import type z from "zod"
import InputBox from "@/components/common/InputBox/InputBox"
import { Input } from "@/components/ui/input"
import DatePicker from "@/components/common/DatePicker/DatePicker"

interface Props {
    open: boolean
    onClose: () => void
}

type TAddRecordModel = z.infer<typeof AddRecordSchema>

const AddRecordDialog = ({ open, onClose }: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<TAddRecordModel>({
        resolver: zodResolver(AddRecordSchema),
        defaultValues: {
            date: "",
            symptoms: "",
            diagnosis: "",
            report: "",
        },
    })

    const onSubmit = (data: TAddRecordModel) => {
        console.log("Record data:", data)
    }

    const onError = (formErrors: typeof errors) => {
        console.log("Validation errors:", formErrors)
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
                    <DialogHeader>
                        <DialogTitle>Add Record</DialogTitle>
                        <DialogDescription>
                            Fill in the details below to add a new patient record.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-2 gap-4">

                        {/* date */}
                        <InputBox
                            label="Date"
                            error={errors.date?.message}
                            required
                        >
                            <Controller
                                name="date"
                                control={control}
                                render={({ field }) => (
                                    <DatePicker
                                        value={field.value ? new Date(field.value) : undefined}
                                        onChange={(date) => field.onChange(date?.toISOString() ?? "")}
                                        placeholder="Select record date"
                                    />
                                )}
                            />
                        </InputBox>

                        {/* symptoms */}
                        <InputBox
                            label="Symptoms"
                            error={errors.symptoms?.message}
                            required
                        >
                            <Input type="text" placeholder="e.g. Fever, Cough" {...register("symptoms")} />
                        </InputBox>

                        {/* diagnosis */}
                        <InputBox
                            label="Diagnosis"
                            error={errors.diagnosis?.message}
                            required
                        >
                            <Input type="text" placeholder="e.g. Viral Infection" {...register("diagnosis")} />
                        </InputBox>

                        {/* report (optional) */}
                        <InputBox
                            label="Report"
                        >
                            <Input type="file" placeholder="Optional" {...register("report")} />
                        </InputBox>

                    </div>

                    <DialogFooter showCloseButton>
                        <Button type="submit">Save Record</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddRecordDialog
