import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => (
  <div>
    <Link to='/restaurants'>
      <button>Show your restaurants</button>
    </Link>
  </div>
)

export default Home
