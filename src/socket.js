
// const io = require('../lib/socket.io');
// const Util = require('./qn_util');

class ChannelsoftSocket {
  constructor() { }
  /**
   * 连接
   * @param entNum 企业编号
   * @param type 类型 1 坐席  2客户
   * @param uuid 唯一标识
   * @param token 请求标志
   */

  static connect(data) {
    this.socket = io.connect(
      data.host +
      "?entNum=" + data.entNum +
      "&type=" + data.type +
      "&agentId=" + data.agentId +
      "&token=" +
      data.token, {
      path: data.baseUrl + "/socket.io",
      transports: ['websocket'],
    }
    );
    this.socket.on("connect", function () {
      console.warn("connect");
    });
    this.socket.on("connect_error", function (obj) {
      console.warn("connect_error" + obj);
    });

    this.socket.on("disconnect", function (res) {
      console.warn("disconnect", res);
    });
    this.socket.on("reconnect_error", function (obj) {
      console.warn("reconnect_error" + obj);
    });

    this.socket.on("reconnect_failed", function () {
      console.warn("reconnect_failed");
    });
  }
  static disconnectSocket() {
    this.socket.disconnect();
    this.socket = null;
  }
  static getInstance() {
    return this.socket
  }
  static sendCommand(event, commandObj, callBack) {
    this.socket.emit(event, commandObj, callBack);
  }
}
module.exports = ChannelsoftSocket
