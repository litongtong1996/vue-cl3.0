<template>
  <div class="icon-selector" :class="{'selector-active': isChecked}">
    <img src="~/assets/img/cart/tick.svg" alt />
  </div>
</template>
<script>
export default {
  props: {
    isChecked: {
      type: Boolean,
      default: true
    }
  }
};
</script>
<style scoped>
.icon-selector {
  position: relative;
  margin: 0;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #ccc;
  cursor: pointer;
}

.selector-active {
  background-color: #ff8198;
  border-color: #ff8198;
}
</style>