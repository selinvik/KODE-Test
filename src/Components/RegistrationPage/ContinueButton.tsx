import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { IMyInterface } from '../../store/reducer';


const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20%;
`

const StyledButton = styled.button<{isLoading: boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 40px);
  height: 56px;
  border: none;
  background-color: ${props => props.isLoading ? 'rgb(128, 144, 166)': 'rgb(0, 53, 148)'};
  color: rgb(255, 255, 255);
  font-size: 16px;
`

interface IButtonProps {
  isLoading: boolean,
  onContinueButtonPressed: Function
}

const ContinueButton = ({isLoading, onContinueButtonPressed}: IButtonProps) => {
  return(
    <ButtonContainer>
      <StyledButton isLoading={isLoading} disabled={isLoading} onClick={() => onContinueButtonPressed()}>
        Продолжить
      </StyledButton>
    </ButtonContainer>
  )
}

const mapStateToProps = (state: IMyInterface) => {
  return {
    isLoading: state.isLoading
  }
}

export default connect(mapStateToProps, {})(ContinueButton);