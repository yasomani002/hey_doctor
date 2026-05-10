import { Input } from "@/components/ui/input"
import { CRCCustomInput } from "@/components/common/CRCCustomInput"
import { useForm } from "react-hook-form"
import CRCButton from "@/components/common/CRCButton"
import { colors } from "@/styles/colors"
import { useNavigate } from "react-router-dom"
import { useSubmitLoginData } from "../hook/useSendLogin";

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { mutate: submitLoginData } = useSubmitLoginData();
    const navigate = useNavigate()
    const onSubmit = (data: any) => {
        localStorage.setItem("token", "dummy_token");
        submitLoginData(data, {
            onSuccess: (data) => {
                console.log(data)
                navigate("/")
            },
            onError: (error) => {
                console.log(error);
            }
        })
        navigate("/dashboard")
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