
/*chess action */

const ADD_CHESS = 'ADD_CHESS';
const UNDO_CHESS = 'UNDO_CHESS';
const INIT_CHESS  ='INIT_CHESS';
const END_CHESS   = 'END_CHESS';
const CHANGE_TURN = 'CHANGE_TURN';
const SET_WINNER  = 'SET_WINNER';
const chess = (state,action)=>{
  if(!state){
    return  null
  }
    switch(action.type){
      case INIT_CHESS:
      let store = [];
      for(let i = 0; i<action.size; i++){
        store[i] = [];
        for(let j = 0; j<action.size ;j++){
          store[i][j] = 0 ;
        }
      }
      return {
        ...state,
        isBegin:true,
        chessStore: store
      }
      case ADD_CHESS:
      var newStore = [...state.chessStore]
      newStore[action.chess.x][action.chess.y] = action.chess.type;
      let doChess = {
        x:action.chess.x,
        y:action.chess.y,
      }
      return {
        ...state,
        chessStore:newStore,
        doList: [...state.doList,doChess],
        turn:state.turn===1 ? 2 : 1
      }
      case UNDO_CHESS:
      var newStore = [...state.chessStore],
          newDoList = [...state.doList],
          lastDo = newDoList.pop();
          newStore[lastDo.x][lastDo.y] = 0;
      return {
        ...state,
        chessStore:newStore,
        doList:newDoList,
        turn:state.turn===1?2:1
      }
      case CHANGE_TURN:
      return {
        ...state,
        turn:state.turn===1 ? 2 : 1
      }
      case END_CHESS:
      return {
        ...state,
        doList:[],
        isBegin:false,
      }
      case SET_WINNER:
      return {
        ...state,
        winner:action.winner
      }
      default:
      return state;
    }
  }
export const initChess = (size)=>({
    type:INIT_CHESS,
    size
  })
export const addChess = (chess)=>({
  type:ADD_CHESS,
  chess
})
export const undoChess = ()=>({
  type:UNDO_CHESS
})
export const endChess = ()=>({
    type:END_CHESS
  })
 export const changeTurn = () =>({
   type:CHANGE_TURN
 })
 export const setWinner = (winner) => ({
   type:SET_WINNER,
   winner
 })
export default chess;
