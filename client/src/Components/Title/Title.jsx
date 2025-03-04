import React from 'react'
import './Title.css'

const Title = ({subtitle}) => {
  return (
    <div className='title'>
      <h2>{subtitle}</h2> 
    </div>
  )
}

export default Title