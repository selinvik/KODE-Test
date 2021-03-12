import React from 'react';
import styled from 'styled-components';
import { IMyInterface } from '../../store/reducer';
import { connect } from 'react-redux';
import { formatPhoneNumberToView } from '../../utils/functions';

const InputContainer = styled.div`
  width: 100%;
  height: 60%;
`

const InputTitle = styled.div<{clicked: boolean}>`
  display: ${props => props.clicked ? 'block' : 'none'};
  font-size: 12px;
  color: rgb(128, 144, 166);
`

const Input = styled.input`
  width: 100%;
  padding: 5px 0px;
  font-size: 16px;
  border: 0;
`

const InputLine = styled.div`
  height: 1px;
  width: 100%;
  background-color: rgb(0, 53, 148);
`

const InputAdvice = styled.div`
  font-size: 12px;
  color: rgb(128, 144, 166);
`

type TPhoneInputProps = {
  phoneInputValue: string,
  changePhoneInputValue: Function,
  isLoading: boolean
}

type TPhoneInputState = {
  clicked: boolean
}

class PhoneInput extends React.Component<TPhoneInputProps, TPhoneInputState> {
  state = {
    clicked: false,
  }

  handleClick(clicked: boolean){
    this.setState({clicked})
  }

  render(){
    const { clicked } = this.state;
    const { phoneInputValue, changePhoneInputValue, isLoading} = this.props;
    return(
      <InputContainer>
        <InputTitle clicked={clicked}>Номер телефона</InputTitle>
        <Input
          onBlur={() => this.handleClick(!clicked)}
          onFocus={() => this.handleClick(!clicked)}
          onChange={(event) => changePhoneInputValue(event)}
          value={formatPhoneNumberToView(phoneInputValue)}
          placeholder={clicked ? '' : 'Номер телефона'}
          autoCapitalize='none'
          autoComplete='noop'
          autoCorrect='off'
          dir='auto'
          spellCheck='false'
          type='text'
          disabled={isLoading}
        />
        <InputLine/>
        <InputAdvice>
          Укажите ваш номер телефона. Он будет использоваться для входа в приложение
        </InputAdvice>
      </InputContainer>
    )
  }
}

const mapStateToProps = (state: IMyInterface) => {
  return {
    isLoading: state.isLoading
  }
}

export default connect(mapStateToProps, {})(PhoneInput);

