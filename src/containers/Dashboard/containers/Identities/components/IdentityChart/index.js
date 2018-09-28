import React, { Component } from 'react'
import { ResponsiveLine } from '@nivo/line'

import './index.scss'

import { data } from './data'

class IdentityChart extends Component {

  margin = {
    "top": 40,
    "right": 110,
    "bottom": 50,
    "left": 60
  }

  xScale = {
    "type": "point"
  }

  yScale = {
    "type": "linear",
    "stacked": true,
    "min": "auto",
    "max": "auto"
  }

  axisBottom = {
    "orient": "bottom",
    "tickSize": 5,
    "tickPadding": 5,
    "tickRotation": 0,
    "legend": "dates",
    "legendOffset": 36,
    "legendPosition": "center"
  }

  axisLeft = {
    "orient": "left",
    "tickSize": 5,
    "tickPadding": 5,
    "tickRotation": 0,
    "legend": "verified documents",
    "legendOffset": -40,
    "legendPosition": "center"
  }

  legends = [{
    "anchor": "bottom-right",
    "direction": "column",
    "justify": false,
    "translateX": 100,
    "translateY": 0,
    "itemsSpacing": 0,
    "itemDirection": "left-to-right",
    "itemWidth": 80,
    "itemHeight": 20,
    "itemOpacity": 0.75,
    "symbolSize": 12,
    "symbolShape": "circle",
    "symbolBorderColor": "rgba(0, 0, 0, .5)",
    "effects": [
      {
        "on": "hover",
        "style": {
          "itemBackground": "rgba(0, 0, 0, .03)",
          "itemOpacity": 1
        }
      }
    ]
  }]

  // Render

  render() {
    return (
      <div className="chart">
        <h2>Validated Identities</h2>

        <ResponsiveLine
          data={data}
          margin={this.margin}
          xScale={this.xScale}
          yScale={this.yScale}
          minY="auto"
          maxY="auto"
          stacked={true}
          curve="natural"
          axisBottom={this.axisBottom}
          axisLeft={this.axisLeft}
          colors="blues"
          dotSize={8}
          dotColor="inherit:darker(1)"
          dotBorderWidth={1}
          dotBorderColor="#005CB9"
          enableDotLabel={true}
          dotLabel="y"
          dotLabelYOffset={-12}
          enableArea={false}
          areaOpacity={0.35}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          legends={this.legends}
        />
      </div>
    )
  }
}

export default IdentityChart