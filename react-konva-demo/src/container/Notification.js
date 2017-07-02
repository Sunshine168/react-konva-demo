import {connect} from 'react-redux'
import Notification from '../components/Notification'
const mapStateToProps = (state)=>(
  state.chess
)

export default connect(mapStateToProps)(Notification)
