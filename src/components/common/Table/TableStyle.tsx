import styled from "styled-components";
import { colors } from "@/styles/colors";

// Constants for table layout, adjust as needed
export const ROLE_HEADER_HEIGHT_PX = 44;
export const ROLE_ROW_HEIGHT_PX = 56;

export const RolesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
`;

export const TableScrollArea = styled.div<{ heightPx: number }>`
  width: auto;
  height: ${(props) => props.heightPx}px;
  overflow: auto;
  position: relative;
  border-radius: 12px;
  border: 1px solid ${colors.table.border};
  background-color: ${colors.table.background};
  overflow-x: scroll;
  box-shadow: 0 2px 12px rgba(30, 58, 58, 0.07);
  &::-webkit-scrollbar {
    width: 6px;
    height: 0.3rem;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(30, 58, 58, 0.15);
    border-radius: 4px;
  }
`;

export const GridTable = styled.table`
  display: grid;
  width: max-content;
  min-width: 100%;
  position: relative;
  border-collapse: collapse;
`;

export const GridThead = styled.thead`
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid ${colors.table.border}; 
`;

export const HeaderRow = styled.tr<{ rowHeightPx?: number }>`
  display: flex;
  width: max-content;
  min-width: 100%;
  min-height: ${(props) => props.rowHeightPx || ROLE_HEADER_HEIGHT_PX}px;
  align-items: center;
  background-color: #1e3a3a;
`;

export const HeaderCell = styled.th<{ minWidth: string; flexGrow: string, textAlign?: string }>`
  flex: ${(props) => props.flexGrow};
  min-width: ${(props) => props.minWidth};
  padding: 10px 14px;
  font-size: 0.72rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background-color: transparent;
  text-align: ${(props) => props.textAlign};
  &:first-child {
    padding-left: 1.25rem;
  }
  &:last-child {
    padding-right: 1.25rem;
  }
`;

export const GridTbody = styled.tbody<{ bodyHeightPx: number }>`
  position: relative;
  min-height: ${(props) => props.bodyHeightPx}px;
`;

export const BodyRow = styled.tr<{ translateYPx: number; isAlt: boolean; rowHeightPx?: number }>`
  display: flex;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  ${(props) =>
    props.rowHeightPx
      ? `height: ${props.rowHeightPx}px;`
      : `min-height: ${ROLE_ROW_HEIGHT_PX}px;`
  }
  align-items: center;
  transform: translateY(${(props) => props.translateYPx}px);
  background-color: #ffffff;
  border-bottom: 1px solid #eff2f1;
  &:hover {
    background-color: #f5faf8;
    transition: background-color 0.15s ease;
  }
`;

export const BodyCell = styled.td<{ minWidth: string; flexGrow: string; textAlign?: string }>`
  flex: ${(props) => props.flexGrow};
  min-width: ${(props) => props.minWidth};
  padding: 10px 14px;
  font-size: 0.825rem;
  color: ${colors.text.primary};
  align-items: center;
  p {
    text-align: ${(props) => props.textAlign || "left"};
  }

  &:first-child {
    padding-left: 1.25rem;
  }
  &:last-child {
    padding-right: 1.25rem;
  }
`;

export const EmptyBody = styled.tbody`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px; 
  color: ${colors.text.secondary}; 
  font-size: 1rem; 
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

export const LoaderOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
`;

export const ClampedText = styled.span<{ lines: number }>`
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => props.lines};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PermissionMatrixContainer = styled.div`
  border: 1px solid ${colors.table.border};
  border-radius: 0.375rem; 
  display: flex;
  flex-direction: column;
  max-height: 60vh;
    overflow: auto; 
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

