import React from 'react';
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Welcome from './pages/introPage'
import SentimentPage from './pages/SentimentPage' 

function App() {
  const [username, setUsername] = useState('')

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Welcome setUsername={setUsername} />} />
        <Route path='/sentiment' element={<SentimentPage username={username} />} />
      </Routes>
    </Router>
  )
}

export default App
