import {Layer, Stage} from 'react-konva';
import React,{Component} from 'react'
import {connect} from 'react-redux'
import Board from '../components/Board'
import Chess from './Chess'
import HandleChess from './HandleChess'
import Setting from './Setting'
class GoBang extends Component {
  constructor(...args) {
    super(...args);
  }
  componentDidMount() {
    this.stage = this.refs.stage
}
 _getState(){
   return this.refs.stage;
 }
  render(){
    const {winWidth, winHeight, gridSize, cheeSize} = this.props;
    return (
      <div className = "container">
        <Setting/>
        <Stage
          ref = "stage"
          width = {winWidth}
          height = {winHeight}
        >
          <Layer>
            <Board
              width= {winWidth}
              height= {winHeight}
              gridSize = {gridSize}
            />
            <Chess
              width= {winWidth}
              height= {winHeight}
              gridSize= {gridSize}
              cheeSize= {cheeSize}
            />
            <HandleChess
              getStage = {()=> this._getState()}
            />
          </Layer>
        </Stage>
      </div>

    )
  }
}


const mapStateToProps = (state)=>(state.globalSetting)

export default connect(mapStateToProps)(GoBang)
