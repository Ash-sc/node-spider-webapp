<template>
  <div class="assistive-ball-bg">
    <div class="assistive-ball-body" :class="`ball-status-${currentStatus}`">
      <button class="main-ball" @click="mainBallAction"></button>
      <ul class="child-ball-list">
        <li
          class="child-ball"
          v-for="(item, index) in dataList"
          :key="index"
        ></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    statusArr: ['adsorption', 'wake-up', 'active'],
    currentStatus: 'adsorption',
    dataList: [
      { icon: '123', routerName: '' },
      { icon: '123', routerName: '' },
      { icon: '123', routerName: '' },
      { icon: '123', routerName: '' },
      { icon: '123', routerName: '' }
    ]
  }),

  methods: {
    mainBallAction() {
      const { currentStatus, statusArr } = this
      const index = statusArr.indexOf(currentStatus) + 1
      this.currentStatus = statusArr[index > 2 ? 0 : index]
    }
  }
}
</script>
<style lang="less" scoped>
.assistive-ball-bg {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1024;
}
.assistive-ball-body {
  position: fixed;
  right: 0;
  top: 50%;
  margin-top: -1rem;
  margin-right: .1rem;
  width: 2rem;
  height: 2rem;
  box-sizing: border-box;
  transition: margin-right 0.1s cubic-bezier(0.68, -0.12, 0.66, 1.82);

  .main-ball {
    width: 2rem;
    height: 2rem;
    border: none;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, .3);
    padding: .3rem;
    outline: none;
  }

  .main-ball:before {
    content: '';
    position: absolute;
    width: 1.4rem;
    height: 1.4rem;
    border: .1rem solid #fff;
    border-radius: 50%;
    left: .3rem;
    top: .3rem;
  }

  .child-ball-list {
    position: absolute;
    left: 1rem;
    top: 1rem;
    padding: 0;
    list-style: none;

    .child-ball {
      position: absolute;
      display: none;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, .3);
    }

  }

}

.ball-status-adsorption {
  margin-right: -.9rem;
}

.ball-status-wake-up {
  .child-ball-list .child-ball {
    display: block;
  }
  .child-ball:nth-child(1), .child-ball:nth-child(5) {
    right: sin(3.14 / 180 * 0) * 5rem - 1rem;
  }

  .child-ball:nth-child(1) {
    margin-top: 0 - cos(3.14 / 180 * 0) * 5rem - 1rem;
  }

  .child-ball:nth-child(5) {
    margin-top: cos(3.14 / 180 * 0) * 5rem - 1rem;
  }

  .child-ball:nth-child(2), .child-ball:nth-child(4) {
    right: sin(3.14 / 180 * 45) * 5rem - 1rem;
  }

  .child-ball:nth-child(2) {
    margin-top: 0 - cos(3.14 / 180 * 45) * 5rem - .5rem;
  }

  .child-ball:nth-child(4) {
    margin-top: cos(3.14 / 180 * 45) * 5rem - 2rem + .5rem;
  }

  .child-ball:nth-child(3) {
    top: -1rem;
    right: 4rem;
  }
}
</style>


