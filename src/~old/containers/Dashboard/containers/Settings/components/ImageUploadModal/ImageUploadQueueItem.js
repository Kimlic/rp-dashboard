import React, { Component, Fragment } from 'react'
import propTypes from 'prop-types'
import { Container, Row, Col } from 'reactstrap'

import { removeFromPictureQueue } from 'src/actions/file'
import { updatePicture } from 'src/actions/file'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan } from '@fortawesome/free-solid-svg-icons'

import './index.scss'

// Component

export default class ImageUploadQueueItem extends Component {

  updateDetails(field, value) {
    updatePicture(this.props.item.guid, field, value)
  }

  prettyStatus(status) {
    switch (status) {
      case 'pending': return <span>Pending</span>
      case 'uploading': return <span className="text-muted">Uploading...</span>
      case 'success':
        return (
          <span className="text-success">
            <span className="glyphicon glyphicon-ok" /> Success
          </span>
        )
      case 'failed':
        return (
          <span className="text-danger">
            <span className="glyphicon glyphicon-remove" /> Failed
          </span>
        )
      default: return null;
    }
  }

  // Render

  renderField = item => field => (
    <div key={field.field} className="form-group colorize-3">
      <label className="control-label col-md-3" htmlFor={field.field}>{field.label}</label>

      <div className="col-md-9">
        <input
          id={field.field}
          type="text"
          value={item[field.field] || ''}
          onChange={e => this.updateDetails(field.field, e.target.value)}
          className="form-control"
          required={field.required} />
      </div>
    </div>
  )

  renderProgress = (item) => (
    <Fragment>
      <div className="text-center">{this.prettyStatus(item.status)}</div>

      <div className="progress" style={{ height: '20px' }}>
        <div
          className="progress-bar"
          role="progressbar"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={item.progress}
          style={{ width: `${item.progress}%` }}>
        </div>
      </div>
    </Fragment>
  )

  render() {
    const { item, fields } = this.props

    return (
      <Container>
        <Row>
          <Col xs={2}>
            <img src={item.file.preview} className="img-thumbnail" />
          </Col>

          <Col xs={4} className="image-upload-input colorize-1">
            <div className="form-row colorize-2">
              {fields.map(this.renderField(item))}
            </div>
          </Col>

          <Col xs={4}>
            {this.renderProgress(item)}
          </Col>

          <Col xs={2}>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => removeFromPictureQueue(item.guid)}
              disabled={['success', 'failed'].indexOf(item.status) > -1}>
              <FontAwesomeIcon icon={faBan} />
            </button>
          </Col>
        </Row>
      </Container>
    )
  }
}

ImageUploadQueueItem.propTypes = {
  item: propTypes.object,
  fields: propTypes.array
}

ImageUploadQueueItem.defaultProps = {
  fields: [
    { field: 'name', label: 'Name:', required: true },
    { field: 'description', label: 'Description:', required: true },
  ]
}
