import { colors } from "@/styles/colors";
import styled from "styled-components";

/* ─── Outer wrapper ───────────────────────────────────────────── */
export const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: ${colors.theme.themeBg};

  @media (max-width: 768px) {
    background: ${colors.theme.sidebarBg};
    align-items: flex-start;
  }
`;

/* ─── Card ────────────────────────────────────────────────────── */
export const LoginCard = styled.div`
  width: 860px;
  max-width: 96vw;
  min-height: 500px;
  border-radius: 16px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
  overflow: hidden;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    width: 100%;
    border-radius: 0;
    min-height: 100vh;
  }
`;

/* ─── Left panel ──────────────────────────────────────────────── */
export const LeftSideContainer = styled.div`
  background: ${colors.theme.sidebarBg};
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 36px 40px 36px;
  justify-content: space-around;

  @media (max-width: 768px) {
    padding: 32px 28px;
    min-height: 300px;
  }
`;

/* ─── Logo row ────────────────────────────────────────────────── */
export const LogoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const LogoIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: #2a9d8f;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  flex-shrink: 0;
`;

export const LogoText = styled.span`
  font-size: 17px;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: 0.02em;
`;

/* ─── Heartbeat SVG area ──────────────────────────────────────── */
export const HeartbeatWrapper = styled.div`
  margin: 0 -8px;
  opacity: 0.85;
  // margin-bottom: 50px;

  svg {
    width: 100%;
    height: 60px;
  }
`;

/* ─── Main copy ───────────────────────────────────────────────── */
export const LeftTextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const LeftHeadline = styled.h2`
  font-size: 26px;
  font-weight: 800;
  color: #ffffff;
  line-height: 1.25;
  margin: 0;
`;

export const LeftSubtitle = styled.p`
  font-size: 13.5px;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.6;
  margin: 0;
`;

/* ─── Stats row ───────────────────────────────────────────────── */
export const StatsRow = styled.div`
  display: flex;
  gap: 28px;
  flex-wrap: wrap;
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const StatValue = styled.span`
  font-size: 20px;
  font-weight: 800;
  color: #ffffff;
`;

export const StatLabel = styled.span`
  font-size: 11.5px;
  color: rgba(255, 255, 255, 0.55);
`;

/* ─── Right panel ─────────────────────────────────────────────── */
export const RightSideContainer = styled.div`
  background: ${colors.theme.themeBg};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 44px;

  @media (max-width: 768px) {
    padding: 32px 24px 48px;
  }
`;

/* ─── Form inner wrapper ──────────────────────────────────────── */
export const FormWrapper = styled.form`
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const StaffAccessLabel = styled.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #2a9d8f;
  margin-bottom: 8px;
  display: block;
`;

export const FormTitle = styled.h1`
  font-size: 28px;
  font-weight: 800;
  color: ${colors.text.primary};
  margin: 0 0 6px 0;
  line-height: 1.2;
`;

export const FormSubtitle = styled.p`
  font-size: 13.5px;
  color: #7a8a8a;
  margin: 0 0 28px 0;
`;

/* ─── Input field block ───────────────────────────────────────── */
export const InputFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 4px;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const FieldLabel = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #1a2e2e;

  .required {
    color: #c0392b;
    margin-left: 3px;
  }
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 46px;
  border: 1.5px solid #dde4e0;
  border-radius: 8px;
  padding: 0 14px;
  font-size: 14px;
  color: #1a2e2e;
  background: #fafbfa;
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;

  &::placeholder {
    color: #aab8b3;
  }

  &:focus {
    outline: none;
    border-color: #2a9d8f;
    box-shadow: 0 0 0 3px rgba(42, 157, 143, 0.12);
    background: #ffffff;
  }
`;

export const ErrorMessage = styled.span`
  color: #c0392b;
  font-size: 11.5px;
`;

/* ─── Submit button ───────────────────────────────────────────── */
export const SubmitButtonContainer = styled.div`
  margin-top: 24px;

  button {
    width: 100%;
    height: 48px;
    background: ${colors.theme.sidebarBg};
    color: #ffffff;
    font-size: 15px;
    font-weight: 700;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    letter-spacing: 0.02em;
    transition: background 0.2s, transform 0.1s;

    &:hover {
      background: #162d2d;
    }

    &:active {
      transform: scale(0.99);
    }
  }
`;

/* ─── Forgot password ─────────────────────────────────────────── */
export const ForgotPasswordLink = styled.div`
  margin-top: 14px;
  text-align: center;

  span {
    font-size: 13px;
    color: #8a9a9a;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: #1e3a3a;
      text-decoration: underline;
    }
  }
`;

/* ─── Legacy / unused but kept for safety ─────────────────────── */
export const InnerFormWrapper = styled.div``;
export const FormContainer = styled.div``;
export const FormHeader = styled.div``;
export const Logo = styled.img``;
export const CompanyName = styled.h1``;
export const PasswordContainer = styled.div``;
export const TogglePasswordIcon = styled.div``;