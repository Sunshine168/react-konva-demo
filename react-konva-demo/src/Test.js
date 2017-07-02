import React, { Component } from 'react';
import {Layer, Rect, Stage, Group,Shape} from 'react-konva';
import Konva from 'konva';
import Board from './components/Board'
import Chess from './container /Chess'
import HandleChess from './container/HandleChess'
import {getData} from './testModel/Chess.js'
export default class Gobang extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      color: 'green'
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({
      color: Konva.Util.getRandomColor()
    });
  }
  _shapeTest(context){
      context.beginPath();
       context.moveTo(20, 50);
       context.lineTo(220, 80);
       context.quadraticCurveTo(150, 100, 260, 170);
       context.closePath();
       // Konva specific method
       context.fillStrokeShape(this.shape);

       context.beginPath();
        context.moveTo(70, 120);
        context.lineTo(220, 80);
        context.quadraticCurveTo(150, 100, 260, 170);
        context.closePath();
        context.fillStrokeShape(this.shape);

  }
  _grid(context){
     let winWidth= 800, winHeight= 800, gridSize= 50,col= 0, row= 0;
     col= Math.ceil(winWidth/gridSize);
     row= Math.ceil(winHeight/gridSize);
     for(let i= 0; i<= col; i++) {
       context.beginPath();
         context.moveTo(gridSize*i,0);
         context.lineTo(gridSize*i,winHeight);
         context.stroke();
          context.closePath();
     }
      for(let j= 0; j<= row; j++){
        context.beginPath();
        context.moveTo(0,gridSize*j);
        context.lineTo(winWidth,gridSize*j);
        context.stroke();
        context.closePath();
      }
  }
  componentDidMount() {
    // // log stage react wrapper
    // console.log(this.refs.stage);
    // // log Konva.Stage instance
    // console.log(this.refs.stage.getStage());
    this.stage = this.refs.stage
}
 _getState(){
   console.log(this)
   console.log(this.stage);
   return this.refs.stage;
 }
  render(){
    let {winWidth, winHeight} = this.props;
    console.log(this);
    return (
      <div className = "container">
        <Stage
          ref = "stage"
          width = {winWidth}
          height = {winHeight}
        >
          <Layer>

            <Board
              width= {winWidth}
              height= {winHeight}
              gridSize = {50}
            />
            <Chess
              width= {winWidth}
              height= {winHeight}
              gridSize= {50}
              cheeSize= {20}
            />
            <Shape
              x={10} y={10} width={50} height={50}
              sceneFunc = {(context)=>this._shapeTest(context)}
              fill={'#00D2FF'}
              stroke={ 'black'}
              strokeWidth={ 4}
              draggable={true}
              ref = {(node)=>this.shape=node}
            />
            <HandleChess
              getStage = {()=> this._getState()}
              start = {0}
            />
          </Layer>
        </Stage>
      </div>

    )
  }
}
