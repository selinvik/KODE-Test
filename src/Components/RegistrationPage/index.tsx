import React from 'react';
import styled from 'styled-components';
import ContinueButton from './ContinueButton';
import Conditions from './Conditions';
import SnackBar from './SnackBar';
import Navigation from './Navigation';
import PhoneInput from './PhoneInput';
import { v4 as uuidv4 } from 'uuid';
import {Dispatch, bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { toggleLoading } from '../../store/actions';
import Spinner from 'react-bootstrap/Spinner'; 
import checkIcon from '../../icons/checkIcon.png';
import crossIcon from '../../icons/crossIcon.png';
import { IMyInterface } from '../../store/reducer';
import { formatPhoneNumberToRequest } from '../../utils/functions';

const StyledLayout = styled.div`
  height: 95vh;
  width: 100%;
  margin: 0;
  padding: 0;
`

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100% - 40px);
  height: 65%;
  margin: 0px 20px;
  margin-top: 20px;
`

const SpinnerContainer = styled.div<{isLoading: boolean}>`
  position: absolute;
  top: calc(50% - 25px);
  left: calc(50% - 25px);
  display: ${props => props.isLoading ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: rgb(0, 53, 148);
`

const SpinnerResultContainer = styled.div<{isSpinnerResultShows: boolean, snackBarType: string}>`
  position: absolute;
  top: calc(50% - 25px);
  left: calc(50% - 25px);
  display: ${props => props.isSpinnerResultShows ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: ${props => props.snackBarType === 'error' ? 'rgb(220, 35, 40)' : 'rgb(0, 53, 148)'};
`

type TRegistrationPageProps = {
  isConditionsApproved: boolean,
  isLoading: boolean,
  toggleLoading: Function
}

type TRegistrationPageState = {
  isSnackBarShows: boolean,
  snackBarType: string,
  snackBarMessage: string,
  isNavigationShows: boolean,
  isSpinnerResultShows: boolean,
  phoneInputValue: string,
}

class RegistrationPage extends React.Component<TRegistrationPageProps, TRegistrationPageState> {

  state = {
    isSnackBarShows: false,
    snackBarType: '',
    snackBarMessage: '',
    isNavigationShows: true,
    isSpinnerResultShows: false,
    phoneInputValue: '',
  }

  showSnackBar(snackBarType: 'error' | 'success', snackBarMessage: string, isSpinnerResultShows: boolean) {
    this.setState({
      isSnackBarShows: true,
      isNavigationShows: false,
      snackBarType,
      snackBarMessage,
      isSpinnerResultShows
    })
    setTimeout(() => this.setState({
      isSnackBarShows: false,
      isNavigationShows: true,
      snackBarType: '',
      isSpinnerResultShows: false
    }), 3 * 1000);
  }

  changePhoneInputValue(event: React.ChangeEvent<HTMLInputElement>){
    const phoneNumber = formatPhoneNumberToRequest(event.target.value);
    this.setState({
      phoneInputValue: phoneNumber
    })
  }

  async getToken() {
    let udid = localStorage.getItem('udid');
    if(udid === null){
      udid = uuidv4();
      localStorage.setItem('udid', udid);
    }
    const response = await fetch('https://thingproxy.freeboard.io/fetch/https://www.utair.ru/mobile/api/v8/sessions/guest',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "appVersion":"Web",
        "brandName":"Web",
        "lang":"ru",
        "model":"Web",
        "osVersion":"Web",
        "platform":"web",
        "screenResolution":"Web",
        "udid": udid
      })
    });
    let result: {
      prefix: string,
      token: string,
      refresh_token: string
    } = await response.json();
    return result;
  }

  async onContinueButtonPressed(){
    if(this.props.isConditionsApproved === false){
      this.showSnackBar('error', 'Чтобы создать аккаунт Utair, нужно ваше согласие на обработку данных', false);
    }
    else if(this.state.phoneInputValue.length < 11){
      this.showSnackBar('error', 'Некорректно введен номер', false);
    }
    else {
      try {
        this.props.toggleLoading(true);
        const token = await this.getToken();
        const response = await fetch('https://thingproxy.freeboard.io/fetch/https://www.utair.ru/mobile/api/v8/account/profile',
        {
          method: 'POST',
          headers: {
            'Authorization': 'Token ' + token.token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            login: this.state.phoneInputValue,
            confirmationGDPRDate: Date.now()
          })
        });
        this.props.toggleLoading(false);
        if(response.status === 400){
          this.showSnackBar('error', 'Не удалось создать аккаунт', true);
        }
        else if(response.status === 580){
          this.showSnackBar('error', 'Ошибка сервера', true);
        }
        else if(response.status === 595){
          this.showSnackBar('error', 'Логин занят', true);
        }
        else if(response.status === 200){
          this.showSnackBar('success', 'Аккаунт создан', true);
        }
      } catch(error) {
        this.props.toggleLoading(false);
        console.log(error);
      }
    }
  }

  render(){
    const {  
      isSnackBarShows,
      snackBarType,
      snackBarMessage,
      isNavigationShows,
      isSpinnerResultShows,
      phoneInputValue,
    } = this.state;
    const { isLoading } = this.props;
    return(
      <StyledLayout>
        <SnackBar
         isSnackBarShows={isSnackBarShows}
         snackBarType={snackBarType} 
         snackBarMessage={snackBarMessage}
        />
        <Navigation isNavigationShows={isNavigationShows} text='Регистрация в Utair'/>
        <ContentBox>
          <PhoneInput 
            phoneInputValue={phoneInputValue}
            changePhoneInputValue={this.changePhoneInputValue.bind(this)}
          />
          <Conditions 
            snackBarType={snackBarType}
          />
        </ContentBox>
        <ContinueButton 
          onContinueButtonPressed={this.onContinueButtonPressed.bind(this)}
        />
        <SpinnerContainer isLoading={isLoading}>
          <Spinner animation="border" variant="light" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </SpinnerContainer>
        <SpinnerResultContainer  
          isSpinnerResultShows={isSpinnerResultShows} 
          snackBarType={snackBarType}
        >
          <img 
            src={snackBarType === 'error' ? crossIcon : checkIcon} 
            alt={snackBarType === 'error' ? 'error' : 'check'} 
            width='20' 
            height='20'>
          </img>
        </SpinnerResultContainer>
      </StyledLayout>
    )
  }
}

const mapStateToProps = (state: IMyInterface) => {
  return {
    isConditionsApproved: state.isConditionsApproved,
    isLoading: state.isLoading
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
  {toggleLoading}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);