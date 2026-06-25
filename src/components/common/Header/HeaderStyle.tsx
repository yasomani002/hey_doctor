import styled from "styled-components";

export const HeaderContainer = styled.div`
    height: 3rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 8px 0;

`

export const HeaderProfileBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
`;

export const MenuListBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f5f5f5;
  }
`;