import React, { Component } from 'react'
import './App.css'
import { geoAlbersUsa, geoPath } from 'd3-geo'

class WorldMap extends Component {
  constructor(props){
    super(props)
    this.state = { size: [100, 100]}
  }

    onResize(self) {
        return function(){self.setState({size: [self.refs.svg.getBoundingClientRect().width,self.refs.svg.getBoundingClientRect().height]})}
    }

    componentDidMount () {
        window.addEventListener('resize', this.onResize(this), false)
        this.onResize(this)()
    }

  render() {
    const projection = geoAlbersUsa()
        .scale(Math.min(this.state.size[0],this.state.size[1]))
        .translate([this.state.size[0] / 2, this.state.size[1] / 2])
    const pathGenerator = geoPath().projection(projection)
    const countries = this.props.data
      .map((d,i) => <path
        key={"path" + i}
        d={pathGenerator(d)}
        onMouseEnter={() => {this.props.onHover(d)}}
        style={{fill: this.props.hoverElement === d.id ? "#FCBC34" : this.props.colorScale(d.launchday), stroke: "black", strokeOpacity: 0.5 }}
        className="countries"
      />)
    return <svg ref="svg" className="WorldMap">
      {countries}
    </svg>
  }
}

export default WorldMap
