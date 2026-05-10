import LoginForm from "../component/LoginForm";
import { LeftSideContainer, LoginCard, LoginWrapper, RightSideContainer } from "../style/LoginPageStyle";

const LoginPage = () => {
    return (
        <LoginWrapper>
            <LoginCard>
                {/* Left Side with Welcome & Logo */}
                <LeftSideContainer>
                    {/* 
                    <CCImage
                        imageSrc={companyLogo}
                        width={200}
                        height={200}
                        className="border-none"
                    /> */}

                </LeftSideContainer>

                {/* Right Side with Form */}
                <RightSideContainer>
                    <LoginForm />
                </RightSideContainer>
            </LoginCard>
        </LoginWrapper>
    );
};

export default LoginPage;