<template>
  <div class="home">
    <PieceComponent v-for="piece of pieceInView" :key="piece.coord.y * 9 + piece.coord.x"
    :x="piece.coord.x" :y="piece.coord.y" :types="piece.piece.types"
    :isDead="piece.piece.isDead" :group="piece.piece.group"
    @select="pieceOnSelect"></PieceComponent>
    <img src="../assets/img/RED/r_box.png" :style="`position: absolute; \
    top: ${selectedY * 55 + 20}px; left: ${selectedX * 55 + 158}px;`" v-if="selectedX !== -1">
    <div class="map" @click="pieceOnMove"></div>
    <img src="../assets/img/BLACK/b_box.png" :style="`position: absolute; \
    top: ${botY * 55 + 20}px; left: ${botX * 55 + 158}px;`" v-if="botX !== -1">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Piece, Coord, MAX_WIDTH, MAX_HEIGHT } from '@/store/modules/situation/typings';
import { ADD, MOVE, MAP } from '@/store/modules/situation';
import PieceComponent from '../components/Piece.vue';
import { isPrimitive } from 'vue-class-component/lib/util';
import { isValidMove } from '../utils/move';
import { initialMax, initialMin } from '../utils/InitialMap';
import { evaluate, Node } from '../utils/evaluate';

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

  takeTurns: 'RED' | 'BLACK' = 'BLACK';
  selectedPos: Coord = {  x: -1, y: -1 };

  step = 0;

  botX: number = -1;
  botY: number = -1;

  get selectedX() {
    return this.selectedPos.x === -1 ? -1 : this.selectedPos.x;
  }

  get selectedY() {
    return this.selectedPos.y === -1 ? 5 : this.selectedPos.y;
  }

  pieceOnSelect(x: number, y: number) {
    // console.log(x, y);
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
      this.$store.commit(`situation/${MOVE}`, { from: this.selectedPos, to: { x: newX, y: newY } });
      this.update();
      this.selectedPos.x = -1;
      this.selectedPos.y = -1;
      setTimeout(() => this.botMove(), 50);
    }
  }

  pieceOnMove(event: MouseEvent) {
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
      this.$store.commit(`situation/${MOVE}`, { from: this.selectedPos, to: { x: newX, y: newY } });
      this.update();
      this.selectedPos.x = -1;
      this.selectedPos.y = -1;
      setTimeout(() => this.botMove(), 50);
    }
  }

  botMove() {
    // console.log('bot');
    const curNode = new Node(this.$store.getters[`situation/${MAP}`], 'RED', 1, [], -999999, 999999);
    curNode.findChildren();
    // console.log(curNode);
    const { from, to } = curNode.findNext();
    this.botX = from.x;
    this.botY = from.y;
    setTimeout(() => {
      this.$store.commit(`situation/${MOVE}`, { from, to });
      this.update();
      this.botX = -1;
      this.botY = -1;
    }, 1000);
  }

  update() {
    this.takeTurns = (this.takeTurns === 'RED') ? 'BLACK' : 'RED';
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
    // console.log(evaluate(this.$store.getters[`situation/${MAP}`]));
  }

  mounted() {
    this.pieceInView = [];
    this.pieceInView.push(...initialMax());
    this.pieceInView.push(...initialMin());
    this.pieceInView.forEach((val: IPeiceInView) => {
      this.$store.commit(`situation/${ADD}`, { pos: val.coord, piece: val.piece });
    });
    // console.log(evaluate(this.$store.getters[`situation/${MAP}`]));
  }
}
</script>

<style>
.home {
  position: relative;
  margin: 0 auto;
  margin-top: 2rem;
  display: flex;
  width: 50rem;
  height: 36rem;
  align-items:center;
  justify-content:center;
  border-style: solid;
  border-color: red;
}
.map {
  /* position: absolute; */
  width: 30rem;
  height: 33rem;
  background-image: url('../assets/img/RED/bg.png');
  /* background-image: url('../assets/map.png'); */
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
