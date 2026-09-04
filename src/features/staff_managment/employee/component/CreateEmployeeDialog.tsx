import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateEmployeeSchema } from "../schema/index"
import type z from "zod"
import InputBox from "@/components/common/InputBox/InputBox"
import { Input } from "@/components/ui/input"
import useGetUserRoleList from "../../user_role/hook/useGetUserRoleList"
import Select from "@/components/common/Select/Select"

interface Props {
    open: boolean
    onClose: () => void
}

type TCreateEmployeeModel = z.infer<typeof CreateEmployeeSchema>

const CreateEmployeeDialog = ({ open, onClose }: Props) => {
    const { data, isLoading } = useGetUserRoleList();
    const userRoleData = data?.data?.data || [];
    const userRoleList = userRoleData.map((role) => {
        return {
            value: role.role_id,
            label: role.role_name,
        }
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TCreateEmployeeModel>({
        resolver: zodResolver(CreateEmployeeSchema),
        defaultValues: {
            employee_name: "",
            employee_contact: "",
            employee_email: "",
            user_name: "",
            password: "",
            role_id: "",
        },
    })

    const onSubmit = (data: TCreateEmployeeModel) => {
        console.log("Form data:", data)
    }

    const onError = (formErrors: typeof errors) => {
        console.log("Validation errors:", formErrors)
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
                    <DialogHeader>
                        <DialogTitle>Add Employee</DialogTitle>
                        <DialogDescription>
                            Fill in the details below to add a new employee.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-2 gap-4">
                        {/* employee name */}
                        <InputBox
                            label="Employee Name"
                            error={errors.employee_name?.message}
                            required
                        >
                            <Input
                                type="text"
                                placeholder="Dr. Prasanth"
                                {...register("employee_name")}
                            />
                        </InputBox>

                        {/* employee contact */}
                        <InputBox
                            label="Employee Contact"
                            error={errors.employee_contact?.message}
                            required
                        >
                            <Input
                                type="text"
                                placeholder="6358948585"
                                {...register("employee_contact")}
                            />
                        </InputBox>

                        {/* employee email */}
                        <InputBox
                            label="Employee Email"
                            error={errors.employee_email?.message}
                            required
                        >
                            <Input
                                type="email"
                                placeholder="pransanth@gmail.com"
                                {...register("employee_email")}
                            />
                        </InputBox>

                        {/* user role */}
                        <InputBox
                            label="User Role"
                            error={errors.role_id?.message}
                            required
                        >
                            <Select
                                options={userRoleList}
                                placeholder="Select Role"
                                disabled={isLoading}
                                {...register("role_id")}
                            />
                        </InputBox>

                        {/* user name */}
                        <InputBox
                            label="User Name"
                            error={errors.user_name?.message}
                            required
                        >
                            <Input
                                type="text"
                                placeholder="prasanth@123"
                                {...register("user_name")}
                            />
                        </InputBox>

                        {/* password */}
                        <InputBox
                            label="Password"
                            error={errors.password?.message}
                            required
                        >
                            <Input
                                type="password"
                                placeholder="Prasanth@123"
                                {...register("password")}
                            />
                        </InputBox>

                    </div>

                    <DialogFooter showCloseButton>
                        <Button type="submit">Save Employee</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateEmployeeDialog
