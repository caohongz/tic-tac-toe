<template>
  <div>
    <button
      :class="winnersquare[square]"
      v-for="square in row"
      @click="$emit('handle-change', square)"
      :key="square"
    >
      {{ current[square] }}
    </button>
  </div>
</template>

<script>
export default {
  props: ["winnersquare", "row", "square", "current"],
};
</script>

<style scoped></style>
