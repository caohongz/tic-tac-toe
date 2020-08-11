<template>
  <div>
    <div class="board-row" v-for="(row, index) in board" :key="index">
      <Square v-bind="$attrs" :row="row" v-on="$listeners"></Square>
    </div>
  </div>
</template>

<script>
import Square from "./Square";
export default {
  props: ["board"],
  components: {
    Square,
  },
};
</script>

<style scoped></style>
