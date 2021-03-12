import React from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';

const rotate = keyframes`
  0% { 
    transform: translateY(-100%);
  }
  100% { 
    transform: translateY(0%); 
  }
`;

const SnackBarContainer = styled.div<{isSnackBarShows: boolean, snackBarType: string}>`
  display: ${props => props.isSnackBarShows ? 'flex' : 'none'};
  align-items: center;
  width: 100%;
  height: 15%;
  background-color: ${props => props.snackBarType === 'error' ? 'rgb(220, 35, 40)' : 'rgb(0, 53, 148)'};     
  animation: ${rotate} 0.2s;
`

const IconContainer = styled.div`
  width: 34px;
  height: 24px;
  margin: 0 20px;
`

const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 13px;
  color: rgb(255, 255, 255);
  margin-right: 20px;
`

interface ISnackBarProps {
  isSnackBarShows: boolean,
  snackBarType: string,
  snackBarMessage: string
}

const SnackBar = ({ isSnackBarShows, snackBarType, snackBarMessage }: ISnackBarProps) => {
  return(
    <SnackBarContainer isSnackBarShows={isSnackBarShows} snackBarType={snackBarType}>
      <IconContainer>
        <svg width='24' height='24' fill='none'>
          <path fillRule="evenodd" clipRule="evenodd" d="M16 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM3 20l3-6h12l3 6H3z" fill="#ffffff"></path>
        </svg>
      </IconContainer>
      <HeaderContainer>
        {snackBarMessage}
      </HeaderContainer>
    </SnackBarContainer>
  )
};

export default SnackBar;