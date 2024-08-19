import {getNowFormatDate} from './utils.js'

class Log {
  static showLog(show) {
    this.show = show;
    this.TAG = "wss1.0.0.0";
    this.newArg = getNowFormatDate()+"--------";
  }
  static d() {
    if (this.show) {
      let newArg = [this.TAG];
      for (let i = 0; i < arguments.length; i++) {
        newArg.push(arguments[i]);
      }
      console.debug(...newArg)
    }
  }
  static image(imageUrl) {
    if (this.show) {
      let newArg = [this.TAG];
  
      console.log(this.TAG, "font-size:41px;background:url("+imageUrl+") no-repeat -135px -1px");
    }
  }
  static i() {
    if (this.show) {
      let newArg = [this.TAG];
      for (let i = 0; i < arguments.length; i++) {
        newArg.push(arguments[i]);
      }
      console.info(...newArg)
    }
    // console.info.apply(console.info, arguments)
  }
  static w() {
    if (this.show) {
      let newArg = [this.TAG];
      for (let i = 0; i < arguments.length; i++) {
        newArg.push(arguments[i]);
      }
      console.warn(...newArg)
    }
  }
  static e() {
    if (this.show) {
      let newArg = [this.TAG];
      for (let i = 0; i < arguments.length; i++) {
        newArg.push(arguments[i]);
      }
      console.error(...newArg)
    }
  }
  static log() {
    if (this.show) {
      let newArg = [this.TAG];
      for (let i = 0; i < arguments.length; i++) {
        newArg.push(arguments[i]);
      }
      console.log(...newArg)
    }
  }
}
export default Log
