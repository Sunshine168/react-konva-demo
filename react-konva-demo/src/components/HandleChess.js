 import React, {Component} from 'react';
 import {Shape, Rect, Circle, Group} from 'react-konva';
 import PropTypes from 'prop-types'
 export default class HandleChess extends Component {
  static propTypes=({
  chess:PropTypes.array,
  addChess:PropTypes.func,
  endChess:PropTypes.func,
  turn:PropTypes.number
})
 constructor(props){
   super(props)
   this.__handleChess = this._handleChess.bind(this);
   this._pointer = this._pointer.bind(this);
   this.state = {
     pointerX:null,
     pointerY:null
   }
 }
 _handleChess(){
   let stage = this.props.getStage().getStage(),mousePos,x,y,pointX,pointY,chess,winner,
   {chessStore, addChess, endChess, turn, isBegin, setWinner}  = this.props;
   if(!isBegin){
     return
   }
   const gridSize = 50 ;
   mousePos= stage.getPointerPosition();
   x = mousePos.x,
   y = mousePos.y;
   pointX = mousePos.x > gridSize ? mousePos.x/gridSize :1 ;
   pointY = mousePos.y > gridSize ? mousePos.y/gridSize :1;
   pointX = Math.floor(mousePos.x % gridSize >= 25 ? ++pointX : pointX);
   pointY = Math.floor(mousePos.y % gridSize >= 25 ? ++pointY : pointY);
   /*add Chess*/
   if(chessStore[pointX]&&!chessStore[pointX][pointY]){
      chess = {
        x:pointX,
        y:pointY,
        type:turn,
      }
     if(pointX > 0 && pointY > 0){
       addChess(chess)
     }

     try{
       if(this._isWin(chessStore,chess)){
         if(chess.type === 1 ){
              winner = "白棋"
              setWinner(1)
         }
         if(chess.type ===2 ){
             winner = "黑棋"
             setWinner(2)
         }
         alert(`${winner}胜利,游戏结束`)
         endChess();

       }
     }catch(e){
        console.log(e)
     }

   }


 }
 //扫描游戏是否已经结束了
 _isWin(store,chess){
    let pointX = chess.x,
        pointY = chess.y,
        type   = chess.type,
        count  = 0 ;
        //扫描行
    for(let i = pointX - 5; i <= pointX + 5; i++){
       if(i<=0) {
         continue;
       }

        if(type === store[i][pointY]){
           count++;
         }
       if(count === 5){
          return 1
       }
       if(i + 1 == store.length){
            break;
       }
    }
    //清空count
    count = 0 ;

    //扫描列
    for(let j = pointY - 5; j<= pointY + 5; j++){
      if(j<=0) {
        continue;
      }else{
        if(type === store[pointX][j]){
          count++;
        }
      }
      if(count === 5){
         return 1
      }
      if(j + 1 == store[pointX].length){
           break;
      }
    }
    //清空count
    count = 0 ;

    //扫描右对称轴
    for(let i = pointX - 5, j = pointY - 5;i <= pointX + 5; i++,j++){
      if(i <= 0 || j<= 0) {
        continue;
      }else{
        if(type === store[i][j]){
          count++;
        }
      }
      if(count === 5){
         return 1
      }
      if(i + 1 == store.length || j + 1 == store[i].length){
           break;
      }
    }
    //清空count
    count = 0 ;
    //扫描左对称轴
    for(let i = pointX + 5, j = pointY +5; i>=pointX - 5; i--,j--){
      if(i + 1 >= store.length || j + 1 >= store[i].length) {
        continue;
      }else{
        if(type === store[i][j]){
          count++;
        }
      }
      if(count === 5){
         return 1
      }
      if(i <= 0 || j<= 0){
           break;
      }
 }
  return 0;
}
/*绘制一个跟随光标的棋子*/
_pointer(){
  let stage = this.props.getStage().getStage(),
  mousePos = stage.getPointerPosition();
  this.setState({
    pointerX: mousePos.x,
    pointerY: mousePos.y
  })
}
 /*父组件需要传入stage？*/
 render(){
    let winWidth= 800, winHeight= 800;
    const {turn, cheeSize} = this.props;
    let {pointerX, pointerY} =  this.state;
    return (
      <Group>
        {this.props.isBegin && pointerX && pointerY ?
          <Circle
            x = {pointerX}
            y = {pointerY}
            fill = {turn===1? "white" : "black"}
            radius = {20}
          />
          :null
        }
        <Rect
          x = {0}
          y = {0}
          height = {winHeight}
          width  = {winWidth}
          onClick = {this.__handleChess}
          onMousemove = {this._pointer}
        />
      </Group>
);
 }
}
