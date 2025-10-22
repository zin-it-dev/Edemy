import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router';

const NotFound:React.FC = () => {
  const navigate = useNavigate();

  return (
    <section>
      <h1 className='text-primary fw-bold text-uppercase'>404 - Not Found</h1>
      <p>We could not find the page you were looking for.</p>
      <Button onClick={() => navigate('/')}>Go to Home</Button>
    </section>
  )
}

export default NotFound