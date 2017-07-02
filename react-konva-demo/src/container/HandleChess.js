import {connect} from 'react-redux';
import {addChess, endChess, setWinner} from '../reducer/chess'
import  HandleChess from '../components/HandleChess'
const mapStateToProps = (state)=>(state.chess)

const mapDispathToProps = (dispath)=>{
  return {
    addChess:(chess)=>{
      dispath(addChess(chess))
    },
    endChess:()=>{
      dispath(endChess())
    },
    setWinner:(winner)=>{
      dispath(setWinner(winner))
    }
  }
}

export default connect(mapStateToProps,mapDispathToProps)(HandleChess)
