import React, { Component } from 'react'
import { List, AutoSizer, WindowScroller, InfiniteLoader } from "react-virtualized"
import cn from 'classnames'
import loremIpsum from 'lorem-ipsum'

import './index.scss'
import styles from './index.scss'
import 'react-virtualized/styles.css'

import AttestatorCell from '../AttestatorCell'

const STATUS_LOADING = 1
const STATUS_LOADED = 2

class AttestatorList extends Component {

  state = {
    loadedRowCount: 0,
    loadingRowCount: 0,
    loadedRowsMap: {},
    timeoutIdMap: {},
    list: []
  }

  componentDidMount() {
    this.setState({ list: this.genItems(100) })
  }

  // Private

  genItems = (amount) => {
    return Array(amount).fill().map((val, idx) => {
      return {
        id: idx,
        name: loremIpsum({
          count: 1,
          units: 'words'
        }),
        image: 'http://via.placeholder.com/40',
        text: loremIpsum({
          count: 1,
          units: 'sentences',
          sentenceLowerBound: 4,
          sentenceUpperBound: 8
        })
      }
    })
  }

  isRowLoaded = ({ index }) => !!this.state.loadedRowsMap[index]

  loadMoreRows = ({ startIndex, stopIndex }) => {
    const { loadedRowsMap, loadingRowCount } = this.state
    const increment = stopIndex - startIndex + 1

    for (var i = startIndex; i <= stopIndex; i++) {
      loadedRowsMap[i] = STATUS_LOADING
    }

    this.setState({
      loadingRowCount: loadingRowCount + increment,
    })

    const timeoutId = setTimeout(() => {
      const { loadedRowCount, loadingRowCount } = this.state

      delete this.state.timeoutIdMap[timeoutId]

      for (var i = startIndex; i <= stopIndex; i++) {
        loadedRowsMap[i] = STATUS_LOADED
      }

      const list = this.genItems(loadedRowCount + increment)

      this.setState({
        list,
        loadingRowCount: loadingRowCount - increment,
        loadedRowCount: loadedRowCount + increment,
      })

      promiseResolver()
      // }, 0)
    }, 1000 + Math.round(Math.random() * 2000))

    this.state.timeoutIdMap[timeoutId] = true

    let promiseResolver

    return new Promise(resolve => {
      promiseResolver = resolve
    })
  }

  _setRef = windowScroller => {
    this._windowScroller = windowScroller
  }

  // Render

  renderRow = ({ index, isScrolling, isVisible, key, style }) => {
    const className = cn("row", {
      ["rowScrolling"]: isScrolling,
      isVisible: isVisible,
    })

    const { loadedRowsMap } = this.state

    if (loadedRowsMap[index] !== STATUS_LOADED) {
      return (
        <div key={key} className={className} style={style}>
          Loading attestator...
        </div>
      )
    }

    return (
      <div key={key} className={className} style={style}>
        <div className="image">
          <img src={this.state.list[index].image} alt="" />
        </div>
        
        <div className="content">
          <div>{this.state.list[index].name}</div>
          <div>{this.state.list[index].text}</div>
        </div>
      </div>
    )
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
                      rowRenderer={this.renderRow(documents)}
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

  render() {
    const { list } = this.state

    return (
      <div className="attestators">
        <InfiniteLoader isRowLoaded={this.isRowLoaded} loadMoreRows={this.loadMoreRows} rowCount={1000} threshold={50}>
          {({ onRowsRendered, registerChild }) => (
            <WindowScroller ref={this._setRef} scrollElement={window}>
              {({ height: scrollerHeight, isScrolling, onChildScroll, scrollTop }) => (
                <div className={styles.WindowScrollerWrapper}>
                  <AutoSizer disableHeight>
                    {({ width }) => (
                      <List
                        className={styles.List}
                        ref={registerChild}
                        autoHeight
                        width={width}
                        height={scrollerHeight}
                        rowHeight={100}
                        isScrolling={isScrolling}
                        overscanRowCount={3}
                        rowCount={list.length}
                        rowRenderer={this.renderRow}
                        onRowsRendered={onRowsRendered}
                        scrollTop={scrollTop}
                        onScroll={onChildScroll}
                      />
                    )}
                  </AutoSizer>
                </div>
              )}
            </WindowScroller>
          )}
        </InfiniteLoader>
      </div>
    )
  }
}

export default AttestatorList