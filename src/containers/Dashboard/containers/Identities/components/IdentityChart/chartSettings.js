export const margin = {
  "top": 40,
  "right": 110,
  "bottom": 50,
  "left": 60
}

export const xScale = {
  "type": "point"
}

export const yScale = {
  "type": "linear",
  "stacked": true,
  "min": "auto",
  "max": "auto"
}

export const axisBottom = {
  "orient": "bottom",
  "tickSize": 5,
  "tickPadding": 5,
  "tickRotation": 0,
  "legend": "Timeline",
  "legendOffset": 36,
  "legendPosition": "center"
}

export const axisLeft = {
  "orient": "left",
  "tickSize": 5,
  "tickPadding": 5,
  "tickRotation": 0,
  "legend": "Num of Documents",
  "legendOffset": -40,
  "legendPosition": "center"
}

export const legends = [{
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

export const colors = () => [
  '#28a745',
  '#dc3545'
]

export const data = (data) => {
  const verified = {
    "id": "Verified",
    "color": "hsl(190, 70%, 50%)",
    "data": data.map(el => {
      return {"x": el.dateAt, "y": el.verified}
    })
  }

  const unverified = {
    "id": "Unverified",
    "color": "hsl(360, 70%, 50%)",
    "data": data.map(el => {
      return {"x": el.dateAt, "y": el.unverified}
    })
  }

  return [verified, unverified]
}