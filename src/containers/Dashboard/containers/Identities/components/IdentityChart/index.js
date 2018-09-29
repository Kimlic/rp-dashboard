import React, { Component } from 'react'
import { ResponsiveLine } from '@nivo/line'
import { compose } from 'react-apollo'

import './index.scss'

import documentsCountContainer from 'src/graphql/documentsCountContainer'
import { margin, xScale, yScale, axisBottom, axisLeft, legends, colors, data } from './chartSettings'

class IdentityChart extends Component {

  render() {
    const { loading, countDocuments } = this.props.countDocumentsData
    if (loading) return null
    console.log("DOCS: ", countDocuments);
    


    return (
      <div className="chart">
        <h2>Validated Identities</h2>

        <ResponsiveLine
          data={data(countDocuments)}
          margin={margin}
          xScale={xScale}
          yScale={yScale}
          minY="auto"
          maxY="auto"
          stacked={true}
          curve="natural"
          axisBottom={axisBottom}
          axisLeft={axisLeft}
          colors={colors()}
          dotSize={15}
          dotColor="#fff"
          dotBorderWidth={1}
          dotBorderColor="#007de8"
          enableDotLabel={true}
          dotLabel="y"
          dotLabelYOffset={-12}
          enableArea={true}
          areaOpacity={0.1}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          legends={legends} />
      </div>
    )
  }
}

export default compose(documentsCountContainer)(IdentityChart)