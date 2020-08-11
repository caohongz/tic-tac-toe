<template>
  <div class="game">
    <div class="game-board">
      <Board
        :winnersquare="winnersquare"
        :current="current"
        :board="board"
        @handle-change="handleChange($event)"
      ></Board>
    </div>
    <div class="game-info">
      <p>{{ desc }}</p>
      <!-- <div v-html="times"></div> -->
      <div>
        <li v-for="(item, index) in history" :key="index">
          <button @click="jump(index)">
            move {{ index }} -- step {{ item.step }} --{{
              parseInt(item.step / 3) + 1
            }}行{{ (item.step % 3) + 1 }}列
          </button>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
import Board from "./Board";
import { winnerCal } from "../../utils/winnerCal";
export default {
  data() {
    return {
      history: [
        {
          squares: Array(9).fill(null),
          step: -1,
        },
      ],
      board: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      desc: "",
      xisNext: true,
      times: "",
    };
  },
  components: {
    Board,
  },
  computed: {
    current() {
      // console.log("test", this.history);
      return this.history[this.history.length - 1].squares;
    },
    winner() {
      console.log(winnerCal(this.current));
      return winnerCal(this.current);
    },
    step() {
      return this.history[this.history.length - 1].step;
    },
    historys() {
      return this.history[this.history.length - 1];
    },
    winnersquare() {
      let winnersquare = Array(9).fill("square");
      if (this.winner && this.winner[0]) {
        this.winner[0].forEach((item) => {
          winnersquare[item] = "winner-square";
        });
      }
      return winnersquare;
    },
  },
  watch: {
    history: {
      deep: true,
      immediate: true,
      // eslint-disable-next-line
      handler(newValue, oldValue) {
        if (this.winner) {
          this.desc = "winner is " + this.winner[1];
        } else if (!this.winner && this.history.length === 10) {
          this.desc = "平局";
        } else {
          this.desc = "Next is " + (this.xisNext ? "X" : "O");
        }
      },
    },
  },
  methods: {
    handleChange(square) {
      if (this.current[square] || this.winner) {
        return;
      }
      // console.log("this", this.winner);
      let history = Object.assign({}, this.historys);
      history.squares = this.current.slice();
      history.squares[square] = this.xisNext ? "X" : "O";
      history.step = square;

      this.history.push(history);
      console.log("test", history);

      // this.$set(this.squares, square, this.xisNext ? "X" : "O");
      this.xisNext = !this.xisNext;
    },
    jump(step) {
      this.history = this.history.slice(0, step + 1);
    },
  },
};
</script>

<style>
body {
  font: 14px "Century Gothic", Futura, sans-serif;
  margin: 20px;
}

ol,
ul {
  padding-left: 30px;
}

.board-row:after {
  clear: both;
  content: "";
  display: table;
}

.status {
  margin-bottom: 10px;
}

.square {
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;
}

.square:focus {
  outline: none;
}

.kbd-navigation .square:focus {
  background: #ddd;
}

.game {
  display: flex;
  flex-direction: row;
}

.game-info {
  margin-left: 20px;
}

.overstriking {
  font-weight: bold;
}

.winner-square {
  background: red;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;
}
</style>
