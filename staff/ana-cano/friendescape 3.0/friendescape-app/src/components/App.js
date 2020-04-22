import React, { useEffect, useContext, useState } from 'react'
import { Register, Profile, Login, CreateGroup, Page, Landing, Home, Themes, SelectedDifficulty, SelectedThemes, Locations, ERDetail, Groups, UserGroups, UserGroup, Difficulty } from '../components'
import { registerUser, retrieveUser, login, logout, isLoggedIn, search, retrieveEasy, retrieveTheme, escapeList, retrieveER, joinGroups, deleteGroup, deactivateUser, leaveGroup, createGroup, groupsUser, retrieveGroups } from '../logic'
import { Context } from './ContextProvider'
import 'moment-timezone'
import { Route, withRouter, Redirect } from 'react-router-dom'
import '../sass/index.sass'

export default withRouter(function ({ history }) {
  const [state, setState] = useContext(Context)
  const { page, error } = state
  const [user, setUser] = useState([])
  const [escapes, setEscapeList] = useState([])
  const [detail, setDetail] = useState([])
  const [group, setGroupList] = useState([])
  const [difficulty, setDifficulty] = useState([])
  const [theme, setTheme] = useState([])

  useEffect(() => {
    if (isLoggedIn()) {
      (async () => {
        const user = await retrieveUser()
        setUser(user)
      })()
    } else {
      history.push('/login')
    }
  }, [])

  function __handleError__(error) {

    setState({ ...state, error: error.message })

    setTimeout(() => {
      setState({ error: undefined })
    }, 3000)
  }


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

  async function handleMountLanding() {
    const availableEscapes = await escapeList()
    setEscapeList(availableEscapes)

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
    } catch (error) {
      return __handleError__(error)
    }
  }

  function handleGoToRegister() {
    history.push('/register')
  }

  async function handleRegister(name, surname, email, telf, password) {

    try {
      await registerUser(name, surname, email, telf, password)
      history.push('/login')
    } catch (error) {
      return __handleError__(error)
    }
  }

  function handleMountRegister() {
    setState({ page: 'register' })
  }

  async function handleSearch(query) {
    try {
      setEscapeList(await search(query))
      setState({ page: 'home' })
    } catch (error) {
      return __handleError__(error)
    }
  }

  async function joinGroup() {
    try {
      const user = await retrieveUser()
      setUser(user)

      const availableGroups = await retrieveGroups()
      setGroupList(availableGroups)

      history.push('/groups')
    } catch (error) {
      return __handleError__(error)
    }
  }

  async function handleLocations() {
    try {

      const user = await retrieveUser()
      setUser(user)

      history.push('/locations')
    } catch (error) {
      return __handleError__(error)
    }
  }

  async function handleDifficulty() {
    try {
      const user = await retrieveUser()
      setUser(user)

      history.push('/difficulty')
    } catch (error) {
      return __handleError__(error)
    }
  }


  function handleTheme() {
    history.push('/themes')
  }



  async function handleDetail(id) {

    try {
      const escaperoom = await retrieveER(id)
      setDetail(escaperoom)
      const user = await retrieveUser()
      setUser(user)
      history.push(`/escaperoom/${id}`)
    } catch (error) {
      return __handleError__(error)
    }
  }
  //   }

  function handleLogOut() {
    logout()
    history.push('/landing')

  }

  async function handleGoHome() {
    try {
      const user = await retrieveUser()
      setUser(user)

      const availableEscapes = await escapeList()
      setEscapeList(availableEscapes)

      history.push('/home')
    } catch (error) {
      return __handleError__(error)
    }
  }

  async function handleEasy() {

    try {
      const user = await retrieveUser()
      setUser(user)
      const difficultyEscapes = await retrieveEasy("1")

      setDifficulty(difficultyEscapes)
      history.push('/difficulty/easy')
    } catch (error) {
      return __handleError__(error)
    }
  }

  async function handleMedium() {

    try {
      const user = await retrieveUser()
      setUser(user)
      const difficultyEscapes = await retrieveEasy("2")

      setDifficulty(difficultyEscapes)
      history.push('/difficulty/medium')
    } catch (error) {
      return __handleError__(error)
    }
  }

  async function handleHard() {

    try {
      const user = await retrieveUser()
      setUser(user)
      const difficultyEscapes = await retrieveEasy("3")

      setDifficulty(difficultyEscapes)
      history.push('/difficulty/hard')
    } catch (error) {
      return __handleError__(error)
    }
  }

  async function handleTheme() {
    try {

      const user = await retrieveUser()
      setUser(user)

      history.push('/themes')
    } catch (error) {
      return __handleError__(error)
    }
  }

  async function handleFiction() {
    try {
      const user = await retrieveUser()
      setUser(user)
      const themeEscapes = await retrieveTheme("fiction")
      setTheme(themeEscapes)
      history.push('/themes/fiction')
    } catch (error) {
      return __handleError__(error)
    }
  }

  async function handleHistorical() {
    try {
      const user = await retrieveUser()
      setUser(user)
      const themeEscapes = await retrieveTheme("historical")
      setTheme(themeEscapes)
      history.push('/themes/historical')
    } catch (error) {
      return __handleError__(error)
    }
  }

  async function handleCriminal() {
    try {
      const user = await retrieveUser()
      setUser(user)
      const themeEscapes = await retrieveTheme("criminal")
      setTheme(themeEscapes)
      history.push('/themes/criminal')
    } catch (error) {
      return __handleError__(error)
    }
  }
  async function handleFear() {
    try {
      const user = await retrieveUser()

      setUser(user)

      const themeEscapes = await retrieveTheme("fear")
      setTheme(themeEscapes)
      history.push('/themes/fear')
    } catch (error) {
      return __handleError__(error)
    }
  }

  async function handleJoinGroups(id) {
    try {
      await joinGroups(id)
      const message = "Joined successfully. Check your email to see the details, you have win one trusty point"
      setState({ ...state, error: message })
      setTimeout(() => {
        setState({ ...state, error: undefined })
      }, 3000)
      const availableGroups = await retrieveGroups()
      setGroupList(availableGroups)
      history.push('/groups')

    } catch (error) {
      return __handleError__(error)
    }
  }

  async function handleCreateAGroup() {
    try {
      const user = await retrieveUser()
      setUser(user)
      const availableEscapes = await escapeList()
      setEscapeList(availableEscapes)

      history.push('/create-group')
    } catch (error) {
      return __handleError__(error)
    }
  }


  async function handleNewGroup(roomId, date, time) {
    try {
      const state = 'active'
      await createGroup(roomId, date, time, state)
      const message = " You created a new group, please check your email, and good news you received a trusty point"
      setState({ ...state, error: message })

      setTimeout(() => {
        setState({ ...state, error: undefined })
      }, 3000)
      const availableGroups = await retrieveGroups()
      setGroupList(availableGroups)
      history.push('/groups')
    } catch (error) {
      console.error(error)
    }
  }

  async function handleProfile() {
    try {
      const user = await retrieveUser()
      setUser(user)
      
      history.push('/profile')
    } catch (error) {
      console.error(error)
    }
  }

  async function handleDeleteGroups(id) {
    try {
      await deleteGroup(id)
      if (user.foults > 2) {
        await deactivateUser(id)
        await logout()
        history.push('/landing')
      } else {
        const message = " You deleted a group, please check your email and you will receive a foult, with three your account will be deactivated"
        setState({ ...state, error: message })
        setTimeout(() => {
          setState({ ...state, error: undefined })
        }, 3000)
        const availableGroups = await retrieveGroups()
        setGroupList(availableGroups)
        history.push('/groups')
      }
    } catch (error) {
      console.error(error)
    }
  }

async function handleLeaveGroups(id) {
  try {
    await leaveGroup(id)
    if (user.foults > 2) {
      await deactivateUser(id)
      await logout()
      history.push('/landing')
    } else {
      const message = " You leave a group, please check your email and you will receive a foult, with three your account will be deactivated"
      setState({ ...state, error: message })
      setTimeout(() => {
        setState({ ...state, error: undefined })
      }, 3000)
      const availableGroups = await retrieveGroups()
      setGroupList(availableGroups)
      history.push('/groups')
    }
  } catch (error) {
    console.error(error)
  }
}

async function handleUserGroups() {
  try {
    const user = await retrieveUser()
    setUser(user)


    const availableGroups = await groupsUser()
    setGroupList(availableGroups)

    history.push('/profile-groups')
  } catch (error) {
    return __handleError__(error)
  }
}





return <div>

  <Page name={page}>
    <Route exact path="/" render={() => isLoggedIn() ? <Redirect to="/home" /> : <Redirect to="landing" />} />
    <Route path="/landing" render={() => isLoggedIn() ? <Redirect to="/home" /> : <Landing onGoToRegister={handleGoToRegister} onGoToLogin={handleGoToLogin} onMount={handleMountLanding} />} />
    <Route path="/login" render={() => isLoggedIn() ? <Redirect to="/home" /> : <Login onSubmit={handleLogin} error={error} onGoToRegister={handleGoToRegister} onMount={handleMountLogin} />} />
    <Route path="/register" render={() => isLoggedIn() ? <Redirect to="/home" /> : <Register onSubmit={handleRegister} error={error} onGoToLogin={handleGoToLogin} onMount={handleMountRegister} />} />
    <Route path='/home' render={() => isLoggedIn() ? <Home user={user} onCreateAGroup={handleCreateAGroup} onHandleLogOut={handleLogOut} availableEscape={escapes} onGoToSearch={handleSearch} onHandleProfile={handleProfile} onHandleLocations={handleLocations} onHandleDifficulty={handleDifficulty} onGoToDetail={handleDetail} onHandleTheme={handleTheme} onGoToJoinGroups={joinGroup} /> : <Redirect to="/home" />} />
    <Route path='/escaperoom/:id' render={props => isLoggedIn() ? <ERDetail onHandleProfile={handleProfile} user={user} onHandleGoHome={handleGoHome} escaperooom={detail} onHandleLogOut={handleLogOut} onHandleProfile={handleProfile} escaperoomId={props.match.params.id} onHandleItemClick={handleDetail} /> : <Redirect to="landing" />} />
    <Route path='/locations' render={() => isLoggedIn() ? <Locations onHandleProfile={handleProfile} user={user} onHandleGoHome={handleGoHome} onHandleLogOut={handleLogOut} /> : <Redirect to="landing" />} />
    <Route path='/themes' render={() => isLoggedIn() ? <Themes user={user} onHandleProfile={handleProfile} onHandleGoHome={handleGoHome} setTheme={theme} onHandleLogOut={handleLogOut} onHandleFiction={handleFiction} onHandleHistorical={handleHistorical} onHandleCriminal={handleCriminal} onHandleFear={handleFear} /> : <Redirect to="landing" />} />
    <Route path='/groups' render={() => isLoggedIn() ? <Groups user={user} onHandleProfile={handleProfile} availableGroups={group} onHandleLogOut={handleLogOut} onHandleGoHome={handleGoHome} handleJoinGroup={handleJoinGroups} handleLeaveGroup={handleLeaveGroups} handleDeleteGroup={handleDeleteGroups} error={error} /> : <Redirect to="landing" />} />
    <Route path='/difficulty' render={() => isLoggedIn() ? <Difficulty user={user} onHandleProfile={handleProfile} onHandleGoHome={handleGoHome} onHandleEasy={handleEasy} onHandleMedium={handleMedium} onHandleHard={handleHard} onHandleLogOut={handleLogOut}/> : <Redirect to="landing" />} />
    <Route path='/difficulty/easy' render={() => isLoggedIn() ? <SelectedDifficulty difficultyEscapes={difficulty} onHandleProfile={handleProfile} onHandleGoHome={handleGoHome} onHandleLogOut={handleLogOut} onGoToDetail={handleDetail} /> : <Redirect to="landing" />} />
    <Route path='/difficulty/medium' render={() => isLoggedIn() ? <SelectedDifficulty difficultyEscapes={difficulty} onHandleProfile={handleProfile} onHandleGoHome={handleGoHome} onHandleLogOut={handleLogOut} onGoToDetail={handleDetail} /> : <Redirect to="landing" />} />
    <Route path='/difficulty/hard' render={() => isLoggedIn() ? <SelectedDifficulty difficultyEscapes={difficulty} onHandleProfile={handleProfile} onHandleGoHome={handleGoHome} onHandleLogOut={handleLogOut} onGoToDetail={handleDetail} /> : <Redirect to="landing" />} />
    <Route path='/themes/fiction' render={() => isLoggedIn() ? <SelectedThemes themeEscapes={theme} onHandleGoHome={handleGoHome} onHandleLogOut={handleLogOut} onGoToDetail={handleDetail} onHandleFiction={handleFiction} /> : <Redirect to="landing" />} />
    <Route path='/themes/fear' render={() => isLoggedIn() ? <SelectedThemes themeEscapes={theme} onHandleGoHome={handleGoHome} onHandleLogOut={handleLogOut} onGoToDetail={handleDetail} onHandleFear={handleFear} /> : <Redirect to="landing" />} />
    <Route path='/themes/criminal' render={() => isLoggedIn() ? <SelectedThemes themeEscapes={theme} onHandleGoHome={handleGoHome} onHandleLogOut={handleLogOut} onGoToDetail={handleDetail} onHandleCriminal={handleCriminal} /> : <Redirect to="landing" />} />
    <Route path='/themes/historical' render={() => isLoggedIn() ? <SelectedThemes themeEscapes={theme} onHandleGoHome={handleGoHome} onHandleLogOut={handleLogOut} onGoToDetail={handleDetail} onHandleHistorical={handleHistorical} /> : <Redirect to="landing" />} />
    <Route path='/create-group' render={() => isLoggedIn() ? <CreateGroup user={user} availableEscapes={escapes} onHandleProfile={handleProfile} onHandleGoHome={handleGoHome} onHandleLogOut={handleLogOut} onHandleCreateANewGroup={handleNewGroup} /> : <Redirect to="landing" />} />
    <Route path='/profile' render={() => isLoggedIn() ? <Profile user={user} onHandleGoHome={handleGoHome} onHandleGoUserGroups={handleUserGroups} onGoToJoinGroups={joinGroup} onHandleProfile={handleProfile} onHandleLogOut={handleLogOut} onCreateAGroup={handleCreateAGroup} /> : <Redirect to="landing" />} />>}
    <Route path='/profile-groups' render={() => isLoggedIn() ? <UserGroups user={user} onHandleGoHome={handleGoHome} availableGroups={group} onHandleGoToUserGroups={handleUserGroups} onGoToJoinGroups={joinGroup} onHandleProfile={handleProfile} onHandleLogOut={handleLogOut} onCreateAGroup={handleCreateAGroup} /> : <Redirect to="landing" />} />>}
    </Page>

</div>
})
