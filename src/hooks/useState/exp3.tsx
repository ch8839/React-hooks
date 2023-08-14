import React, { useState } from 'react'

const Exp3 = () => {
  const initFormData = () => {
    return {
      name: 'Niki de Saint Phalle',
      artwork: {
        title: 'Blue Nana',
        city: 'Hamburg',
        image: 'https://i.imgur.com/Sd1AgUOm.jpg',
      },
    }
  }
  const [formData, setFormData] = useState(initFormData)

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>)=> {
    setFormData({
      ...formData,
      name: e.target.value
    })
  }

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>)=> {
    setFormData({
      ...formData,
      artwork: {
        ...formData.artwork,
        title: e.target.value
      }
    })
  }

  const handleChangeCity = (e: React.ChangeEvent<HTMLInputElement>)=> {
    setFormData({
      ...formData,
      artwork: {
        ...formData.artwork,
        city: e.target.value
      }
    })
  }

  return (
    <div>
      <label>
        Name:
        <input value={formData.name} onChange={handleChangeName}></input>
      </label>
      <br />
      <label>
        title:
        <input value={formData.artwork.title} onChange={handleChangeTitle}></input>
      </label>
      <br />
      <label>
        city:
        <input value={formData.artwork.city} onChange={handleChangeCity}></input>
      </label>
      <br />
      <p>
        My name is {formData.name}, title: {formData.artwork.title}, city: {formData.artwork.city}
      </p>
    </div>
  )
}

export default Exp3
