import React, {Component} from 'react'
import {Text} from 'react-konva'
// var complexText = new Konva.Text({
//     x: 20,
//     y: 60,
//     text:
//     fontSize: 18,
//     fontFamily: 'Calibri',
//     fill: '#555',
//     width: 300,
//     padding: 20,
//     align: 'center'
//   });
export default class Notification extends Component {

  render(){
    const {winHeight, winWidth,winner} = this.props;
    let x = winWidth / 4, y = winHeight / 4,text = "";
    if(winner){
      if(winner === 1 ){
        text = "白旗胜利";
      }
      if(winner === 2 ){
        text = "黑棋胜利";
      }
    }
    return(
      <Text
        x = {x}
        y = {y}
        text = {"hello"}
        fontSize = {40}
        fontFamily = {'Calibri'}
        fill = {'#555'}
        width = {400}
        padding = {20}
        align = {'center'}
      />
    )
  }
}
