import React from 'react';
import styled from 'styled-components';

const NavigationContainer = styled.div<{isNavigationShows: boolean}>`
display: ${props => props.isNavigationShows ? 'flex' : 'none'};
  align-items: center;
  width: calc(100% - 40px);
  height: 15%;
  margin: 0px 20px;
`

const IconContainer = styled.div`
  width: 24px;
  height: 24px;
`

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 24px;
  font-size: 16px;
  color: rgb(17, 24, 32);
`

export interface INavigationProps {
  isNavigationShows: boolean,
  text?: string
}

const Navigation = ({ isNavigationShows, text }: INavigationProps) => {
  return(
    <NavigationContainer isNavigationShows={isNavigationShows}>
      <IconContainer>
        <svg width='24' height='24' fill='none'>
          <path d="M2 12l7.496-7.496 1.414 1.414L5.828 11H21v2H5.828l5.082 5.082-1.414 1.414L2 12z" fill="#003594"></path>
        </svg>
      </IconContainer>
      <HeaderContainer>
        {text}
      </HeaderContainer>
    </NavigationContainer>
  )
}

export default Navigation;