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
