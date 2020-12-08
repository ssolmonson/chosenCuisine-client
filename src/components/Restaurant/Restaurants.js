import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'

const Restaurants = (props, { match }) => {
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    axios({
      url: `${apiUrl}/restaurants`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${props.user.token}`
      }
    })
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
          <button>Enter a restaurant</button>
        </Link>
      </div>
    </div>
  )
}

export default Restaurants

// When listing restaurants, possibly look to switch to a details button on each restaurant
// that would reveal the address and foodtype. The name and city/state would always be displayed in this case
