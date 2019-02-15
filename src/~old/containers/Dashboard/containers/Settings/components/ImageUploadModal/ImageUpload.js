
import React, { Component } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import { Container, Row, Col } from 'reactstrap'

import './index.scss'

import { clearQueue, addToPictureQueue, uploadPictureQueue } from 'src/actions/file'
import { guid } from 'src/utils/gen'

import ImageUploadQueueItem from './ImageUploadQueueItem'

// Constant

class ImageUpload extends Component {

  static propTypes = {
    uploadUrl: propTypes.string.isRequired,
    onUploadSuccess: propTypes.func.isRequired,
    limit: propTypes.number,
  }

  // Life

  componentDidMount() {
    clearQueue()
  }

  // Handlers

  addToQueue = (guid, uploadUrl) => (file) => addToPictureQueue({
    guid: guid,
    uploadUrl: uploadUrl,
    status: 'pending',
    progress: 0,
    error: null,
    errors: [],
    name: file.name,
    description: file.name,
    file
  })

  handleDrop = (files) => {
    const queue = this.addToQueue(guid(), this.props.uploadUrl)
    files.forEach(queue)
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { queue, onUploadSuccess } = this.props
    uploadPictureQueue(queue, onUploadSuccess)
  }

  // Private

  reachedMaxUploads = () => {
    const { queue, limit } = this.props
    const numPending = queue.filter(item => item.status === 'pending').length

    return (typeof limit == 'number' && numPending > limit)
  }

  canUpload = () => {
    const { queue } = this.props
    const numPending = queue.filter(item => item.status === 'pending').length

    if (this.reachedMaxUploads()) return false
    return numPending > 0
  }

  // Render

  renderDropzone = () => (
    <Dropzone accept="image/*" onDrop={this.handleDrop} className="drop-zone">
      <p>Drop image here or click to browse.</p>
    </Dropzone>
  )

  renderLimitWarning = () => (
    <p className="text-warning">The maximum number of uploads for this resource has been reached.</p>
  )

  renderQueueItem = (fields) => (item) => (
    <ImageUploadQueueItem key={item.guid} item={item} fields={fields} />
  )

  render() {
    const { queue, fields } = this.props;

    return (
      <Container fluid>
        <Row>
          <Col xs={12}>
            {this.renderDropzone()}
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <form onSubmit={e => this.handleSubmit(e)}>
              <Container>
                <Row>
                  <Col xs={2}>
                    Image:
                  </Col>

                  <Col xs={4}>
                    Details:
                  </Col>

                  <Col xs={4}>
                    Progress:
                  </Col>

                  <Col xs={2}>
                    Actions:
                  </Col>
                </Row>

                <Row>
                  {queue.map(this.renderQueueItem(fields))}
                </Row>
              </Container>

              <div className="text-center">
                <button type="submit" className="btn btn-primary btn-kimlic" disabled={!this.canUpload()}>Upload</button>

                {this.reachedMaxUploads() && maxLimitWarning}
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    )
  }
}

// Export

const mapStateToProps = (state) => ({
  queue: state.uploadReducer.file.pictureQueue
})

export default connect(mapStateToProps)(ImageUpload)
