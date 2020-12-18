import { combineReducers } from 'redux';
import wallet from './wallet';
import ui from './ui';

export default combineReducers({
  ui,
  wallet,
});
