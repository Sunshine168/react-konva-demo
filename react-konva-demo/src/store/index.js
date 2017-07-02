import {createStore, combineReducers} from 'redux';
import chess from '../reducer/chess';
import globalSetting from '../reducer/globalSetting';
const reducer = combineReducers({
   chess,
   globalSetting
})
const store = createStore(reducer,{
  chess:{
    doList:[],
    chessStore:[],
    turn:1,
  },
  globalSetting:{
      winHeight:800,
      winWidth:800,
      gridSize:50,
      cheeSize:20,
  }
})

export default store;
