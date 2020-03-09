import React, { useState } from 'react'
import './App.sass'
import Page from './Page'
import Register from './Register'
import Login from './Login'
import Home from './Home'
import { authenticateUser} from '../logic'

function App() {
  const [page, setPage] = useState('register')
  const [error, setError] = useState()
  const [name, setName] = useState()

  async function handleLogin(email, password) {
    try {
      const token = await authenticateUser(email, password)

      setName(name)
      setPage('home')
    // } catch ({ message }) {
    //   setError(message)
    // }
    } catch(error) {
      debugger
    }
  }

  return <div className="app">
    <Page name={page}>
      {page === 'login' && <Login onSubmit={handleLogin} error={error} />}
      {page === 'home' && <Home name={name} />}
    </Page>
  </div>
}

export default App
