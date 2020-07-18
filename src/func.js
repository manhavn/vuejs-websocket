export function reTryConnectWS(socketUrl, timeOut, setWs, setConn, xInterval, setXInterval) {
  if (xInterval) return
  if (!timeOut) {
    timeOut = 1000
  }
  setConn(false)
  xInterval = setInterval(() => {
    const ws = new WebSocket(socketUrl)
    setWs(ws)
  }, timeOut)
  setXInterval(xInterval)
}
