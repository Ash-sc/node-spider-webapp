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
    <assistive-ball></assistive-ball>
  </div>
</template>
<script>
import AssistiveBall from '@/components/assistiveBall'

export default {
  components: { AssistiveBall },

  data() {
    return {
      appList: []
    }
  }
}
</script>

