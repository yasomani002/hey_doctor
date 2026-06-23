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
import { CreateAppoinmentSchema } from "../schema/index"
import type z from "zod"
import InputBox from "@/components/common/InputBox/InputBox"
import { Input } from "@/components/ui/input"
import Select from "@/components/common/Select/Select"
import DatePicker from "@/components/common/DatePicker/DatePicker"

const GENDER_OPTION = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
]

interface Props {
    open: boolean
    onClose: () => void
}
type TCreateAppointmentModel = z.infer<typeof CreateAppoinmentSchema>;

const CreateAppointment = ({ open, onClose }: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control
    } = useForm<TCreateAppointmentModel>({
        resolver: zodResolver(CreateAppoinmentSchema),
        defaultValues: {
            patient_name: "",
            patient_number: "",
            gender: "",
            age: undefined,
            date_of_birth: "",
            appointment_date: "",
            appointment_time: "",
            symptoms: "",
        },
    })

    const onSubmit = (data: TCreateAppointmentModel) => {
        console.log("Form data:", data)
    }

    const onError = (formErrors: typeof errors) => {
        console.log("Validation errors:", formErrors)
    }

    return (
        <Dialog open={open} onOpenChange={onClose} >
            <DialogContent className="sm:max-w-3xl">
                <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
                    <DialogHeader>
                        <DialogTitle>Create Appointment</DialogTitle>
                        <DialogDescription>
                            Fill in the details below to create a new appointment.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-2 gap-4">
                        <InputBox
                            label="Patient Name"
                            error={errors.patient_name?.message}
                        >
                            <Input type="text" {...register("patient_name")} />
                        </InputBox>

                        <InputBox
                            label="Patient Number"
                            error={errors.patient_number?.message}
                        >
                            <Input type="text" {...register("patient_number")} />
                        </InputBox>

                        <InputBox
                            label="Gender"
                            error={errors.gender?.message}
                        >
                            <Select
                                options={GENDER_OPTION}
                                {...register("gender")}
                            />
                        </InputBox>

                        <InputBox
                            label="Age"
                            error={errors.age?.message}
                        >
                            <Input type="number" {...register("age", { valueAsNumber: true })} />
                        </InputBox>

                        <InputBox
                            label="Date of Birth"
                            error={errors.date_of_birth?.message}
                        >
                            <Controller
                                name="date_of_birth"
                                control={control}
                                render={({ field }) => (
                                    <DatePicker
                                        value={field.value ? new Date(field.value) : undefined}
                                        onChange={(date) => field.onChange(date?.toISOString() ?? "")}
                                        placeholder="Select date of birth"
                                    />
                                )}
                            />
                        </InputBox>

                        <InputBox
                            label="Appointment Date"
                            error={errors.appointment_date?.message}
                        >
                            <Controller
                                name="appointment_date"
                                control={control}
                                render={({ field }) => (
                                    <DatePicker
                                        value={field.value ? new Date(field.value) : undefined}
                                        onChange={(date) => field.onChange(date?.toISOString() ?? "")}
                                        placeholder="Select appointment date"
                                    />
                                )}
                            />
                        </InputBox>

                        <InputBox
                            label="Appointment Time"
                            error={errors.appointment_time?.message}
                        >
                            <Input type="text" {...register("appointment_time")} />
                        </InputBox>
                        <InputBox
                            label="Symptoms"
                            error={errors.symptoms?.message}
                        >
                            <Input type="text" {...register("symptoms")} />
                        </InputBox>
                    </div>

                    <DialogFooter showCloseButton>
                        <Button type="submit">Save Appointment</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateAppointment