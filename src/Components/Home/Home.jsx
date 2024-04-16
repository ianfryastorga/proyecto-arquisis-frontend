import '../../App.css'
import { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Landing from './Landing'


function Home() {
  const [count, setCount] = useState(0)
  return (
    <>
      <Navbar />
      <Landing />
    </>
  )
}

export default Home
