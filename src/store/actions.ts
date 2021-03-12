import { action } from 'typesafe-actions';
import { TOGGLE_CONDITION_CHECKBOX, TOGGLE_LOADING } from './actionNames';

export const toggleConditionCheckbox = (isChecked: boolean) =>
  action(TOGGLE_CONDITION_CHECKBOX, { isConditionsApproved: isChecked });

export const toggleLoading = (isLoading: boolean) =>
  action(TOGGLE_LOADING, { isLoading });