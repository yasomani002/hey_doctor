import { Text } from "@/components/common/Text";
import { ErrorMessage } from "@/features/login/style/LoginPageStyle";
import styled from "styled-components";


export const AsteriskComp = () => {
    return <span className="font-bold text-red-500">*</span>;
}
interface CustomInputProps {
    label: string;
    labelColor?: string;
    id: string;
    isRequired?: boolean;
    error?: string | undefined;
    children: React.ReactNode;
    className?: string;
    hideLabel?: boolean;
}

export const CRCCustomInput = ({
    label,
    labelColor,
    id,
    isRequired = false,
    error,
    children,
    className,
    hideLabel = false,
}: CustomInputProps) => {
    return (
        <CustomInputContainer className={className}>
            {!hideLabel && (
                <label htmlFor={id} className="flex items-center gap-1">
                    <Text fontSize="14px" color={labelColor} className="truncate max-w-[75%]">
                        {label}
                    </Text>
                    {isRequired && <AsteriskComp />}
                </label>
            )}
            {children}
            {error && <ErrorMessage>{error as string}</ErrorMessage>}
        </CustomInputContainer>
    );
};
const CustomInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
