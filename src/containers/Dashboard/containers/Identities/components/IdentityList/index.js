import React, { Component } from 'react'
import { List, AutoSizer, WindowScroller } from "react-virtualized"
import cn from 'classnames'
import { compose } from 'react-apollo'

import './index.scss'
import styles from './index.scss'
import 'react-virtualized/styles.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import documentsFetchContainer from 'src/graphql/documentsFetchContainer'

import IdentityCell from '../IdentityCell'
import IdentityDetails from '../IdentityDetails'

// Component

class IdentityList extends Component {

  state = {
    modal: false,
    document: null
  }

  // Handlers

  handleCellClick = (document) => (e) => {
    e.stopPropagation()

    this.setState({ document })
    this.toggle()
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal })
  }

  // Private

  setRef = windowScroller => {
    this._windowScroller = windowScroller
  }

  // Render

  renderRow = (documents) => ({ index, isScrolling, isVisible, key, style }) => {
    const className = cn("identities--row", {
      ["rowScrolling"]: isScrolling,
      isVisible: isVisible,
    })
    const document = documents[index]

    return (
      <span onClick={this.handleCellClick(document)}>
        <div key={key} className={className} style={style}>
          <IdentityCell document={document} />
        </div>
      </span>
    )
  }

  renderNoRows = () => {
    return <div>No documents are available.</div>
  }

  render() {
    const { loading, documents } = this.props.documentsData
    if (loading || !documents) return null

    return (
      <div className="identities">
        <WindowScroller ref={this.setRef} scrollElement={window}>
          {({ height, isScrolling, registerChild, onChildScroll, scrollTop }) => (
            <div className={styles.WindowScrollerWrapper}>
              <AutoSizer disableHeight>
                {({ width }) => (
                  <div ref={registerChild}>
                    <List
                      className={styles.List}
                      ref={el => {
                        window.listEl = el;
                      }}
                      autoHeight
                      width={width}
                      height={height}
                      rowHeight={100}
                      isScrolling={isScrolling}
                      overscanRowCount={3}
                      rowCount={documents.length}
                      noRowsRenderer={this.renderNoRows}
                      rowRenderer={this.renderRow(documents)}
                      scrollTop={scrollTop}
                      onScroll={onChildScroll}
                      scrollToIndex={-1} />
                  </div>
                )}
              </AutoSizer>
            </div>
          )}
        </WindowScroller>

        <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Document Details</ModalHeader>
          <ModalBody>
            <IdentityDetails/>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default compose(documentsFetchContainer)(IdentityList)