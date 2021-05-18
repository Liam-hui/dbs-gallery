import { combineReducers } from 'redux';

const screenReducer = ( state = { width: window.innerWidth, height: window.innderHeight }, action ) => {
  switch( action.type ) {
    case 'SET_SCREEN':
      return {
        ... action.payload
      };
    default: return state;
  }
}

export default () =>
  combineReducers({
    screen: screenReducer
  });