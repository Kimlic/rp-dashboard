import React, { Component } from 'react'
import { List, AutoSizer, WindowScroller } from "react-virtualized"
import cn from 'classnames'
import { compose } from 'react-apollo'

import './index.scss'
import styles from './index.scss'
import 'react-virtualized/styles.css'

import documentsFetchContainer from 'src/graphql/documentsFetchContainer'

import IdentityCell from '../IdentityCell'

class IdentityList extends Component {

  state = {
    loadedRowCount: 0,
    loadingRowCount: 0,
    loadedRowsMap: {},
    timeoutIdMap: {}
  }

  // Private

  isRowLoaded = ({ index }) => !!this.state.loadedRowsMap[index]

  setRef = windowScroller => {
    this._windowScroller = windowScroller
  }

  // Render

  renderRow = (documents) => ({ index, isScrolling, isVisible, key, style }) => {
    const className = cn("row", {
      ["rowScrolling"]: isScrolling,
      isVisible: isVisible,
    })
    const document = documents[index]
    const { firstName, lastName, type } = document

    return (
      <div key={key} className={className} style={style}>
        <div className="content">
          <div>{firstName}</div>
          <div>{lastName}</div>
          <div>{type}</div>
        </div>
      </div>
    )
  }

  render() {
    const { loading, documents } = this.props.documentsData
    if (loading) return null

    return (
      <div className="identities">
        <WindowScroller ref={this.setRef} scrollElement={window}>
          {({ height, isScrolling, registerChild, onChildScroll, scrollTop }) => (
            <div className={styles.WindowScrollerWrapper}>
              <AutoSizer disableHeight>
                {({ width }) => (
                  <List
                    className={styles.List}
                    ref={registerChild}
                    autoHeight
                    width={width}
                    height={height}
                    rowHeight={100}
                    isScrolling={isScrolling}
                    overscanRowCount={3}
                    rowCount={documents.length}
                    rowRenderer={this.renderRow(documents)}
                    scrollTop={scrollTop}
                    onScroll={onChildScroll}
                  />
                )}
              </AutoSizer>
            </div>
          )}
        </WindowScroller>
      </div>
    )
  }
}

export default compose(documentsFetchContainer)(IdentityList)