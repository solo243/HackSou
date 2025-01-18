import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Home'
import CountdownTimer from './CTC'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Home />
      {/* <CountdownTimer /> */}
    </>
  )
}

export default App
