import { colors } from "@/styles/colors";
import styled from "styled-components";

export const TabContainer = styled.div`
    display: flex;
    gap: 24px;
    border-bottom: 1.5px solid ${colors.table.border};
    width: 100%;
    margin-bottom: 16px;
`;

export const TabItem = styled.button<{ $isActive: boolean }>`
    background: none;
    border: none;
    padding-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    color: ${({ $isActive }) => ($isActive ? colors.theme.secondary : colors.text.label)};
    position: relative;
    transition: color 0.2s ease, border-color 0.2s ease;

    &:hover {
        color: ${({ $isActive }) => ($isActive ? colors.theme.secondary : colors.text.primary)};
    }

    &::after {
        content: "";
        position: absolute;
        bottom: -1.5px;
        left: 0;
        right: 0;
        height: 2.5px;
        background-color: ${colors.theme.secondary};
        opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
        transition: opacity 0.2s ease;
        border-radius: 2px 2px 0 0;
    }
`;
