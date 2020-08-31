import React from 'react';
import styled, { keyframes } from 'styled-components';
import * as Constants from '../constants/SharedConstants';

interface LoadingIndicatorProps {
  spinnerColor: string
}

const LoadingIndicator = (props: LoadingIndicatorProps) => {

  return (
    <LoadingContainer>
      <Spinner spinnerColor={props.spinnerColor} />
    </LoadingContainer>
  );
}

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const skScaleout = keyframes`
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 0;
  }
}
`

type SpinnerProps = {
  spinnerColor: string;
};

const Spinner = styled.div<SpinnerProps>`
  width: 40px;
  height: 40px;
  margin: ${Constants.LARGE_MARGIN};
  background-color: ${props => props.spinnerColor};

  border-radius: 100%;
  -webkit-animation: ${skScaleout} 1s infinite ease-in-out;
  animation: ${skScaleout} 1s infinite ease-in-out;
}
`

export default LoadingIndicator;