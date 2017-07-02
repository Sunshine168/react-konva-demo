import {connect} from 'react-redux';
import  Chess from '../components/Chess'
import {initChess} from '../reducer/chess';
const mapStateToProps = (state)=>(state.chess)
const mapDispathToProps = (dispath)=>{
  return {
    initChess:(size)=>{
      dispath(initChess(size))
    }
  }
}
export default connect(mapStateToProps,mapDispathToProps)(Chess)
