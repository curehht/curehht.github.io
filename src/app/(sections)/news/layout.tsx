import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const NewsLayout: React.FC = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <Container>
      <Row>
        <Col md={6}>{children}</Col>
      </Row>
    </Container>
  )
}

export default NewsLayout
