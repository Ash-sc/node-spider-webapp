<template>
  <div>
    <router-view transition="fade" transition-mode="out-in"></router-view>
    <assistive-ball :data-list="dataList" v-on:ball-touch="touchEvent">
    </assistive-ball>
  </div>
</template>
<script>

export default {
  data() {
    return {
      dataList: ['ab-movie', 'ab-zhihu', 'ab-weibo', 'ab-movie', 'ab-zhihu']
    }
  },

  methods: {
    touchEvent(icon) {
      switch (icon) {
        case 'ab-movie':
          this.$router.push({ name: 'dou-ban-movie-list' })
          break
        default:
          break
      }
    }
  }
}
</script>
