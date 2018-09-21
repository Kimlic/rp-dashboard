import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'

import './index.scss'

import ImageUpload from './ImageUpload'

// Component

export default class UploadOutcropPictureModal extends Component {

  state = { 
    showModal: false 
  }
  
  // Handlers

  toggle = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }))
  }

  handleUploadSuccess = (res) => {
    console.log("RES:", res)
  }

  render() {
    const { showModal } = this.state

    const uploaderFields = [
      { field: 'caption', label: 'Caption:', required: true },
      { field: 'aaa', label: 'AAA:', required: true }
    ]

    return (
      <div>
        <button type="button" className="btn btn-primary btn-kimlic" onClick={this.toggle}>Upload</button>

        <Modal isOpen={showModal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Upload Image</ModalHeader>
          
          <ModalBody>
            <ImageUpload
              onUploadSuccess={this.handleUploadSuccess}
              uploadUrl={'http://www.aaa.bbb'}
              fields={uploaderFields} />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
