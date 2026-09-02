import styled from "styled-components";
import { colors } from "@/styles/colors";

// Constants for permission matrix layout
export const PERMISSION_HEADER_HEIGHT_PX = 34;
export const PERMISSION_ROW_HEIGHT_PX = 42;

export const PermissionMatrixContainer = styled.div`
  border: 1px solid ${colors.table.border};
  border-radius: 0.375rem;
  display: flex;
  flex-direction: column;
  overflow: auto;
  background-color: ${colors.table.background};
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const PermissionMatrixHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 0.8fr repeat(4, 0.7fr);
  gap: 8px;
  font-weight: 700;
  border-bottom: 1px solid ${colors.table.border};
  padding-bottom: 8px;
  position: sticky;
  top: 0;
  z-index: 10;
  text-align: center;
  padding: 8px 16px;
  background-color: ${colors.table.header};
  color: ${colors.text.primary};
  font-size: 0.875rem;
`;

export const PermissionMatrixHeaderCell = styled.div<{ textAlign?: "left" | "center" }>`
  ${(props) => props.textAlign === "left" && "text-align: left;"}
  ${(props) => props.textAlign === "center" && "text-align: center;"}
  font-size: 0.875rem;
`;

export const PermissionMatrixContent = styled.div`
  overflow-y: auto;
  flex-grow: 1;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export const PermissionMatrixRow = styled.div<{ isSubRow?: boolean }>`
  display: grid;
  grid-template-columns: 2fr 0.8fr repeat(4, 0.7fr);
  gap: 8px;
  align-items: center;
  border-bottom: 1px solid ${colors.table.border};
  text-align: center;
  background-color: ${(props) =>
        props.isSubRow ? colors.table.header : colors.table.background};
  transition: background-color 0.2s ease;
  border-bottom: ${(props) => props.isSubRow ? "1px solid #f3f4f6" : "1px solid ${colors.table.border}"};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f9fafb;
  }
`;

export const PermissionMatrixMenuCell = styled.div<{ isSubMenu?: boolean }>`
  grid-column: 1;
  font-weight: ${(props) => (props.isSubMenu ? 400 : 600)};
  text-align: left;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  font-size: 0.875rem;
  ${(props) => props.isSubMenu && "padding-left: 1rem;"}
  color: ${colors.text.primary};
`;

export const PermissionMatrixActionCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PermissionMatrixToggleButton = styled.button`
  padding: 8px;
  border-radius: 0.25rem;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #e5e7eb;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }
`;

export const PermissionMatrixSubMenuIndicator = styled.span`
  margin-right: 8px;
  color: ${colors.text.secondary};
`;



//// new design ////

export const MainMenuDropDownBox = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
  background-color: #ffffff;
`;

export const MainMenuDropDownButton = styled.button`
  display: flex;
  height: 40px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  text-align: left;
  font-size: 25px;
  font-weight: 600;
  color: #1f2937;
`;

export const SubMenuContainer = styled.table`
  
`;

export const SubMenuHeader = styled.div<{ columnCount: number }>`
  display: grid;
  grid-template-columns: ${({ columnCount }) =>
        `minmax(0, 200px) repeat(${columnCount}, minmax(0, 150px))`};

  width: 100%;
  min-height: 44px;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
  // background: ;
  padding: 0 12px;
  font-size: 14px;
  font-weight: 600;
  color: #374151;

  &:hover {
    background-color: ${colors.table.hover};
  }
`;