
import * as actions from './actions';
import { TOGGLE_CONDITION_CHECKBOX, TOGGLE_LOADING } from './actionNames';
import { ActionType } from 'typesafe-actions';
type TAction = ActionType<typeof actions>;

export interface IMyInterface{
  isConditionsApproved: boolean,
  isLoading: boolean
}

const initialState: IMyInterface = {
  isConditionsApproved: false,
  isLoading: false
}

const reducer = (state = initialState, action: TAction) => {
  if(action.type === TOGGLE_CONDITION_CHECKBOX) {
    return {
      ...state,
      isConditionsApproved: action.payload.isConditionsApproved
    }
  }
  else if(action.type === TOGGLE_LOADING) {
    return {
      ...state,
      isLoading: action.payload.isLoading
    }
  }
  else return state; 
}

export default reducer;