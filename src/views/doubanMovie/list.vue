<template>
  <div class="movie-list-section">
    <ul class="movie-list">
      <li v-for="(item, index) in nowPlayingList" :key="index" class="movie-item">
        <div class="movie-star">
          <span class="score">{{ item.score || '0.0' }}</span>
        </div>
        <img
          :src="item.image"
          :alt="item.name"
          class="movie-image"
        />
        <span class="movie-name txt-ellipsis">{{ item.name }}</span>
      </li>
    </ul>
    <ul class="movie-category">
      <li class="category-select">正在热映</li>
      <li class="category-select">即将上映</li>
    </ul>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      nowPlayingList: 'nowPlayingList'
    })
  },

  created() {
    this.$store.dispatch('GET_MOVIE_LIST', { type: 'nowPlayingList' }).then(() => {
      console.log('done!')
    })
  }
}
</script>

