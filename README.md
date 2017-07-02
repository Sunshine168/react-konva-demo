# react-konva-demo
 
## 简介
 [在线例子](https://sunshine168.github.io/react-konva-demo/build/)
 以create-react-app作为脚手架,通过react+redux+react-konva 写一个简单的五子棋游戏,分享一下react-konva的实际使用例子
(没有人机对战功能哟) 
 
 [react-konva](https://github.com/lavrton/react-konva)是一个react组件化的canvas库,来绘制五子棋
 [redux](https://github.com/reactjs/redux)处理游戏中的数据流
 

 
## 思路介绍
把五子棋游戏分为两个部分,一个是设定部分，另外一部分就是游戏本身。
将五子棋游戏本身分解为三层，即分解为三个组件
底层是棋盘,包括棋盘颜色与网格的绘制
中间层是绘制棋子在棋盘上的状态的
最顶层是操作层负责落子以及绘制光标状态。
五子棋状态储存在一个二维数组中,通过判断值是否大于0判断是否已经落子

### 棋盘绘制

```js
// src/components/Board.js
import React,{Component} from 'react';
import {Shape, Group, Rect} from 'react-konva';
export default class Board extends Component {
  constructor(args){
    super(...args)
    //绑定上下文
    this._grid = this._grid.bind(this);
  }
  //绘制网格的函数
  _grid(context){
     /*fill the board */
     context.beginPath();
     context.fillStyle = "#976B42"
     context.fill();
     context.closePath();
     let col= 0, row= 0,
     { width,height, gridSize } = this.props;
     col= Math.ceil(width/gridSize);
     row= Math.ceil(height/gridSize);
     //绘制列
     for(let i= 0; i<= col; i++) {
       context.beginPath();
         context.moveTo(gridSize*i,0);
         context.lineTo(gridSize*i,height);
         context.stroke();
          context.closePath();
     }
     //绘制行
      for(let j= 0; j<= row; j++){
        context.beginPath();
        context.moveTo(0,gridSize*j);
        context.lineTo(width,gridSize*j);
        context.stroke();
        context.closePath();
      }
  }
  render(){
    let { width,height} = this.props;
    console.log(this.props)
     return (
      <Group>
        <Rect
          fill = {"#fed386"}
          width= {width}
          height= {height}
          strokeWidth= {2}
          stroke={ 'black'}
        />
        <Shape
          x= {0}
          y= {0}
          width= {width}
          height= {height}
          strokeWidth= {2}
          sceneFunc = {this._grid}
          stroke={ 'black'}
        />
      </Group>
     )
  }
}
```

Rect是konva中绘制矩形的控件,
Shape是绘制图形的控件即绘制自定义控件通过sceneFunc函数传入context进行自定义绘制


### 棋子绘制

```js
import React ,{Component} from 'react';
import {Shape} from 'react-konva';
export default class ChessDisplay extends Component {
  constructor(props){
    super(props)
    this._drawChess = this._drawChess.bind(this);
  }
  _drawChess(context){
      const {chessStore,gridSize,cheeSize} = this.props;
      if(!chessStore.hasOwnProperty('length')){
           throw Error("must be a valid array");
      }
      //需要初始化数组,
      //type 1 白棋 2 黑棋
      for(let i = 0; i < chessStore.length; i++){
           for(let j = 0; j < chessStore[i].length; j++){
                if(chessStore[i][j] >= 1){
                  if(chessStore[i][j] === 1){
                    context.fillStyle = "white";
                  }
                  if(chessStore[i][j] === 2)
                  {
                    context.fillStyle = "black";
                  }
                   context.beginPath();
                   /*context.arc(x,y,r,sAngle,eAngle,counterclockwise);*/
                   context.arc(i*gridSize,j*gridSize,cheeSize,0,2*Math.PI);
                   context.fill();
                   context.closePath();
                }
           }
      }
   }
  render(){
       let {width, height}  = this.props;
    return (
      <Shape
        x= {0}
        y= {0}
        width= {width}
        height= {height}
        strokeWidth= {2}
        sceneFunc = {this._drawChess}
        stroke={ 'black'}
      />
    )
  }
}

```

### 落子组件
```
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

```



