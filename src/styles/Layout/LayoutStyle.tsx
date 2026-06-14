import { colors } from "@/styles/colors";
import styled from "styled-components";

export const LayoutWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100svh;
  height: 100svh;
  overflow: hidden;
  position: relative;
  background-color: ${colors.theme.sidebarBg};
  gap: 0;

  /* Responsive adjustments */
  @media (max-width: 768px) {
    min-height: 100vh;
    height: 100vh;
    flex-direction: column;
    padding: 0;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    min-height: 100svh;
    height: 100svh;
  }

  @media (min-width: 1025px) {
    min-height: 100svh;
    height: 100svh;
    max-width: 100vw;
  }
`;

export const MainContainer = styled.main`
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  background-color: ${colors.theme.themeBg};
  // padding: 10px 15px 0px 15px;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
    height: calc(100vh - 0px);
    border-radius: 0;
  }
`;
// export const HeaderContainer = styled.div`
//   position: sticky;
//   z-index: 10;
//   top: 0px;
//   width: 100%;
//   display: flex;
//   justify-content: space-around;
//   /* z-index: 100; */
// `;
// export const HeaderAndBodyContainer = styled.div`
//   height: 100%;
//   width: 100%;
//   position: relative;
// `;

export const BodyContainer = styled.div`
  padding-top: 12px;
  padding-left: 20px;
  max-height: calc(100svh - 48px);
  overflow-y: auto;
  padding-right: 20px;
  height: calc(100svh - 48px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
