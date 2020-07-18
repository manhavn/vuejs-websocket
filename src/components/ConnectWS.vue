<template>
</template>

<script>
  import {mapState} from "vuex";
  import {reTryConnectWS} from '../func'

  export default {
    name: "ConnectWS",
    props: ['socketUrl', 'timeOut', 'startConnect', 'tryConnect'],
    data() {
      return {
        ws: null,
        conn: false,
        retry: false,
        xInterval: 0,
      }
    },
    computed: {
      ...mapState({
        sendCount: state => state.sendCount,
        putMessage: state => state.putMessage,
      }),
    },
    methods: {
      setWs(value) {
        this.ws = value
      },
      setConn(value) {
        this.conn = value
      },
      setRetry(value) {
        this.retry = value
      },
      setXInterval(value) {
        this.xInterval = value
      },
      startCheckAndConnect() {
        this.setWs(null)
        this.setConn(false)
        this.setRetry(false)
        if (this.xInterval) clearInterval(this.xInterval) && this.setXInterval(0)
        setTimeout(() => {
          if (this.startConnect) {
            this.setWs(new WebSocket(this.socketUrl))
          }
        }, 100)
      },
    },
    mounted() {
      this.startCheckAndConnect();
    },
    watch: {
      startConnect() {
        this.startCheckAndConnect();
      },
      ws() {
        if (this.startConnect && this.ws) this.ws.onopen = () => {
          this.ws.onmessage = ev => this.$store.commit('setMessageWS', ev.data)
          this.ws.onerror = () => reTryConnectWS(this.socketUrl, this.timeOut, this.setWs, this.setConn, this.xInterval, this.setXInterval)
          this.ws.onclose = () => reTryConnectWS(this.socketUrl, this.timeOut, this.setWs, this.setConn, this.xInterval, this.setXInterval)
          if (this.xInterval) clearInterval(this.xInterval)
          this.setConn(true)
        }
        if (this.tryConnect && !this.retry) setTimeout(() => this.setRetry(true), 1000)
      },
      conn() {
        this.$store.commit('setConnectWS', this.conn)
      },
      sendCount() {
        if (this.conn && this.sendCount > -1) this.ws.send(JSON.stringify(this.putMessage))
      },
      retry() {
        if (this.startConnect && this.tryConnect && this.retry && !this.conn && this.ws) {
          const x = setInterval(() => this.setWs(new WebSocket(this.socketUrl)), this.timeOut)
          this.setXInterval(x)
        }
      },
    }
  }
</script>
