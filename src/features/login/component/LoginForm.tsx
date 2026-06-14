import { Input } from "@/components/ui/input"
import { CRCCustomInput } from "@/components/common/CRCCustomInput"
import { useForm } from "react-hook-form"
import CRCButton from "@/components/common/CRCButton"
import { colors } from "@/styles/colors"
import { useNavigate } from "react-router-dom"
import { useSubmitLoginData } from "../hook/useSendLogin";
import { useAppDispatch } from "@/store/hooks";
import { loginSuccess } from "@/store/slices/authSlice";

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { mutate: submitLoginData } = useSubmitLoginData();
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const onSubmit = (data: any) => {
        submitLoginData(data, {
            onSuccess: (res) => {
                if (res?.data) {
                    dispatch(loginSuccess({
                        user: {
                            user_role: res.data.user_role,
                            user_name: res.data.user_name,
                            permissions: res.data.permissions
                        },
                        token: res.data.token
                    }))
                }
                navigate("/dashboard")
            },
            onError: (error) => {
                console.log(error);
            }
        })
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <CRCCustomInput
                id={"username"}
                label={"Username"}
                labelColor={colors.text.white}
                isRequired
                error={errors.username?.message as string}
            >
                <Input type="text" {...register("username")} />
            </CRCCustomInput>

            <CRCCustomInput
                id={"password"}
                label={"Password"}
                labelColor={colors.text.white}
                isRequired
                error={errors.password?.message as string}
            >
                <Input type="password" {...register("password")} />
            </CRCCustomInput>

            <CRCButton type="submit" className="w-full mt-2">Login</CRCButton>
        </form>
    )
}

export default LoginForm