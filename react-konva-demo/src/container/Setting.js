import {connect} from 'react-redux';
import Setting from '../components/Setting'
import {initChess, undoChess, changeTurn, endChess} from '../reducer/chess'
const mapStateToProps = (state)=>{
  return {
    ...state.chess,
    ...state.globalSetting
  }
}
const mapDispathToProps = (dispath)=>{
  return {
    initChess:(size)=>{
       dispath(initChess(size))
    },
    undoChess:()=>{
      dispath(undoChess())
    },
    changeTurn:()=>{
      dispath(changeTurn())
    },
    endChess:()=>{
      dispath(endChess())
    }
  }
}


export default connect(mapStateToProps,mapDispathToProps)(Setting);
