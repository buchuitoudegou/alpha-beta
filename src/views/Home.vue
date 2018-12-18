<template>
  <div class="home">
    <PieceComponent v-for="piece of pieceInView" :key="piece.coord.y * 9 + piece.coord.x"
    :x="piece.coord.x" :y="piece.coord.y" :types="piece.piece.types"
    :isDead="piece.piece.isDead" :group="piece.piece.group"
    @select="pieceOnSelect"></PieceComponent>
    <div class="map" @click="pieceOnMove"></div>
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

  takeTurns: 'MAX' | 'MIN' = 'MAX';
  selectedPos: Coord = {  x: -1, y: -1};

  pieceOnSelect(x: number, y: number) {
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
    }
  }

  update() {
    this.takeTurns = (this.takeTurns === 'MAX') ? 'MIN' : 'MAX';
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
  background-image: url('../assets/map.png');
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
