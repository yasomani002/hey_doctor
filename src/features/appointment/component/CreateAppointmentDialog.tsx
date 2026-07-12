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
import { useMemo } from "react";
import AppointmentTimePicker from "./AppointmentTimePicker"

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

const CreateAppointmentDialog = ({ open, onClose }: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        watch,
        setValue,
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

    // logic for slot creation
    const startTime = "10:00";
    const interval = 20;
    const breakTimeFrom = "13:00";
    const breakTimeTo = "14:00";
    const endTime = "18:00";

    const timeToMinutes = (time: string) => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    };

    const minutesToTime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;

        return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
    };

    const generateSlots = () => {
        const slots = [];

        let current = timeToMinutes(startTime);
        const end = timeToMinutes(endTime);

        const breakStart = timeToMinutes(breakTimeFrom);
        const breakEnd = timeToMinutes(breakTimeTo);

        while (current + interval <= end) {
            // Skip break time
            if (current >= breakStart && current < breakEnd) {
                current = breakEnd;
                continue;
            }

            const next = current + interval;

            // Prevent slot crossing into break
            if (next > breakStart && current < breakStart) {
                current = breakEnd;
                continue;
            }

            slots.push({
                label: `${minutesToTime(current)} - ${minutesToTime(next)}`,
                from: minutesToTime(current),
                to: minutesToTime(next),
            });

            current = next;
        }

        return slots;
    };

    const slotTimeData = useMemo(() => generateSlots(), []);

    const selectedSlot = watch("appointment_time");

    const todayDate = new Date();
    return (
        <Dialog open={open} onOpenChange={onClose} >
            <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
                    <DialogHeader>
                        <DialogTitle>Create Appointment</DialogTitle>
                        <DialogDescription>
                            Fill in the details below to create a new appointment.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-2 gap-4">

                        {/* appointment date */}
                        <InputBox
                            label="Appointment Date"
                            error={errors.appointment_date?.message}
                            required
                        >
                            <Controller
                                name="appointment_date"
                                control={control}
                                render={({ field }) => (
                                    <DatePicker
                                        value={field.value ? new Date(field.value) : undefined}
                                        onChange={(date) => field.onChange(date?.toISOString() ?? "")}
                                        placeholder="Select appointment date"
                                        minDate={todayDate}
                                    />
                                )}
                            />
                        </InputBox>

                        {/* appointment time */}
                        <InputBox
                            label="Appointment Time"
                        >
                            <AppointmentTimePicker
                                value={selectedSlot || ""}
                                slots={slotTimeData}
                                onChange={(value) =>
                                    setValue("appointment_time", value, {
                                        shouldDirty: true,
                                        shouldTouch: true,
                                        shouldValidate: true,
                                    })
                                }
                            />
                            <input
                                type="hidden"
                                {...register("appointment_time")}
                            />
                        </InputBox>

                        {/* patient name */}
                        <InputBox
                            label="Patient Name"
                            error={errors.patient_name?.message}
                            required
                        >
                            <Input type="text" {...register("patient_name")} />
                        </InputBox>

                        {/* patient number */}
                        <InputBox
                            label="Patient Number"
                            error={errors.patient_number?.message}
                            required
                        >
                            <Input type="text" {...register("patient_number")} />
                        </InputBox>

                        {/* gender */}
                        <InputBox
                            label="Gender"
                            error={errors.gender?.message}
                            required
                        >
                            <Select
                                options={GENDER_OPTION}
                                {...register("gender")}
                            />
                        </InputBox>

                        {/* age */}
                        <InputBox
                            label="Age"
                            error={errors.age?.message}
                            required
                        >
                            <Input type="number" {...register("age", { valueAsNumber: true })} />
                        </InputBox>

                        {/* date of birth */}
                        <InputBox
                            label="Date of Birth"
                            error={errors.date_of_birth?.message}
                            required
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

                        {/* symptoms */}
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

export default CreateAppointmentDialog