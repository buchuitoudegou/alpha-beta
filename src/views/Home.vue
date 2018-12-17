<template>
  <div class="home">
    <div class="map"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Piece, Coord, MAX_WIDTH, MAX_HEIGHT } from '@/store/modules/situation/typings';
import { ADD, MOVE, MAP } from '@/store/modules/situation';

@Component
export default class Home extends Vue {
  public mounted() {
    const newPiece: Piece = {
      types: 'car',
      group: 'MAX',
      isDead: false,
    };
    const coord: Coord = {
      x: 0,
      y: 0,
    };
    this.$store.commit(`situation/ADD`, { pos: coord, piece: newPiece });
    // get
    const map = this.$store.getters[`situation/${MAP}`];
  }
}
</script>

<style>
.home {
  margin: 0 auto;
  margin-top: 2rem;
  display: flex;
  width: 60%;
  height: 54rem;
  border-style: solid;
  border-color: red;
}
.map {
  margin: auto;
  width: 50%;
  height: 80%;
  background-image: url('../assets/map.png');
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
