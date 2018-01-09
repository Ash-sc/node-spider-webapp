<template>
  <div class="movie-list-section">
    <ul class="movie-list">
      <li v-for="(item, index) in movieList" :key="index" class="movie-item">
        <div class="movie-star" v-show="menuType === 'nowPlayingList'">
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
      <li
        v-for="(item, index) in catetogyList"
        :key="index"
        class="category-select"
        :class="{ active: menuType === item.type }"
        @click="getMovieList(item.type)"
      >{{ item.name }}</li>
    </ul>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      nowPlayingList: 'nowPlayingList',
      willPlayList: 'willPlayList'
    }),

    movieList() {
      return this[this.menuType]
    }
  },

  data() {
    return {
      menuType: 'nowPlayingList',
      catetogyList: [
        { name: '正在热映', type: 'nowPlayingList' },
        { name: '即将上映', type: 'willPlayList' }
      ]
    }
  },

  methods: {
    getMovieList(type) {
      if (this.menuType === type) return false

      this.menuType = type
      return this.getListData(type)
    },

    getListData(type) {
      this.$store.dispatch('GET_MOVIE_LIST', { type }).then(() => {
        console.log('done!')
      })
    }
  },

  created() {
    const { menuType, getListData } = this

    getListData(menuType)
  }
}
</script>

