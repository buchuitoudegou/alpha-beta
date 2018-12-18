<template>
  <img :src="require(`../assets/img/${this.group}/${this.types}.png`)" 
  :style="pieceStyle" @click="select" draggable="false"/>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Piece } from '@/store/modules/situation/typings';

@Component({
  name: 'PieceComponent'
})
export default class PieceComponent extends Vue {
  @Prop(Number) x !: number;
  @Prop(Number) y !: number;
  @Prop(String) types !: string;
  @Prop(String) group !: string;
  @Prop(Boolean) isDead !: boolean;

  get pieceStyle(): string {
    const yOffset = this.y * 55 + 20;
    const xOffset = this.x * 55 + 158;
    return `position: absolute; top: ${yOffset}px; left: ${xOffset}px;
      user-select: none;`;
  }

  select() {
    this.$emit('select', this.x, this.y);
  }
}
</script>
