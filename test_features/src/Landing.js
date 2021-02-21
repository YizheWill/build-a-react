import React from 'react'
import { withRouter } from 'react-router-dom'

function Landing({ location: { state: { val } } }) {
  return (
    <div>
      {val}
    </div>
  )
}

export default withRouter(Landing)
