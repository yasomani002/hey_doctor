import styled, { keyframes } from "styled-components";

const draw = keyframes`
  from {
    stroke-dashoffset: 1200;
  }

  to {
    stroke-dashoffset: 0;
  }
`;

const ECGContainer = styled.div`
  width: 100%;
  max-width: 100%;

  svg {
    width: 100%;
    height: 60px;
  }

  path {
    fill: none;
    stroke: #2F9C8F;
    stroke-width: 4;
    stroke-linecap: round;
    stroke-linejoin: round;

    stroke-dasharray: 1200;
    stroke-dashoffset: 1200;

    animation: ${draw} 3s linear infinite;

    filter: drop-shadow(0 0 8px #2F9C8F)
  }
`;

const ECG = () => {
  return (
    <ECGContainer>
      <svg viewBox="0 0 800 100" preserveAspectRatio="none">
        <path
          d="
            M0 50
            L80 50
            L100 50
            L120 45
            L140 50
            L160 15
            L180 85
            L200 50
            L320 50
            L340 45
            L360 50
            L380 20
            L400 80
            L420 50
            L520 50
            L540 45
            L560 50
            L580 20
            L600 80
            L620 50
            L800 50
          "
        />
      </svg>
    </ECGContainer>
  );
};

export default ECG;