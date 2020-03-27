import React, { useEffect, useContext, useState} from 'react'
import { Register, Login, Page, Landing, Home, Themes, Locations, ERDetail, Groups} from '../components'
import { registerUser, retrieveUser, login, logout, isLoggedIn,search, escapeList, retrieveER, retrieveGroups} from '../logic'
import { Context } from './ContextProvider'
import { Route, withRouter, Redirect } from 'react-router-dom'

export default withRouter(function ({ history }) {
  const [state, setState] = useContext(Context)
  const { page, error } = state
  const [ user, setUser] = useState([])
  const [ escapes , setEscapeList] = useState([])
  const [ query, setQuery] = useState([])
  const [detail, setDetail] = useState([])
  const [group, setGroupList] = useState([])



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
      debugger
      history.push('/login')
    } catch ({ message }) {
      setState({ error: message })
    }
  }

  function handleMountRegister(){
    setState({ page: 'register'})
  }

  async function handleSearch(query){
    try {
      setEscapeList(await search(query))
      setState({ page: 'home' })
    } catch ({ message }) {
      setState({ error: message })
    }
  }

  async function joinGroup(){
    try{
    const availableGroups = await retrieveGroups()
    setGroupList(availableGroups)
    
    history.push('/groups')
  } catch ({ message }) {
    setState({ error: message })
  }
} 
    
  function handleLocations() {
      history.push('/locations')
      }
    function handleTheme() {
      history.push('/themes')
      }



    async function handleDetail(id){
     
        try {
          const escaperoom = await retrieveER(id)
          setDetail(escaperoom)
    
          history.push(`/escaperoom/${id}`)
        } catch ({ message }) {
          setState({ ...state, error: message })
        }
      }
    //   }

    function handleLogOut(){
      logout()
      history.push('/landing')

    }

  return <div>

    <Page name={page}>
      <Route exact path="/" render={() => isLoggedIn() ? <Redirect to ="/home" /> : <Redirect to ="landing" />} />
      <Route path="/landing" render={() =>  isLoggedIn() ? <Redirect to="/home" /> : <Landing onGoToRegister={handleGoToRegister} onGoToLogin={handleGoToLogin} onMount={handleMountLanding} />} /> 
      <Route path="/login" render={() => isLoggedIn()? <Redirect to="/home" /> : <Login onSubmit={handleLogin} error={error} onGoToRegister={handleGoToRegister} onMount={handleMountLogin} />} />
      <Route path="/register" render={() => isLoggedIn() ? <Redirect to="/home" /> : <Register onSubmit={handleRegister} error={error} onGoToLogin={handleGoToLogin} onMount={handleMountRegister} />} />
      <Route path='/home' render={() => isLoggedIn() ? <Home user={user} onHandleLogOut={handleLogOut} availableEscape = {escapes} onGoToSearch={handleSearch} onHandleLocations={handleLocations} onGoToDetail={handleDetail} onHandleItemClick={handleTheme} onGoToJoinGroups={joinGroup} /> : <Redirect to="/home" />} />
      <Route path='/escaperoom/:id' render={props => isLoggedIn() ? <ERDetail user={user} escaperooom={detail} onHandleLogOut={handleLogOut} escaperoomId={props.match.params.id} onHandleItemClick={handleDetail} /> : <Redirect to ="landing" />} />
      <Route path='/locations' render={() => isLoggedIn() ? <Locations/>: <Redirect to ="landing" />} />
      <Route path='/themes' render={() => isLoggedIn() ? <Themes/>: <Redirect to ="landing" />} />
      <Route path='/groups' render={() => isLoggedIn() ? <Groups availableGroups={group}/>: <Redirect to ="landing" />} />
     
    </Page>

  </div>
})