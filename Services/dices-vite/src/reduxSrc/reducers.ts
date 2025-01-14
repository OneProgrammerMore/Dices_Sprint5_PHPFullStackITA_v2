// reducers.ts
import { combineReducers } from 'redux';
import { UPDATE_VARIABLE } from './actions';

const initialState = {
  sharedVariable: null,
};

// Define the action interface
interface UpdateVariableAction {
  type: typeof UPDATE_VARIABLE;
  payload: string; // Adjust this type based on the payload structure (e.g., string, number, etc.)
}

// Define the possible action types
type Action = UpdateVariableAction;

const sharedReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case UPDATE_VARIABLE:
      return {
        ...state,
        sharedVariable: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  shared: sharedReducer,
});

export default rootReducer;
