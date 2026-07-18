import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { loginSuccess } from "@/store/slices/authSlice";
import { useSubmitLoginData } from "../hook/useSendLogin";
import {
    ErrorMessage,
    FieldGroup,
    FieldLabel,
    FormSubtitle,
    FormTitle,
    FormWrapper,
    ForgotPasswordLink,
    HeartbeatWrapper,
    LeftHeadline,
    LeftSideContainer,
    LeftSubtitle,
    LeftTextBlock,
    LoginCard,
    LoginWrapper,
    LogoIcon,
    LogoRow,
    LogoText,
    RightSideContainer,
    StaffAccessLabel,
    StyledInput,
    SubmitButtonContainer,
    InputFieldContainer,
} from "../style/LoginPageStyle";
import ECG from "../component/ECG";

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { mutate: submitLoginData } = useSubmitLoginData();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onSubmit = (data: any) => {
        submitLoginData(data, {
            onSuccess: (res) => {
                if (res?.data) {
                    dispatch(
                        loginSuccess({
                            user: {
                                user_role: res.data.user_role,
                                user_name: res.data.user_name,
                                permissions: res.data.permissions,
                            },
                            token: res.data.token,
                        })
                    );
                }
                navigate("/dashboard");
            },
            onError: (error) => {
                console.log(error);
            },
        });
    };

    return (
        <LoginWrapper>
            <LoginCard>
                {/* ── Left Panel ── */}
                <LeftSideContainer>
                    {/* Logo */}
                    <LogoRow>
                        <LogoIcon>+</LogoIcon>
                        <LogoText>hey_doctor</LogoText>
                    </LogoRow>

                    {/* Heartbeat / ECG line */}
                    <HeartbeatWrapper>
                        <ECG />
                    </HeartbeatWrapper>

                    {/* Copy */}
                    <LeftTextBlock>
                        <LeftHeadline>
                            Run your clinic on one calm, connected screen.
                        </LeftHeadline>
                        <LeftSubtitle>
                            Appointments, patient history and daily operations — organised the
                            way your front desk actually thinks.
                        </LeftSubtitle>
                    </LeftTextBlock>

                    {/* Stats */}
                    {/* <StatsRow>
                        <StatItem>
                            <StatValue>2,400+</StatValue>
                            <StatLabel>Patients tracked</StatLabel>
                        </StatItem>
                        <StatItem>
                            <StatValue>98.2%</StatValue>
                            <StatLabel>On-time visits</StatLabel>
                        </StatItem>
                        <StatItem>
                            <StatValue>12</StatValue>
                            <StatLabel>Clinics live</StatLabel>
                        </StatItem>
                    </StatsRow> */}
                </LeftSideContainer>

                {/* ── Right Panel ── */}
                <RightSideContainer>
                    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
                        <StaffAccessLabel>Staff Access</StaffAccessLabel>
                        <FormTitle>Welcome back</FormTitle>
                        <FormSubtitle>Sign in to view today's schedule.</FormSubtitle>

                        <InputFieldContainer>
                            <FieldGroup>
                                <FieldLabel htmlFor="username">
                                    Username <span className="required">*</span>
                                </FieldLabel>
                                <StyledInput
                                    id="username"
                                    type="text"
                                    placeholder="you@clinic.com"
                                    {...register("username")}
                                />
                                {errors.username && (
                                    <ErrorMessage>{errors.username.message as string}</ErrorMessage>
                                )}
                            </FieldGroup>

                            <FieldGroup>
                                <FieldLabel htmlFor="password">
                                    Password <span className="required">*</span>
                                </FieldLabel>
                                <StyledInput
                                    id="password"
                                    type="password"
                                    placeholder="••••••••••"
                                    {...register("password")}
                                />
                                {errors.password && (
                                    <ErrorMessage>{errors.password.message as string}</ErrorMessage>
                                )}
                            </FieldGroup>
                        </InputFieldContainer>

                        <SubmitButtonContainer>
                            <button type="submit">Login</button>
                        </SubmitButtonContainer>

                        <ForgotPasswordLink>
                            <span>Forgot password?</span>
                        </ForgotPasswordLink>
                    </FormWrapper>
                </RightSideContainer>
            </LoginCard>
        </LoginWrapper>
    );
};

export default LoginPage;