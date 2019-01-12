<template>
  <div style="display: flex; justify-content: space-between; align-items: center;">
    <div class="h-title">
      <h2 style="font-size: 3rem;">Chinese Chess</h2>
      <h3>robot based on MAX-MIN SEARCH and ALPHA-BETA search</h3>
      <h3>without chess manual.</h3>
    </div>
      <div style=" margin-left: 5rem; height: 100vh;">
        <h2 :style="`color: ${takeTurns === 'BLACK' ? 'black' : 'red'}; margin: 0;`" v-if="winner === 'null'">{{ takeTurns }} Turn</h2>
        <h2 :style="`color: ${winner === 'BLACK' ? 'black' : 'red'}; margin: 0;`" v-if="winner !== 'null'">{{ winner }} Win!</h2>
        <el-card class="home">
          <PieceComponent v-for="piece of pieceInView" :key="piece.coord.y * 9 + piece.coord.x"
          :x="piece.coord.x" :y="piece.coord.y" :types="piece.piece.types"
          :isDead="piece.piece.isDead" :group="piece.piece.group"
          @select="pieceOnSelect"></PieceComponent>
          <img src="../assets/img/RED/r_box.png" :style="`position: absolute; \
          top: ${selectedY * 55 + 20}px; left: ${selectedX * 55 + 20}px;`" v-if="selectedX !== -1">
          <div class="map" @click="pieceOnMove"></div>
          <img src="../assets/img/BLACK/b_box.png" :style="`position: absolute; \
          top: ${botY * 55 + 20}px; left: ${botX * 55 + 20}px;`" v-if="botX !== -1">
        </el-card>
        <el-button @click="changeMode">CHANGE MODE</el-button>
        <el-button @click="newGame">NEW GAME</el-button>
        <h2>{{ mode }}</h2>
      </div>
      <el-card class="log" style="margin-left: 3rem; height: 99vh; box-size: border-box; overflow: auto;">
        <p style="opacity: 0;">opponent move eeelephant from {10, 10} to {10, 10}</p>
        <h2>LOG</h2>
        <h3 v-for="(log, idx) in log" :key="idx" :class="`log-${idx%2}`">{{ log }}</h3>
      </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Piece, Coord, MAX_WIDTH, MAX_HEIGHT } from '@/store/modules/situation/typings';
import { ADD, MOVE, MAP, CLEAR } from '@/store/modules/situation';
import PieceComponent from '../components/Piece.vue';
import { isPrimitive } from 'vue-class-component/lib/util';
import { isValidMove } from '../utils/move';
import { initialMax, initialMin } from '../utils/InitialMap';
import { evaluate, Node, isWin } from '../utils/evaluate';

interface IPeiceInView {
  piece: Piece;
  coord: Coord;
}

@Component({
  name: 'Home',
  components: {
    PieceComponent
  }
})
export default class Home extends Vue {
  pieceInView: IPeiceInView[] = [];

  winner = 'null';

  takeTurns: 'RED' | 'BLACK' = 'BLACK';
  selectedPos: Coord = {  x: -1, y: -1 };
  canMove: boolean = true;

  step = 0;

  log: string[] = [];

  mode: 'A-B' | 'MAX-MIN' = 'MAX-MIN';

  botX: number = -1;
  botY: number = -1;

  get selectedX() {
    return this.selectedPos.x === -1 ? -1 : this.selectedPos.x;
  }

  get selectedY() {
    return this.selectedPos.y === -1 ? 5 : this.selectedPos.y;
  }

  changeMode() {
    this.mode = (this.mode === 'A-B') ? 'MAX-MIN' : 'A-B';
  }

  newGame() {
    this.takeTurns = 'BLACK';
    this.canMove = true;
    this.step = 0;
    this.log = [];
    this.winner = 'null';
    this.mode = 'MAX-MIN';
    this.botX = -1;
    this.botY = -1;
    this.selectedPos = { x: -1, y: -1 };
    this.pieceInView = [];
    this.pieceInView.push(...initialMax());
    this.pieceInView.push(...initialMin());
    this.$store.commit(`situation/${CLEAR}`);
    this.pieceInView.forEach((val: IPeiceInView) => {
      this.$store.commit(`situation/${ADD}`, { pos: val.coord, piece: val.piece });
    });
  }

  pieceOnSelect(x: number, y: number) {
    if (!this.canMove) {
      return;
    }
    if (this.selectedPos.x === -1 && this.selectedPos.y === -1) {
      this.selectedPos.x = x;
      this.selectedPos.y = y;
    } else {
      const newX = x;
      const newY = y;
      const map = this.$store.getters[`situation/${MAP}`];
      if (!isValidMove(map, map[this.selectedPos.x][this.selectedPos.y],
      { x: this.selectedPos.x, y: this.selectedPos.y }, { x: newX, y: newY }, this.takeTurns)) {
        this.selectedPos.x = -1;
        this.selectedPos.y = -1;
        return;
      }
      this.log.push(`you move ${map[this.selectedPos.x][this.selectedPos.y].types} from \
      {${this.selectedPos.x}, ${this.selectedPos.y}} to {${newX}, ${newY}}`);
      const div = document.querySelector('.log');
      if (div) {
        div.scrollTop = div.scrollHeight;
      }
      this.$store.commit(`situation/${MOVE}`, { from: this.selectedPos, to: { x: newX, y: newY } });
      this.update();
      this.selectedPos.x = -1;
      this.selectedPos.y = -1;
      setTimeout(() => this.botMove(), 50);
    }
  }

  pieceOnMove(event: MouseEvent) {
    if (!this.canMove) {
      return;
    }
    if (this.selectedPos.x !== -1 && this.selectedPos.y !== -1) {
      const newX = Math.round((event.offsetX - 15) / 55);
      const newY = Math.round((event.offsetY - 15) / 55);
      const map = this.$store.getters[`situation/${MAP}`];
      if (!isValidMove(map, map[this.selectedPos.x][this.selectedPos.y],
      { x: this.selectedPos.x, y: this.selectedPos.y }, { x: newX, y: newY }, this.takeTurns)) {
        this.selectedPos.x = -1;
        this.selectedPos.y = -1;
        return;
      }
      this.log.push(`you move ${map[this.selectedPos.x][this.selectedPos.y].types} \
      from {${this.selectedPos.x}, ${this.selectedPos.y}} to {${newX}, ${newY}}`);
      const div = document.querySelector('.log');
      if (div) {
        div.scrollTop = div.scrollHeight;
      }
      this.$store.commit(`situation/${MOVE}`, { from: this.selectedPos, to: { x: newX, y: newY } });
      this.update();
      this.selectedPos.x = -1;
      this.selectedPos.y = -1;
      setTimeout(() => this.botMove(), 50);
    }
  }

  botMove() {
    if (!this.canMove) {
      return;
    }
    let method: 'A-B' | 'MAX-MIN' = 'MAX-MIN';
    if (this.mode === 'A-B') {
      method = this.step > 5 ? 'A-B' : 'MAX-MIN';
    } else {
      method = 'MAX-MIN';
    }
    const curNode = new Node(this.$store.getters[`situation/${MAP}`], 'RED', 1, [], -9999999, 9999999, method);
    curNode.findChildren();
    const { from, to } = curNode.findNext();
    this.botX = from.x;
    this.botY = from.y;
    setTimeout(() => {
      this.log.push(`opponent move ${this.$store.getters[`situation/${MAP}`][from.x][from.y].types} \
      from {${from.x}, ${from.y}} to {${to.x}, ${to.y}}`);
      const div = document.querySelector('.log');
      if (div) {
        div.scrollTop = div.scrollHeight;
      }
      this.$store.commit(`situation/${MOVE}`, { from, to });
      this.update();
      this.botX = -1;
      this.botY = -1;
    }, 1000);
  }

  update() {
    this.takeTurns = (this.takeTurns === 'RED') ? 'BLACK' : 'RED';
    this.step ++;
    const map = this.$store.getters[`situation/${MAP}`];
    const updatePiece: IPeiceInView[] = [];
    for (let i = 0; i < MAX_WIDTH; ++i) {
      for (let j = 0; j < MAX_HEIGHT; ++j) {
        if (map[i][j].types !== 'null') {
          updatePiece.push({ piece: map[i][j], coord: { x: i, y: j } });
        }
      }
    }
    this.pieceInView = updatePiece;
    const pieceStatus: string = isWin(map);
    if (pieceStatus !== 'TIE' && pieceStatus !== 'FAULT') {
      this.winner = pieceStatus;
      this.canMove = false;
    } else if (pieceStatus === 'FAULT') {
      this.winner = this.takeTurns;
      this.canMove = false;
    }
  }

  mounted() {
    this.pieceInView = [];
    this.pieceInView.push(...initialMax());
    this.pieceInView.push(...initialMin());
    this.pieceInView.forEach((val: IPeiceInView) => {
      this.$store.commit(`situation/${ADD}`, { pos: val.coord, piece: val.piece });
    });
  }
}
</script>

<style>
.h-title {
  color: white;
  background-color: #002329;
  padding: 0 0.5rem 0 0.5rem;
  width: 20%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.home {
  position: relative;
  display: flex;
  width: 100%;
  margin: 0 0 1% 0;
  align-items:center;
  justify-content:center;
  padding: 0;
}
.map {
  width: 30rem;
  height: 33rem;
  background-image: url('../assets/img/RED/bg.png');
  background-size: contain;
  background-repeat: no-repeat;
}
.log-0 {
  color: black;
}
.log-1 {
  color: red;
}
</style>
