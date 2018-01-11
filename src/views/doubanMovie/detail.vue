<template>
  <div class="page-section movie-detail-page">
    <div class="movie-preview-section">
      <div class="movie-subject" v-show="!videoShow">
        <img :src="movieDetail.imageLink" class="movie-img" v-show="movieDetail.imageLink">
        <div class="movie-msg" v-show="movieDetail.imageLink">
          <h1 class="txt-ellipsis">{{ movieDetail.name }}</h1>
          <span class="txt-ellipsis">类型：{{ movieDetail.movieType }}</span>
          <span class="txt-ellipsis">时长：{{ movieDetail.runTime || '-' }}分钟</span>
          <span class="txt-ellipsis">上映时间：{{ movieDetail.releaseDate || '-' }}</span>
          <span class="txt-ellipsis">评分：{{ movieDetail.score || '-' }}</span>
          <span @click="toggleVideoShow(true)">宣传片（戳我！）</span>
        </div>
      </div>
      <div class="video-section" v-show="videoShow">
        <span class="close-video" @click="toggleVideoShow(false)">+</span>
        <video
          v-if="movieDetail.videoLink"
          :src="`http://2017017.xyz:10211/movieList/get-movie-stream.mp4?link=${movieDetail.videoLink}`"
          controls="controls"
          class="video"
        ></video>
      </div>
    </div>
    <div
      class="movie-synopsis"
      :style="{ maxHeight: synopsisType === 'show-more' ? '6.9rem' : '100rem' }"
      v-show="movieDetail.synopsis"
    >
      <p class="synopsis-title">剧情简介：</p>
      <span class="content">{{ movieDetail.synopsis }}</span>
    </div>
    <div
      class="icon-chevron-thin-up"
      :class="synopsisType"
      v-show="movieDetail.synopsis"
      @click="toggleSynopsis"
    ></div>
    <ul class="movie-moment" v-show="movieDetail.moment">
      <li class="moment-title">热门评论：</li>
      <li v-for="(item, index) in movieDetail.moment" :key="index" class="moment-item">
        <p class="user">{{ item.user }}</p>
        <p class="content">{{ item.content }}</p>
      </li>
    </ul>
    <spider-loading v-show="isLoading"></spider-loading>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      synopsisType: 'show-more',
      isLoading: false,
      videoShow: false
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
    },

    toggleVideoShow(type) {
      console.log(type, 222)
      this.videoShow = type
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

