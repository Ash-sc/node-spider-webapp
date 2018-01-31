<template>
  <div>
    <router-view transition="fade" transition-mode="out-in"></router-view>
    <assistive-ball></assistive-ball>
  </div>
</template>
<script>
import AssistiveBall from '@/components/assistiveBall'

export default {
  components: { AssistiveBall }
}
</script>
