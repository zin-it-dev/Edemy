import React from 'react'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router'

const ErrorLayout:React.FC = () => {
  return <Container className='d-flex justify-content-center align-items-center vh-100'>
    <Outlet />
  </Container>
}

export default ErrorLayout