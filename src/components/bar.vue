<template>
  <div>
    bar {{$store.state.name}} {{$store.state.serverName}}
  </div>
</template>

<script>
export default {
  mounted () { // mounted不会在服务端触发，因为没有dom结构
    console.log('客户端')
    this.$store.dispatch('changeName')
    this.$store.dispatch('changeServerName')
  },
  // 这个方法只有在服务端调用（只有页面级组件才会执行，具体控制在serveice.entry内)
  // 而且要求这个方法必须返回一个promise
  // store由调用的时候传入
  asyncData (store) {
    return store.dispatch('changeServerName')
  }
}
</script>

<style scoped>
div {
  background: red;
}
</style>