<template>
  <div id="app">
    <router-view/>
    <ConnectWS
      :timeOut='1000'
      :socketUrl="'wss://ostris.club/ws'"
      :startConnect='true'
      :tryConnect='true'/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {
      ConnectWS: _ => import('./components/ConnectWS')
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
