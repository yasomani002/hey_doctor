import { colors } from "@/styles/colors";
import type { ButtonHTMLAttributes } from "react"
import styled from "styled-components";
import Text from "./Text";

type CRCButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
    bgcolor?: string;
    size?: string;
    type?: "button" | "submit" | "reset";
}
const CRCButton = ({
    children,
    className,
    bgcolor = colors.theme.primary,
    color = colors.text.black,
    size,
    type = "button",
    ...props }: CRCButtonProps) => {
    return (
        <CRCButtonStyles
            type={type}
            className={className}
            {...props}
        >
            <Text fontSize="14px" fontWeight={500} color={color}>{children}</Text>
        </CRCButtonStyles>
    )
}

const CRCButtonStyles = styled.button`
cursor: pointer;
    padding-inline: 16px;
    padding-block: 6px;
    background-color: ${colors.theme.primary};
    border-radius: 4px;
`

export default CRCButton