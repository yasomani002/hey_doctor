import { styled } from "styled-components";

export const Divider = styled.div<{ margin?: string }>`
    border-bottom: 1px solid #e5e7eb;
    margin: ${({ margin }) => margin || "10px 0"};
`

// record box
export const RecordBox = styled.div`
    border: 1px solid #e5e7eb;
    padding: 10px;
    margin: 10px 0;
    border-radius: 4px;
`