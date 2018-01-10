<template>
  <div class="page-section">
    <div class="movie-preview-section">
      <div class="movie-subject">
        <img :src="movieDetail.imageLink" class="movie-img" v-show="movieDetail.imageLink" >
        <div class="movie-msg">
          <h1 class="txt-ellipsis">{{ movieDetail.name }}</h1>
          <span class="txt-ellipsis">类型：{{ movieDetail.movieType }}</span>
          <span class="txt-ellipsis">时长：{{ movieDetail.runTime || '-' }}分钟</span>
          <span class="txt-ellipsis">上映时间：{{ movieDetail.releaseDate || '-' }}</span>
          <span class="txt-ellipsis">评分：{{ movieDetail.score || '-' }}</span>
        </div>
      </div>
    </div>
    <div
      class="movie-synopsis"
      :style="{ maxHeight: synopsisType === 'show-more' ? '6.5rem' : '100rem' }"
    >
      <span class="content">{{ movieDetail.synopsis }}</span>
    </div>
    <div
      class="icon-chevron-thin-up"
      :class="synopsisType"
      v-show="movieDetail.synopsis"
      @click="toggleSynopsis"
    ></div>
    <spider-loading v-show="isLoading"></spider-loading>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      synopsisType: 'show-more',
      isLoading: false
    }
  },

  computed: {
    ...mapGetters({
      movieDetail: 'movieDetail'
    })
  },

  methods: {
    toggleSynopsis() {
      const { synopsisType } = this

      this.synopsisType = synopsisType === 'show-more' ? 'show-less' : 'show-more'
    }
  },

  created() {
    const { id } = this.$route.params

    this.isLoading = true
    this.$store.dispatch('GET_MOVIE_DETAIL', id).then(data => {
      this.isLoading = false
    })
  }
}
</script>

