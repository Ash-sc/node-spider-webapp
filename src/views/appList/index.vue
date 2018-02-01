<template>
  <div class="app-list-page">
    <div class="app-items">
      <div
        class="app-item"
        v-for="(app, index) in appList"
        :key="index"
      >
        <img src="http://olo3fohgk.bkt.clouddn.com/morty.gif" alt="movie" />
      </div>
    </div>
  </div>
</template>
<script>

export default {

  data() {
    return {
      appList: []
    }
  }
}
</script>

