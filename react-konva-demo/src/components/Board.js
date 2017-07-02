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
