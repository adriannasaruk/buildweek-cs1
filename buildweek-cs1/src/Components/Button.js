import React from "react"

class Button extends React.Component {
      render(){
      return(
        <div className="center">
          <button onClick={this.props.playButton}>
            Play
          </button>
          <button onClick={this.props.stopButton}>
            Stop
          </button>
          <button onClick={this.props.clear}>
            Clear
          </button>
          <button onClick={this.props.seed}>
            Seed
          </button>
          <button onClick={this.props.slow}>
            Slow
          </button>
          <button onClick={this.props.fast}>
            Fast
          </button>
          <button onClick={this.props.gridSize}>
            Small Grid
          </button>
          <button onClick={this.props.normalSize}>
            Normal Grid
          </button>     
        </div>
      )
    }
  }

  export default Button