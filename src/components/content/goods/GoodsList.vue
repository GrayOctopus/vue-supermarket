<template>
  <div class="good-list">
    <good-list-item v-for="item in goods" :goods-item="item"/>
  </div>
</template>

<script>
import GoodListItem from "./GoodListItem";
export default {
  name: "GoodsList",
  components: {
    GoodListItem
  },
  props: {
    goods: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style scoped>
.good-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: var(--color-background);
  padding: 2px;
  /*width: 48%;*/

}
</style>
