 import React, {Component} from 'react';

  export default class Setting extends  Component {
    constructor(props){
      super(props)
      this.state = {
        turnValue : 1,
      }
      this._selectTurn = this._selectTurn.bind(this);
      this._start = this._start.bind(this);
      this._undo = this._undo.bind(this);
      this._quit = this._quit.bind(this);
    }
    _selectTurn(event){
      const {changeTurn} = this.props;
      this.setState({turnValue: event.target.value});
      changeTurn();
    }
    _start(){
      //开始游戏
      const {initChess, gridSize}  = this.props;
      initChess(gridSize);

    }
    _undo(){
      //悔棋的逻辑
      const {undoChess ,doList}  = this.props;
      if(doList.length){
        undoChess();
      }

    }
    _quit(){
      const {isBegin ,endChess}  = this.props;
      if(isBegin){
        endChess()
      }
    }
     render(){
       return (
         <div className = "control">
           <button
             className = "control-btn"
             onClick = {this._start}
           >
             开始游戏
           </button>
           <button
             className = "control-btn"
             onClick = {this._quit}
           >
             退出游戏
           </button>
           <button
             className = "control-btn"
             onClick = {this._undo}>
             悔棋
           </button>
           <select
             value = {this.state.turnValue}
             onChange={this._selectTurn}>
             >
             <option value = {1} >
               白棋先行
             </option>
             <option value = {2} >
               黑棋先行
             </option>
           </select>
         </div>
       )
     }
  }
