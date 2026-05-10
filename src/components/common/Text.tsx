import { colors } from "@/styles/colors";
import React from "react";
import styled, { css } from "styled-components";


export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
    as?: "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "label";
    children: React.ReactNode;
    className?: string;
    fontSize?: string | number;
    color?: string;
    fontWeight?: string | number;
    marginBottom?: string | number;
    truncate?: boolean;
}
const StyledText = styled.p<{ $fontSize?: string | number, fontWeight?: string | number, $marginBottom?: string | number, truncate?: boolean }>`
  margin: 0;
  margin-bottom: ${({ $marginBottom }) => $marginBottom || "0"};
  padding: 0;
  color: ${({ color }) => color || colors.text.primary};
  font-size: ${({ $fontSize }) => $fontSize || "1rem"};
  font-weight: ${({ fontWeight }) => fontWeight || "normal"};
  ${({ truncate }) =>
        truncate
            ? css`
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        `
            : css`
          overflow: visible;
          white-space: normal;
        `}
`;

export const Text: React.FC<TextProps> = ({
    as = "p",
    children,
    className,
    fontSize,
    color,
    fontWeight,
    marginBottom,
    truncate = false,
    ...props
}) => {
    return (
        <StyledText
            as={as}
            className={className}
            $fontSize={fontSize}
            color={color}
            fontWeight={fontWeight}
            $marginBottom={marginBottom}
            truncate={truncate}
            {...props}
        >
            {children}
        </StyledText>
    );
};

export default Text;

