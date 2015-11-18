Maze = React.createClass({
  hline(target, start, end, row, color) {
    for(var i = start; i <= end; i++) {
      target[i][row] = color;
    }
  },
  vline(target, start, end, col, color) {
    for(var i = start; i <= end; i++) {
      target[col][i] = color;
    }
  },
  plot(target, x, y, color) {
    target[x][y] = color;
  },

  getInitialState() {
    board = Array(40);
    for(var i = 0; i < 40; i++) {
      board[i] = Array(40).fill('blue');
    }
    for (var i = 0; i < 40; i+= 3) {
      this.hline(board, 0,39,i,'red');
      this.vline(board, 0,39,i,'red');
    }

    return {
      board: board,
      player: {x: 1, y:  3*Math.floor(Math.random()*13+1)-2}

    }
  },


  componentDidMount() {

      // componentDidMount is called by react when the component
      // has been rendered on the page. We can set the interval here:
      this.m = Array(170).fill(11);
      this.t = Array(170).fill(0);
      this.s = 1000;
      this.x = Math.floor((Math.random() * 13) + 1);
      this.y = Math.floor((Math.random() * 13) + 1);
      this.c = 169;


      this.timer = setInterval(this.buildMaze, 10);
      window.addEventListener('keydown', this.handleKeypress);
  },
  componentWillUnmount(){

    // This method is called immediately before the component is removed
    // from the page and destroyed. We can clear the interval here:

    clearInterval(this.timer);
    window.removeEventListener('keydown', this.handleKeypress);
},

handleKeypress(e) {
  tx = this.state.player.x;
  ty = this.state.player.y;
  switch (e.keyCode) {
    case 37:
      tx--;
      break;
    case 39:
      tx++;
      break;
    case 38:
      ty--;
      break;
    case 40:
      ty++;
      break;
    default:

  }

  if(tx >= 0 && ty >= 0 && tx <40 && ty < 40 && this.state.board[tx][ty] != 'red') {
    this.setState({player: {x: tx, y: ty}});
  }
},

buildMaze() {

    // This function is called every 50 ms. It updates the
    // elapsed counter. Calling setState causes the component to be re-rendered
    var t = this.state.board;
    if (this.c != 1) {
    var r = 0, d = 0, l = 0, u = 0;
    var k = this.x+13*(this.y-1);
    this.m[k] = - Math.abs(this.m[k]);
    this.c--;

    // Which ways can we move?
    if(this.x != 13) {
      r = (this.m[k+1] > 0 ? 1 : 0);
    }

    if(this.y != 13) {
      d = (this.m[k+13] > 0 ? 1 : 0);
    }

    if(this.x != 1) {
      l = (this.m[k-1] > 0 ? 1 : 0);
    }

    if(this.y != 1) {
      u = (this.m[k-13] > 0 ? 1 : 0);
    }

    var q = r+d+l+u;

    if(((q < 3 && (Math.random() * 10) < 2)) || q == 0) {
      do {
        this.x = Math.floor((Math.random() * 13) + 1);
        this.y = Math.floor((Math.random() * 13) + 1);
      } while (this.m[this.x+13*(this.y-1)] > 0);
      this.c++;

    } else {
      var done = false;
      while (!done) {
        var dr = Math.floor(Math.random() * 4);
        if(dr == 0 && r > 0) {
          this.m[k]=this.m[k]+1;
          this.x++;
          this.vline(t, 3*this.y-2, 3*this.y-1, 3*(this.x-1), 'blue');
          done = true;
        } else
        if(dr == 1 && d > 0) {
          this.m[k]=this.m[k]+10;
          this.y++;
          this.hline(t, 3*this.x-2, 3*this.x-1, 3*(this.y-1), 'blue');
          done = true;
        } else
        if(dr == 2 && l > 0) {
          this.m[k-1]=this.m[k-1]-1;
          this.x--;
          this.vline(t, 3*this.y-2, 3*this.y-1, 3*(this.x), 'blue');
          done = true;
        } else
        if(dr == 3 && u > 0) {
          this.m[k-13]=this.m[k-13]-10;
          this.y--;
          this.hline(t, 3*this.x-2, 3*this.x-1, 3*this.y, 'blue');
          done = true;
        }
      }
    }
  } else {
    console.log("Done");
    for(var i = 0; i < this.m.length; i++) {
      console.log(i + " = " + this.m[i]);
    }
    clearInterval(this.timer);
  }

  this.setState({board: t});
},


  genCell(x,y) {
    color = this.state.board[x][y];
    if(x == this.state.player.x && y == this.state.player.y) {
      color = 'green';
    }
    return (<rect key={x*40+y} x={x*10} y={y*10} width="10" height="10" style={{fill: color}} />);
  },

  genBoard () {
    result = [];
    for(var x = 0; x < 40; x++) {
      for (var y = 0; y < 40; y++) {
        result.push(this.genCell(x,y));
      }
    }
    return (result);
  },

  render() {
    return (

      <svg width="400" height="400">
        {this.genBoard()}
      </svg>

    );
  }
});
