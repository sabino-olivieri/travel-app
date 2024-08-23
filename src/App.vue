<template>

  <router-view></router-view>

</template>

<script>
import { store } from './store';

export default {
  data() {
    return {
      store
    }
  },
  created() {
    const arrayJSON = JSON.parse(localStorage.getItem('travel'));

    store.arrayTravel = arrayJSON ? arrayJSON : [];

    console.log(store.arrayTravel);
  },
}
</script>

<style lang="scss" scoped></style>