import React, { useEffect, useContext, useState} from 'react'
import { Register, Login, Page, Home, Landing, Header, Feedback } from '../components'
import { registerUser, retrieveUser, login, isLoggedIn, context } from '../logic'
import { Context } from './ContextProvider'
import { Route, withRouter, Redirect } from 'react-router-dom'

export default withRouter(function ({ history }) {
  const [state, setState] = useContext(Context)
  const { page, error } = state
  const [ user, setUser] = useState([])

  useEffect(() => {
      setState({ page: 'landing' })
      history.push('/landing')

  }, [])

  function handleGoToLogin() {
    history.push('/login')
  }

  function handleMountLogin() {
    setState({ page: 'login' })
  }

  function handleMountLanding() {
    setState({ page: 'landing' })
  }

  async function handleLogin(email, password) {
    try {
      await login(email, password)
      const user = await retrieveUser()
      setUser(user)
      history.push('/main')
      //ojito que lo he cambiado
    } catch ({ message }) {
      setState({ ...state, error: message })
    }
  }

  function handleGoToRegister() {
    history.push('/register')
  }
  
  async function handleRegister(name, surname, email, telf, password) {

    try {
      await registerUser(name, surname, email, telf, password)
      setState({ page: 'login' })
    } catch ({ message }) {
      setState({ error: message })
    }
  }

  function handleMountRegister(){
    setState({ page: 'register'})
  }

  



// function handleMountHeader(){
//     setState({ page: 'header'})
//   }



  return <div>
    <Page name={page}>
      <Route exact path="/" render={() => <Redirect to="/landing" />} />
      <Route path="/landing" render={() => <Landing onGoToRegister={handleGoToRegister} onGoToLogin={handleGoToLogin} onMount={handleMountLanding} />} /> 
      <Route path="/login" render={() => <Login onSubmit={handleLogin} error={error} onGoToRegister={handleGoToRegister} onMount={handleMountLogin} />} />
      <Route path="/register" render={() => <Register onSubmit={handleRegister} error={error} onGoToLogin={handleGoToLogin} onMount={handleMountRegister} />} />
      <Route path='/main' render={() => isLoggedIn() ? <><Header user={user}  /><Main /></> : <Redirect to='/login' />} />

      {/* <Route path="/login" render={() => isLoggedIn() ? <Redirect to="/landing" /> : <Login onSubmit={handleLogin} error={error} onGoToRegister={handleGoToRegister} onMount={handleMountLogin} />} /> */}

      
      
      
      {/* <Route path="/main" render={()=> <Header onMount={handleMountHeader} />} />  */}
      {/* <Route path="/" render={() => <h1>Hello, All</h1>} />  */}
      {/* <Route path="/login" render={() => <h1>Hello, Login</h1>} />  */}
      {/* <Route path="/home/:id" render={props => <h1>{props.match.params.id}</h1>} /> */}
      {/* <Route path="/register" render={() => isLoggedIn() ? <Redirect to="/home" /> : <Register onSubmit={handleRegister} error={error} onGoToLogin={handleGoToLogin} onMount={handleMountRegister} />} />       */}
      {/* <Route path="/home" render={() => isLoggedIn() ? <Home /> : <Redirect to="/login" />} />  */}
    </Page>

  </div>
})


