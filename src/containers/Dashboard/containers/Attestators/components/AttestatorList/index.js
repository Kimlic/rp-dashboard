import React, { Component } from 'react'
import { List, AutoSizer, WindowScroller } from "react-virtualized"
import cn from 'classnames'
import { compose } from 'react-apollo'

import './index.scss'
import styles from './index.scss'
// import 'react-virtualized/styles.css'

import attestatorsFetchContainer from 'src/graphql/attestatorsFetchContainer'

import AttestatorCell from '../AttestatorCell'

class AttestatorList extends Component {

  // Private

  setRef = windowScroller => {
    this._windowScroller = windowScroller
  }

  // Render

  renderRow = (attestators) => ({ index, isScrolling, isVisible, key, style }) => {
    const className = cn("identities--row", {
      ["rowScrolling"]: isScrolling,
      isVisible: isVisible,
    })
    const attestator = attestators[index]

    return (
      <div key={key} className={className} style={style}>
        <AttestatorCell attestator={attestator} />
      </div>
    )
  }

  render() {
    const { loading, attestators } = this.props.attestatorsData
    if (loading || !attestators) return null

    return (
      <div className="attestators">
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
                      rowCount={attestators.length}
                      rowRenderer={this.renderRow(attestators)}
                      scrollTop={scrollTop}
                      onScroll={onChildScroll}
                      scrollToIndex={-1}
                    />
                  </div>
                )}
              </AutoSizer>
            </div>
          )}
        </WindowScroller>
      </div>
    )
  }
}

export default compose(attestatorsFetchContainer)(AttestatorList)