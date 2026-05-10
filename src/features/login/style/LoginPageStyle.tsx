import { colors } from "@/styles/colors";
import styled from "styled-components";

export const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative;
  background: linear-gradient(105deg, ${colors.theme.primary} 50%, ${colors.theme.sidebarBg} 50%);

  .footer {
    position: fixed;
    bottom: 20px;
    right: 50px;
    z-index: 10;
    p {
      a {
        text-decoration: underline;
        color: #e0e0e0;
      }
    }
  }

  @media (max-width: 768px) {
    background: linear-gradient(180deg, ${colors.theme.primary} 45%, ${colors.theme.sidebarBg} 45%);
  }
`;

export const LoginCard = styled.div`
  width: 900px;
  max-width: 95vw;
  height: 550px;
  background: linear-gradient(105deg, ${colors.theme.primary} 50%, ${colors.theme.sidebarBg} 50%);
  box-shadow: 0 15px 40px rgba(20, 52, 64, 0.8);
  border-radius: 8px;
  display: flex;
  position: relative;
  z-index: 1; 
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
    border-radius: 0;
    width: 100%;
    background: linear-gradient(180deg, ${colors.theme.primary} 45%, ${colors.theme.sidebarBg} 45%);
  }
`;

export const LeftSideContainer = styled.div`
  flex: 1.1; /* slightly wider to cover the sloped background nicely */
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  text-align: center;
  
  /* Positioning content so it centers visually on the white part */
  padding-right: 15%; 

  img {
    max-width: 140px;
    height: auto;
    margin-bottom: 20px;
  }
  
  h1 {
    color:  #2b5b9a;
    font-size: 26px;
    font-weight: 800;
    margin: 0;
    letter-spacing: 1px;
  }

  p {
    color: #666;
    font-size: 12px;
    font-style: italic;
    margin-top: 5px;
  }

  @media (max-width: 768px) {
    flex: none;
    height: 40%;
    padding: 30px;
    padding-right: 30px;
  }
`;

export const LeftImage = styled.img`
  /* Deprecated layout usage, keeping for compatibility if imported elsewhere */
`;

export const RightSideContainer = styled.div`
  flex: 0.9;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;

  @media (max-width: 768px) {
    flex: 1;
    padding: 20px;
  }
`;

export const FormWrapper = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InnerFormWrapper = styled.div`
  width: 80%;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

export const FormContainer = styled.div`
  width: 100%;
`;

export const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;
  display: none; /* We hide the logo inside form since it's on left side now */
`;

export const Logo = styled.img`
  width: 100px;
  height: auto;
  display: inline-block;
  margin-bottom: 20px;
`;

export const CompanyName = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: #fff;
`;

export const ErrorMessage = styled.span`
  color: #ff9494; /* Lighter red for dark background */
  font-size: 12px;
`;

export const InputFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  label {
    color: #ffffff;
    font-size: 13px;
    margin-bottom: 4px;
  }

  input {
    background-color: #ffffff;
    border: none;
    border-radius: 4px;
    padding: 10px 14px;
    height: 42px;
    color: #333;
    width: 100%;
    
    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.4);
    }
  }
`;

export const ForgotPasswordLink = styled.div`
  margin-top: 10px;
  margin-bottom: 14px;
  text-align: right;

  span {
    color: #a4c4f3;
    text-decoration: none;
    font-size: 13px;
    cursor: pointer;
    transition: color 0.3s ease;
    
    &:hover {
      color: #ffffff;
      text-decoration: underline;
    }
  }
`;

export const SubmitButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  
  button {
    width: 100%;
    height: 42px;
    background-color: #5c8ff7;
    color: #ffffff;
    font-weight: 600;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #4a7be0;
    }
  }
`;

export const PasswordContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const TogglePasswordIcon = styled.div`
  position: absolute;
  right: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;

  svg {
    width: 18px;
    height: 18px;
    color: #888;
  }

  &:hover svg {
    color: #555;
  }
`;



/// for theme
// export const LoginWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
//   position: relative;

//   /* Smooth modern gradient instead of hard split */
//   background: linear-gradient(135deg,
//     ${colors.theme.primary} 0%,
//     ${colors.theme.secondary} 100%
//   );

//   .footer {
//     position: fixed;
//     bottom: 20px;
//     right: 40px;
//     z-index: 10;

//     p {
//       color: #dfe6f3;
//       font-size: 13px;

//       a {
//         text-decoration: underline;
//         color: #ffffff;
//       }
//     }
//   }

//   @media (max-width: 768px) {
//     padding: 20px;
//     height: auto;
//     min-height: 100vh;
//   }
// `;