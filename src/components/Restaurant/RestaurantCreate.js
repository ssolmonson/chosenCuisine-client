import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import RestaurantForm from '../Restaurant/RestaurantForm'
import messages from '../AutoDismissAlert/messages'

// Utilizing the Restaurant Form, this will handle sending a POST request to create a Restaurant
const RestaurantCreate = props => {
  const [restaurant, setRestaurant] = useState({ title: '', description: '', category: 'Legs' })
  const [createdRestaurantId, setCreatedRestaurantId] = useState(null)

  const handleChange = event => {
    event.persist()

    setRestaurant(restaurant => ({ ...restaurant, [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()

    // console.log(event)
    axios({
      url: `${apiUrl}/restaurants`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${props.user.token}`
      },
      data: { restaurant }
    })
      .then(res => setCreatedRestaurantId(res.data.restaurant.id))
      .catch(error => {
        props.msgAlert({
          heading: 'Failed to create restaurant: ' + error.message,
          variant: 'danger'
        })
      })
  }

  if (createdRestaurantId) {
    props.msgAlert({
      heading: 'Restaurant Created!',
      message: messages.restaurantCreatedSuccess,
      variant: 'success'
    })
    return <Redirect to={
      { pathname: `restaurants/${createdRestaurantId}`, state: { msg: 'Restaurant created!' } }
    } />
  }

  return (
    <div>
      <h4>Create an Restaurant</h4>
      <RestaurantForm
        restaurant={restaurant}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath='/restaurants'
      />
    </div>
  )
}

export default RestaurantCreate
