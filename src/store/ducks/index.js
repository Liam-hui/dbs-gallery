import { combineReducers } from 'redux';

const featureImagePositionReducer = ( state = 0, action ) => {
  switch( action.type ) {
    case 'SET_FEATURE_IMAGE_POSITION':
      console.log('asdfasdf', action.payload)
      return action.payload;
    default: return state;
  }
}

const reducers = combineReducers({
  default: () => [],
    featureImagePosition: featureImagePositionReducer
});

export default reducers;