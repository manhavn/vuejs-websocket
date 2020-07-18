export default {
  increment(state) {
    state.count++
  },
  setConnectWS(state, payload) {
    state.connectWS = payload
  },
  setMessageWS(state, payload) {
    state.message = payload
    state.updateMessage++
  },
  sendWS(state, payload) {
    state.putMessage = payload
    state.sendCount++
  },
}
