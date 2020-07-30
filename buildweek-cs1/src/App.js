import React from 'react';
import Grid from "./Components/Grid";
import Button from "./Components/Button";
import './App.css';


class App extends React.Component {
  constructor() {
    super();
    this.speed = 100;
    this.rows = 35;
    this.cols = 55;

    this.state = {
      generation: 0,
      gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
    }
  }

  selectBox = (row, col) => {
    let gridCopy = array(this.state.gridFull);
    gridCopy[row][col] = !gridCopy[row][col];
    this.setState ({
      gridFull: gridCopy
    })
  }

  seed = () => {
    let gridCopy = array(this.state.gridFull);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if(Math.floor(Math.random() * 4) === 1) {
          gridCopy[i][j] = true;
        }
      }
    }
    this.setState({
      gridFull: gridCopy
    })
  }

  playButton = () => {
    clearInterval(this.intervalId)
    this.intervalId = setInterval(this.play, this.speed)
  }

  stopButton =() => {
    clearInterval(this.intervalId)
  }

  slow = () => {
    this.speed = 800;
    this.playButton();
  }

  fast = () => {
    this.speed = 100;
    this.playButton();
  }

  clear =()=> {
    var grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
    this.setState({
      gridFull: grid,
      generation: 0
    })
  }

  gridSize = () => {
    this.cols = 25;
    this.rows = 25;
    this.clear()
  }

  normalSize = () => {
    this.cols = 55;
    this.rows = 35;
    this.clear()
  }

  play =() => {
    let g = this.state.gridFull;
    let g2 = array(this.state.gridFull);

    for(let i =0; i< this.rows; i++) {
      for(let j = 0; j< this.cols; j++) {
        let count = 0;
        if (i>0) if(g[i - 1][j]) count++;
        if (i>0 && j>0) if (g[i-1][j -1]) count++;
        if (i> 0 && j < this.cols -1) if (g[i-1][j+1]) count ++;
        if(j<this.cols -1) if(g[i][j +1]) count ++;
        if (j>0) if(g[i] [j-1]) count++;
        if (i< this.rows -1) if (g[i+1][j])count++;
        if (i< this.rows -1 && j>0) if (g[i +1] [j-1])count++;
        if (i < this.rows -1 && this.cols -1) if (g[i +1][j+1]) count++;
        if (g[i][j] && (count <2 || count >3)) g2[i][j] = false;
        if (!g[i] [j] && count ===3) g2[i][j] = true;
      }
    }
    this.setState({
      gridFull: g2,
      generation: this.state.generation +1
    })
  }

  componentDidMount() {
    this.seed();
    this.playButton();
  }

  render () {
    return (
    <div>
      <h1>The Game of Life</h1>
      <div className = "text">
        <h2>Rules:</h2> 

        The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, live or dead, (or populated and unpopulated, respectively). Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:

        <p>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</p>
        <p>Any live cell with two or three live neighbours lives on to the next generation.</p>
        <p>Any live cell with more than three live neighbours dies, as if by overpopulation.</p>
        <p>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
        These rules, which compare the behavior of the automaton to real life, can be condensed into the following:
        </p>
        <p>
        Any live cell with two or three live neighbours survives.
        Any dead cell with three live neighbours becomes a live cell.
        All other live cells die in the next generation. Similarly, all other dead cells stay dead.
        </p>
      </div>
      <Button
      playButton = {this.playButton}
      stopButton = {this.stopButton}
      clear = {this.clear}
      seed = {this.seed}
      slow = {this.slow}
      fast = {this.fast}
      gridSize = {this.gridSize}
      normalSize = {this.normalSize}
      />
      <Grid
      gridFull = {this.state.gridFull}
      rows = {this.rows}
      cols = {this.cols}
      selectBox = {this.selectBox}/>
      <h2>Generations: {this.state.generation}</h2>
    </div>
    )
  };
} 

function array(arr) {
  return JSON.parse(JSON.stringify(arr))
}

export default App
