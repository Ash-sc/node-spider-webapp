<template>
  <div class="assistive-ball-body" :class="`ball-status-${currentStatus}`">
    <button class="main-ball" @click="mainBallAction" :class="{'icon-close': currentStatus === 'wake-up'}"></button>
    <ul class="child-ball-list">
      <li
        class="child-ball"
        v-for="(item, index) in dataList"
        :key="index"
      >
      <div class="ball" :class="`icon-${item.icon}`" @click="jumpTo(item.routerName)"></div>
      </li>
    </ul>
    <div class="assistive-ball-bg" v-show="currentStatus === 'wake-up'" @click="closeBall"></div>
  </div>
</template>
<script>
export default {
  data: () => ({
    currentStatus: 'adsorption',
    dataList: [
      { icon: 'movie', routerName: 'dou-ban-movie-list' },
      { icon: 'weibo', routerName: '' },
      { icon: 'zhihu', routerName: '' },
      { icon: 'movie', routerName: 'dou-ban-movie-list' },
      { icon: 'weibo', routerName: '' }
    ]
  }),

  methods: {
    mainBallAction() {
      const { currentStatus } = this
      this.currentStatus = currentStatus === 'adsorption' ? 'wake-up' : 'adsorption'
      window[`${currentStatus === 'adsorption' ? 'add' : 'remove'}EventListener`]('scroll', this.scrollListener)
    },

    jumpTo(name) {
      this.$router.push({ name })
      this.currentStatus = 'adsorption'
    },

    closeBall() {
      this.currentStatus = 'adsorption'
    },

    scrollListener() {
      const { isSroll, currentStatus } = this
      if (isSroll) return false
      if (currentStatus === 'wake-up') this.currentStatus = 'adsorption'
      this.isSroll = true
      window.setTimeout(() => { this.isSroll = false }, 1000)
    }
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollListener)
  }
}
</script>
<style lang="less" scoped>
.assistive-ball-body {
  position: fixed;
  right: 1.1rem;
  top: 50%;
  box-sizing: border-box;
  z-index: 1024;

  .main-ball {
    position: absolute;
    width: 2rem;
    height: 2rem;
    left: -1rem;
    top: -1rem;
    border: none;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, .5);
    padding: .3rem;
    outline: none;
    z-index: 1;
  }

  .main-ball:not(.icon-close):before {
    content: '';
    position: absolute;
    width: 1.4rem;
    height: 1.4rem;
    border: .1rem solid #fff;
    border-radius: 50%;
    left: .3rem;
    top: .3rem;
    box-sizing: border-box;
  }
  .main-ball.icon-close {
    color: #fff;
    font-size: 1rem;
  }

  .child-ball-list {
    position: absolute;
    left: 0;
    top: 0;
    padding: 0;
    margin: 0;
    list-style: none;
    z-index: 1;

    .child-ball {
      position: absolute;
      width: 0;
      height: 0;
      background-color: #000;
      transition: transform .2s cubic-bezier(0.42, 0, 0.4, 1.76);
    }

    .ball {
      position: absolute;
      width: 2rem;
      height: 2rem;
      left: -1rem;
      top: -1rem;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, .5);
      transform: scale(0);
      transition: transform .2s cubic-bezier(0.42, 0, 0.4, 1.76);
      opacity: 0;
      line-height: 2rem;
      text-align: center;
      color: #fff;
    }

  }

}

.generate-child-ball(20);

.generate-child-ball(@n, @i: 1) when (@i =< @n) {
  .ball-status-wake-up {
    .child-ball:nth-child(@{i}) {
      transform: translate(0 - sin(3.14 / 180 * (18 + 36 * (@i - 1))) * 5rem, 0 - cos(3.14 / 180 * (18 + 36 * (@i - 1))) * 5rem);
      transition-delay: @i * .1s;
      .ball {
        opacity: 1;
        transform: scale(1);
        transition-delay: @i * .1s;
      }
    }
  }
  .generate-child-ball(@n, (@i + 1));
}

.ball-status-adsorption {
  margin-right: -.9rem;
}

.assistive-ball-bg {
  position: fixed;
  opacity: 0;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>


