import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../../components/Header'

import './index.css'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    isLoading: false,
    errorMsg: '',
  }

  renderLoader = () => (
    <div>
      <Loader type="ThreeDots" color="#e50914" height="50" width="50" />
    </div>
  )

  onChangeNameInput = e => {
    this.setState({username: e.target.value})
  }

  onChangePasswordInput = e => {
    this.setState({password: e.target.value})
  }

  onSubmitLoginForm = async e => {
    e.preventDefault()
    this.setState({isLoading: true})
    const {history} = this.props
    const {username, password} = this.state

    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    this.setState({isLoading: false})
    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      history.push('/')
    } else {
      this.setState({errorMsg: data.error_msg})
    }
  }

  renderLoginForm = () => {
    const {username, password, errorMsg} = this.state
    return (
      <div className="login-form-container">
        <h2>Login</h2>
        <form className="login-form" onSubmit={this.onSubmitLoginForm}>
          <div className="login-input-container">
            <label htmlFor="username">USERNAME</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={this.onChangeNameInput}
            />
          </div>
          <div className="login-input-container">
            <label htmlFor="password">PASSWORD</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={this.onChangePasswordInput}
            />
            {errorMsg && <p>{errorMsg}</p>}
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="login-page-container">
        <Header />
        <main>{isLoading ? this.renderLoader() : this.renderLoginForm()}</main>
      </div>
    )
  }
}

export default LoginPage
