import React from 'react'
import { Link } from 'react-router-dom'

// Defined values for 'Food Type' to allow for consistent sorting
// List will need manual updating for now
const categoryData = [
  { value: 'American', name: 'American' },
  { value: 'Asian', name: 'Asian' },
  { value: 'Cuban', name: 'Cuban' },
  { value: 'Mexican', name: 'Mexican' },
  { value: 'Bar', name: 'Bar' },
  { value: 'Pub', name: 'Pub' },
  { value: 'TextMex', name: 'TexMex' },
  { value: 'Cafe', name: 'Cafe' },
  { value: 'Fine Dining', name: 'Fine Dining' },
  { value: 'Italian', name: 'Italian' },
  { value: 'Greek', name: 'Greek' },
  { value: 'Indian', name: 'Indian' },
  { value: 'Middle Eastern', name: 'Middle Eastern' },
  { value: 'Pizzeria', name: 'Pizzeria' },
  { value: 'Bakery', name: 'Bakery' },
  { value: 'Barbecue', name: 'Barbeque' },
  { value: 'Cajun', name: 'Cajun' },
  { value: 'Diner', name: 'Diner' },
  { value: 'Gastropub', name: 'Gastropub' },
  { value: 'Sandwich', name: 'Sandwich' },
  { value: 'Fast-food', name: 'Fast-food' },
  { value: 'Oyster Bar', name: 'Oyster Bar' },
  { value: 'Brew Pub', name: 'Brew Pub' },
  { value: 'Bistro', name: 'Bistro' },
  { value: 'Steakhouse', name: 'Steakhouse' }
]

const RestaurantForm = ({ restaurant, handleChange, handleSubmit, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label>Restaurant</label>
    <input
      name='title'
      placeholder='Restaurant Name'
      value={restaurant.title}
      onChange={handleChange}
    />

    <label>Type of Food</label>
    <select
      name='foodtype'
      value={restaurant.foodtype}
      onChange={handleChange}
    >
      {categoryData.map((event, value) => {
        return <option key={value}>{event.name}</option>
      })}
    </select>

    <label>Address</label>
    <input
      name='address'
      placeholder='Address'
      value={restaurant.address}
      onChange={handleChange}
    />

    <label>City</label>
    <input
      name='city'
      placeholder='City'
      value={restaurant.city}
      onChange={handleChange}
    />

    <label>State</label>
    <input
      name='state'
      placeholder='State'
      value={restaurant.state}
      onChange={handleChange}
    />

    <label>Zip Code</label>
    <input
      name='zipcode'
      type='number'
      placeholder='Zip Code'
      value={restaurant.zipcode}
      onChange={handleChange}
    />

    <button type='submit'>Submit</button>
    <Link to={cancelPath}>
      <button>Cancel</button>
    </Link>

  </form>
)

export default RestaurantForm
