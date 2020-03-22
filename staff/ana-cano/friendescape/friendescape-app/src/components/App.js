import React, { useEffect, useContext, useState} from 'react'
import { Register, Login, Page, Landing, Home, Main} from '../components'
import { registerUser, retrieveUser, login, isLoggedIn,search, escapeList } from '../logic'
import { Context } from './ContextProvider'
import { Route, withRouter, Redirect } from 'react-router-dom'

export default withRouter(function ({ history }) {
  const [state, setState] = useContext(Context)
  const { page, error } = state
  const [ user, setUser] = useState([])
  const [ escapes , setEscapeList] = useState([])
  const [ query, setQuery] = useState([])
  

  useEffect(() => {
    if (isLoggedIn()) {
      (async() => {

        const user = await retrieveUser()
        setUser(user)       

      })()
    } else {
      history.push('/login')
    }
  }, [])


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

      const availableEscapes = await escapeList()
      setEscapeList(availableEscapes)
      
      history.push('/home')
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

  // async function handleSearch(){
  //   try{
    
  //     await search(query)
  //     setState({ page: `escaperooms/search/${query}`})
  //   } catch ({ message }) {
  //     setState({ error: message })
  //   }
  // }

  async function handleSearch(query){
    try {
      setEscapeList(await search(query))
      setState({ page: 'home' })
    } catch ({ message }) {
      setState({ error: message })
    }
  }

  async function handleJoinGroup(){
    try{

      setState({ page: 'landing'})
    } catch ({ message }) {
      setState({ error: message })
    }
  }

    function handleLocations() {
      history.push('/location')
      }

  //     setState({ page: 'locations'})
  //   } catch ({ message }) {
  //     setState({ error: message })
  //   }
  // }

  }

  // async function onGoToJoinGroups({
  //   setState({ page: 'landing' })
  // })


  return <div>

    <Page name={page}>
      <Route exact path="/" render={() => <Redirect to="/landing" />} />
      <Route path="/landing" render={() => <Landing onGoToRegister={handleGoToRegister} onGoToLogin={handleGoToLogin} onMount={handleMountLanding} />} /> 
      <Route path="/login" render={() => <Login onSubmit={handleLogin} error={error} onGoToRegister={handleGoToRegister} onMount={handleMountLogin} />} />
      <Route path="/register" render={() => <Register onSubmit={handleRegister} error={error} onGoToLogin={handleGoToLogin} onMount={handleMountRegister} />} />
      <Route path='/home' render={() => <><Home user={user} availableEscape = {escapes} onGoToSearch={handleSearch}  onGoToJoinGroup={handleJoinGroup} onGoToLocations={handleLocations}/></>} />
      <Route path='/location' render={() => <><Home user={user} availableEscape = {escapes} onGoToSearch={handleSearch}  onGoToJoinGroup={handleJoinGroup} onGoToLocations={handleLocations}/></>} />
{/* 
      onSubmit={handleSearch} */}
      
      
      {/* <Route path="/main" render={()=> <Header onMount={handleMountHeader} />} />  */}
      {/* <Route path="/" render={() => <h1>Hello, All</h1>} />  */}
      {/* <Route path="/login" render={() => <h1>Hello, Login</h1>} />  */}
      {/* <Route path="/home/:id" render={props => <h1>{props.match.params.id}</h1>} /> */}
      {/* <Route path="/register" render={() => isLoggedIn() ? <Redirect to="/home" /> : <Register onSubmit={handleRegister} error={error} onGoToLogin={handleGoToLogin} onMount={handleMountRegister} />} />       */}
      {/* <Route path="/home" render={() => isLoggedIn() ? <Home /> : <Redirect to="/login" />} />  */}
    </Page>

  </div>
})


