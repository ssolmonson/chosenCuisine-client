import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfi'

const Restaurants = (props, { match }) => {
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    axios(`${apiUrl}/restaurants`)
      .then(res => setRestaurants(res.data.restaurants))
      .catch(error => {
        props.msgAlert({
          heading: 'Failed to load restaurants: ' + error.message,
          variant: 'danger'
        })
      })
  }, [])

  const restaurantsJsx = restaurants.map(restaurant => (
    <li key={restaurant.id}>
      <Link to={`/restaurants/${restaurant.id}`}>{restaurant.title}</Link>
    </li>
  ))

  return (
    <div>
      <div>
        <h4>Restaurants</h4>
        <ul>
          {restaurantsJsx}
        </ul>
      </div>
      <div>
        <Link to='/restaurants-create'>
          <button>Enter a Restaurant</button>
        </Link>
      </div>
    </div>
  )
}

export default Restaurants
