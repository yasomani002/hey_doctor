import styled from "styled-components";
import { colors } from "@/styles/colors";

export const ShowingRecordContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 8px;
  gap: 20px;
  width: 100%;
`;

export const ShowingRecordText = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 16px;
  color: ${colors.text.secondary};
`;

export const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  max-width: 100%;
`;

export const PageInfo = styled.div`
  color: ${colors.text.secondary};
  font-size: 12px;
`;

export const PageButton = styled.button`
  border: 1px solid ${colors.table.border};
  background: ${colors.table.background};
  color: ${colors.text.primary};
  border-radius: 6px;
  width: 32px;
  height: 32px;
  padding: 0;
  font-size: 12px;
  line-height: 16px;
  cursor: pointer;
  outline: none;

  &:disabled {
    cursor: not-allowed;
    border: 2px solid ${colors.theme.primary};
  }

  &:focus-visible {
    outline: 2px solid ${colors.theme.primary};
    outline-offset: 2px;
  }
`;

export const PrevNextButton = styled.button`
  border: 1px solid ${colors.table.border};
  background: ${colors.table.background};
  color: ${colors.text.primary};
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 12px;
  line-height: 16px;
  cursor: pointer;
  outline: none;

  &:disabled {
    cursor: not-allowed;
    border: 2px solid ${colors.theme.primary};
  }

  &:focus-visible {
    outline: 2px solid ${colors.theme.primary};
    outline-offset: 2px;
  }
`;

export const PrevNextButtonGroup = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  justify-self: end;
`;


export const PageButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-self: center;
`;