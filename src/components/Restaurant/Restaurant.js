import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'

const Restaurant = props => {
  const [restaurant, setRestaurant] = useState(null)
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    axios({
      url: `${apiUrl}/restaurants/${props.match.params.id}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${props.user.token}`
      }
    })
      .then(res => setRestaurant(res.data.restaurant))
      .catch(error => {
        props.msgAlert({
          heading: 'Failed to load restaurant: ' + error.message,
          variant: 'danger'
        })
      })
  }, [])

  const destroy = () => {
    axios({
      url: `${apiUrl}/restaurants/${props.match.params.id}`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${props.user.token}`
      }
    })
      .then(() => setDeleted(true))
      .catch(error => {
        props.msgAlert({
          heading: 'Failed to delete restaurant: ' + error.message,
          variant: 'danger'
        })
      })
  }

  if (!restaurant) {
    return <p>Loading...</p>
  }

  if (deleted) {
    props.msgAlert({
      heading: 'Restaurant Deleted',
      variant: 'danger'
    })
    return <Redirect to={
      { pathname: '/restaurants', state: { msg: 'Restaurant deleted successfully!' } }
    } />
  }

  return (
    <div>
      <h4>{restaurant.title}</h4>
      <p>Description: {restaurant.description}</p>
      <p>Category: {restaurant.category}</p>
      <button onClick={destroy}>Delete Restaurant</button>
      <Link to={`/restaurants/${props.match.params.id}/edit`}>
        <button>Edit</button>
      </Link>
      <Link to='/restaurants'>Back to all restaurants</Link>
    </div>
  )
}

export default Restaurant
