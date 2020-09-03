import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import RestaurantForm from '../Restaurant/RestaurantForm'
// import messages from '../AutoDismissAlert/messages'

const RestaurantEdit = props => {
  const [restaurant, setRestaurant] = useState({ title: '', description: '', category: '' })
  const [updated, setUpdated] = useState(false)

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

  const handleChange = event => {
    event.persist()

    setRestaurant(restaurant => ({ ...restaurant, [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/restaurants/${props.match.params.id}`,
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${props.user.token}`
      },
      data: { restaurant }
    })
      .then(res => setUpdated(true))
      .catch(error => {
        props.msgAlert({
          heading: 'Failed to edit restaurant: ' + error.message,
          variant: 'danger'
        })
      })
  }

  if (updated) {
    props.msgAlert({
      heading: 'Restaurant Updated!',
      variant: 'success'
    })
    return <Redirect to={`/restaurants/${props.match.params.id}`} />
  }

  return (
    <div>
      <RestaurantForm
        restaurant={restaurant}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`/restaurants/${props.match.params.id}`}
      />
    </div>
  )
}

export default RestaurantEdit
