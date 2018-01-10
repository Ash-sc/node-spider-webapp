<template>
  <div class="page-section">
    <div class="movie-preview-section">
      <div class="movie-subject">
        <!-- <video controls="controls" width="300" height="550">
          <source src="http://web-site-files.ashshen.cc/blog/spider-webapp/movie-version01.mp4" type="video/mp4" />
        </video> -->
      </div>
    </div>
    <div
      class="movie-synopsis"
      :style="{ maxHeight: synopsisType === 'show-more' ? '6.5rem' : '100rem' }"
    >
      <span class="content">《星球大战：最后的绝地武士》承接前作《星球大战：原力觉醒》的剧情，讲述第一军团全面侵袭之下，蕾伊（黛西·雷德利 Daisy Ridley 饰）、芬恩（约翰·博耶加 John Boyega 饰）、波·达默龙（奥斯卡·伊萨克 Oscar Isaac 饰）三位年轻主角各自的抉 择和冒险故事。前作中觉醒强大原力的蕾伊独自寻访隐居的绝地大师卢克·天行者（马克·哈米尔 Mark Hamill 饰），在后者的指导下接受原力训练。芬恩接受了一项几乎不可能完成的任务，为此他不得不勇闯敌营，面对自己的过去。波·达默龙则要适应从战士向领袖的角色转换，这一过程中他也将接受一些血的教训。</span>
    </div>
    <div
      class="icon-chevron-thin-up"
      :class="synopsisType"
      @click="toggleSynopsis"
    ></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      synopsisType: 'show-more'
    }
  },

  methods: {
    toggleSynopsis() {
      const { synopsisType } = this

      this.synopsisType = synopsisType === 'show-more' ? 'show-less' : 'show-more'
    }
  },

  created() {
    const { id } = this.$route.params

    this.$store.dispatch('GET_MOVIE_DETAIL', id).then(data => {
      console.log(data, 3333)
    })
  }
}
</script>

