import { Home } from '../components/Home'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as EmployeeActions from '../actions/employee'

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(EmployeeActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
