import React, { useEffect, useContext} from 'react'
import Page from './Page'
import Login from './Login'
import Register from './Register'
import Landing from './Landing'
import Header from './Header'

import { registerUser, login, isLoggedIn, context } from '../logic'
import { Context } from './ContextProvider'
import { Route, withRouter, Redirect } from 'react-router-dom'

export default withRouter(function ({ history }) {
  const [state, setState] = useContext(Context)
  const { page, error } = state
  
  useEffect(() => {
      setState({ page: 'landing' })
      history.push('/landing')

  }, [])


  async function handleRegister(name, surname, email, telf, password) {
    try {
      await registerUser(name, surname, email, telf, password)
      setState({ page: 'login' })
    } catch ({ message }) {
      setState({ error: message })
    }
  }

  async function handleLogin(email, password) {
    try {
      await login(email, password)
      history.push('/register')
    } catch ({ message }) {
      setState({ ...state, error: message })
    }
  }
  function handleGoToLogin() {
    history.push('/login')
  }
  
  function handleGoToRegister() {
    history.push('/register')
  }
  
  function handleMountLanding() {
    setState({ page: 'landing' })
  }
  function handleMountLogin() {
    setState({ page: 'login' })
  }

function handleMountHeader(){
    setState({ page: 'header'})
  }

  function handleMountRegister(){
    setState({ page: 'register'})
  }

  return <div>
    <Page name={page}>
      <Route exact path="/" render={() => <Redirect to="/landing" />} />
      <Route path="/landing" render={() => <Landing  error={error} onGoToRegister={handleGoToRegister} onGoToLogin={handleGoToLogin} onMount={handleMountLanding} />} />      
      
      
      <Route path="/login" render={() => <Login onSubmit={handleLogin} error={error} onGoToRegister={handleGoToRegister} onMount={handleMountLogin} />} />
      <Route path="/main" render={()=> <Header onMount={handleMountHeader} />} /> 
      {/* <Route path="/" render={() => <h1>Hello, All</h1>} />  */}
      {/* <Route path="/login" render={() => <h1>Hello, Login</h1>} />  */}
      {/* <Route path="/home/:id" render={props => <h1>{props.match.params.id}</h1>} /> */}
      <Route path="/register" render={() => isLoggedIn() ? <Redirect to="/home" /> : <Register onSubmit={handleRegister} error={error} onGoToLogin={handleGoToLogin} onMount={handleMountRegister} />} />      
      {/* <Route path="/home" render={() => isLoggedIn() ? <Home /> : <Redirect to="/login" />} />  */}
    </Page>

  </div>
})


