import React, { Component } from 'react'
import './App.css'
import WorldMap from './WorldMap'
import BarChart from './BarChart'
import StreamGraph from './StreamGraph'
import Brush from './Brush'
import StatLine from './StatLine'
import worlddata from './world'
import { range } from 'd3-array'
import { scaleThreshold } from 'd3-scale'
import { geoCentroid } from 'd3-geo'
import * as topojson from "topojson-client"

const appdata =  topojson.feature(worlddata, worlddata.objects.states).features

appdata.forEach((d,i) => {
    const offset = Math.random()
    d.launchday = i
    d.data = range(appdata.length).map((p,q) => q < i ? 0 : Math.random() * 2 + offset)
})

const colorScale = scaleThreshold().domain([5,10,20,30]).range(["#75739F", "#5EAFC6", "#41A368", "#93C464"])

class App extends Component {
  constructor(props){
    super(props)
    this.onHover = this.onHover.bind(this)
    this.onBrush = this.onBrush.bind(this)
    this.state = { hover: "none", brushExtent: [0,40] }
  }

  onHover(d) {
    this.setState({ hover: d.id })
  }

  onBrush(d) {
    this.setState({ brushExtent: d })
  }

  render() {
    const filteredAppdata = appdata
      .filter((d,i) => d.launchday >= this.state.brushExtent[0] && d.launchday <= this.state.brushExtent[1])
    return (
      <div className="App">
        <div className="App-header">
          <h2>React+d3 responsive dashboard</h2>
        </div>
        <StatLine allData={appdata} filteredData={filteredAppdata} />
        <WorldMap hoverElement={this.state.hover} onHover={this.onHover} colorScale={colorScale} data={filteredAppdata} />
        <Brush changeBrush={this.onBrush} />
        <div className="row">
            <StreamGraph hoverElement={this.state.hover} onHover={this.onHover} colorScale={colorScale} data={filteredAppdata} />
            <BarChart hoverElement={this.state.hover} onHover={this.onHover} colorScale={colorScale} data={filteredAppdata} />
        </div>
      </div>
    )
  }
}

export default App
