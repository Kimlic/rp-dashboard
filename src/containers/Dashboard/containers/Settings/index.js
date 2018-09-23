import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'

import './index.scss'

import { role, roleLabel } from 'src/constants/auth'

import CompanyDetails from './components/CompanyDetails'
import InviteMembers from './components/InviteMembers'

// Component

class Settings extends Component {

  state = {
    dropdownOpen: false
  }

  // Handlers

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }))
  }

  // Render

  render() {
    const members = [
      { email: "aaa@aaa.com", role: role.admin },
      { email: "bbb@bbb.com", role: role.member },
      { email: "ccc@ccc.com", role: role.member },
      { email: "ddd@ddd.com", role: role.member }
    ].map((el) => {
      return { ...el, role: roleLabel[el.role] }
    })
    const memberList = members.reduce((acc, el, idx) => {
      if (idx % 2 === 0) acc.push([members[idx], members[idx + 1]])
      return acc
    }, [])

    return (
      <div className="settings">
        <Container fluid className="p-0 m-0">
          <Row>
            <Col xs={12}>
              <CompanyDetails />
            </Col>
          </Row>

          <Row>
            <Col xs={9}>
              <InviteMembers members={memberList} />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Settings