import { useAtomValue } from 'jotai'
import { ReactElement } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


import { Switch } from './components/Switch'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { loginAtom } from './stores/login'

import './App.css'

const AppContainer = ({ children }: { children: ReactElement }) => {
  return (
    <div
      className="App"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100wh',
        height: '100vh',
      }}
    >
      {children}
    </div>
  )
}

function App() {
  const login = useAtomValue(loginAtom)
  const isLogin = login !== null

  return (
    <AppContainer>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <Switch fail="/login" isSucceed={isLogin}>
                <Home />
              </Switch>
            }
            path="/"
          />
          <Route
            element={
              <Switch fail="/" isSucceed={!isLogin}>
                <Login />
              </Switch>
            }
            path="/login"
          />
        </Routes>
      </BrowserRouter>
    </AppContainer>
  )
}

export default App
