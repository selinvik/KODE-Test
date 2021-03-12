import React from 'react';
import styled from 'styled-components';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleConditionCheckbox } from '../../store/actions';
import { IMyInterface } from '../../store/reducer';

const ConditionsContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 50px;
`

const CheckboxContainer = styled.div<{isLoading: boolean}>`
  width: 24px;
  height: 24px;
  margin-right: 5px;
  pointer-events: ${props => props.isLoading ? 'none' : 'auto'};
`

const TextContainer = styled.div`
  color: rgb(17, 24, 32);
  font-size: 12px;
  a{
    color: rgb(0, 53, 148);
  }
`

interface IConditionsProps {
  isConditionsApproved: boolean,
  toggleConditionCheckbox: Function,
  isLoading: boolean,
  snackBarType: string
}

const Conditions = ({
  isConditionsApproved, 
  toggleConditionCheckbox,
  isLoading,
  snackBarType
}: IConditionsProps) => {
  return(
    <ConditionsContainer>
      <CheckboxContainer isLoading={isLoading} onClick={() => toggleConditionCheckbox(!isConditionsApproved)}>
        {
          isConditionsApproved ? 
          <svg width='24' height='24' fill='none'>
            <path fill={isLoading ? 'rgb(128, 144, 166' : "#003594"} fillRule="evenodd" clipRule="evenodd" d="M0 0h24v24H0V0zm18.796 5.646l1.967 1.968L9.795 18.558l-6.149-6.149 1.968-1.968 4.182 4.205 9-9z"></path>
          </svg>
          :
          <svg width='24' height='24' fill='none'>
            <path d="M1 1h22v22H1V1z" stroke={snackBarType === 'error' ? 'rgb(220, 35, 40)' : "#003594"} strokeWidth="2"></path>
          </svg>
        }
      </CheckboxContainer>
      <TextContainer>
        Я ознакомлен с
        <a target='_blank' rel='noreferrer' href='https://www.utair.ru/about/politics/#politika-pao-aviakompaniya-yuteyr-v-oblasti-obrabotki-personalnykh-dannykh-i-trebovaniya-k-organizats'> условиями использования моих персональных данных </a>
        и даю
        <a target='_blank' rel='noreferrer' href='https://www.utair.ru/about/politics/#soglasie-na-obrabotku-personalnykh-dannykh-klienta-pao-aviakompaniya-yuteyr'> согласие </a>
        на их обработку
      </TextContainer>
    </ConditionsContainer>
  )
}

const mapStateToProps = (state: IMyInterface) => {
  return {
    isConditionsApproved: state.isConditionsApproved,
    isLoading: state.isLoading
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
  {toggleConditionCheckbox}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Conditions);