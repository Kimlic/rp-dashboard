import React from 'react'

import './index.scss'

// Component

export default ({ id, imgSrc, selected, handleClick }) => {
  const className = "sidebar-btn sidebar-btn" + (selected ? "__selected" : "__normal")

  return (
    <button className={className} onClick={() => handleClick(id)}>
      <img src={imgSrc} className="img-responsive" alt={id} />
    </button>
  )
}