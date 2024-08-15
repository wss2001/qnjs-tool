
/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

//秒数转时分秒
export function sec_to_time (s) {
  let t;
  if(s > -1){
      const hour = Math.floor(s/3600);
      const min = Math.floor(s/60) % 60;
      const sec = s % 60;
      if(hour < 10) {
          t = '0'+ hour + ":";
      } else {
          t = hour + ":";
      }
      if(min < 10){t += "0";}
      t += min + ":";
      if(sec < 10){t += "0";}
      t += sec.toFixed(0);
  }
  return t;
}
// 写一个函数，获取字符串长度，截取部分
export function getFileName(fileName){
  var showFileName ='';
  var disLength = fileName.length;
  var substringC = 20;
  var nameLength = 0;
  var cutIndex = 0;
  for(var i=0; i<disLength; i++) {
    nameLength += 1;
    if(nameLength > 20){
      cutIndex = i;
      break;
    }
  }
  console.log(nameLength);
  if (nameLength > substringC){
     showFileName = fileName.replace(/^(^.{20})(.+)(\.+\w+$)$/g, "$1...$3");
  }else {
    showFileName = fileName;
  }
  return showFileName;
}
// 当前时间转换为yyyymmdd格式
export function formatDate() {
  let d = new Date()
  let month = '' + (d.getMonth() + 1)
  let day = '' + d.getDate()
  let year = d.getFullYear()
 
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
 
  return [year, month, day].join('');
}
// 防抖
export function simpledebounce(func, wait = 100, immidate = true) {
 let timer = null;
 return function() {
   //this指向问题
   let context = this;
   //拿到参数
   let args = [...arguments];
   clearTimeout(timer);
   if (immidate) {
     let callNow = !timer;
     timer = setTimeout(() => {
       timer = null;
     }, wait);

     //立即执行
     callNow && func.apply(context, args);
   } else {
     timer = setTimeout(() => {
       func.apply(context, args);
     }, wait);
   }
 };
}
// 手机号脱敏处理
export function addStar(tel) {
  if(!tel) {
    return
  }
  let firstStr = tel.substring(0, tel.length - 11)
  let secondStr = tel.substring(tel.length - 11)
  var reg = /^(\d{3})\d{4}(\d{4})$/;
  return firstStr + secondStr.replace(reg, "$1****$2");
}
// 转换视频播放路径
export function extranetProxyForward (originURL,type){
  if (originURL.indexOf('https:') == 0) {
    return originURL
  }
  if(!originURL){
    return originURL;
  }
  // let origin = window.location.origin;
  let proxyUrl = null;
  if(!window.url_map_config){
    return proxyUrl;
  }
  if(window.url_map_config){
    let objectMap = window.url_map_config[type];
    for(let key in objectMap){
      if(objectMap[key]&&originURL.includes(key)){
        proxyUrl = originURL.replace(key,objectMap[key])
      }
    }
  }
  return proxyUrl;
}
//图片转base64
export function getBase64Image(img) {
  console.log('getBase64Image img', img)
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height);
  var dataURL = canvas.toDataURL("image/png");
  return dataURL;  
}
// 获取路径参数
export function getParams (url) {
  if(url.indexOf('?') != -1){
      let obj = {};
      let arr = url.slice(url.indexOf('?')+1).split('&');
      arr.forEach(item => {
          let param = item.split('=');
          obj[param[0]] = param[1];
      })
      return obj;
  }else{
      return null;
  }
}
// 根据图片地址获取图片宽度
export function getImgInfo (url) {
  let img =new Image()
  img.src=url
  return new Promise((resolve, reject) => {
    img.onload=function () {
      resolve({
        width: img.width,
        height: img.height
      })
    }
  })
}
export function testAdd (a,b) {
  return a+b
}
//四舍五入，保留两位小数处理
export function decimalControl(val, point = 2) {
  //小数位数控制
  const floatVal = Number(val);
  return isNaN(floatVal) ? val : _.round(floatVal, point).toFixed(point);
}
/**
 * 字符串转成日期类型
 * 日期时间格式 YYYY/MM/dd HH:mm:ss  YYYY-MM-dd HH:mm:ss
 * 日期格式 YYYY/MM/dd YYYY-MM-dd
 */
export function stringToDate(dateStr) {
  return new Date(Date.parse(dateStr.replace(/-/g, '/')));
}

// 日期转化字符串
export function dateToString(date) {
  let time = date.split('-')
  let timeResult = time[0] + '年' + time[1] + '月' + time[2] + '日'
  console.log(timeResult)
  return timeResult
}

/**
   * 拍照
   */
export function takePicture(dom, type, width, height) {
  return new Promise((resolve, reject) => {
    try {
      if (!dom) {
        Log.w("takePicture", "dom is null", dom);
        reject(callback(6001));
        return;
      }
      let videodom
      let videodomArr = dom.getElementsByTagName("video");
      for (var i = 0; i < videodomArr.length; i++) {
        var childElement = videodomArr[i];
        if (childElement.offsetParent !== null || childElement.getClientRects().length > 0) {
          videodom = childElement
        }
      }
      if (!videodom) {
        Log.w("takePicture", "dom error", dom);
        reject(callback(6001));
        return;
      }
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      if (type && type == 'idcard') {
        // 人脸识别-逆时针旋转90度
        canvas.height = width || videodom.videoWidth;
        canvas.width = height || videodom.videoHeight;
        ctx.rotate(-Math.PI / 2);
        ctx.drawImage(videodom, -canvas.height, 0, canvas.height, canvas.width);
      } else {
        canvas.width = width || videodom.videoWidth;
        canvas.height = height || videodom.videoHeight;
        ctx.drawImage(videodom, 0, 0, canvas.width, canvas.height);
      }
      resolve(callback(0, "success", canvas.toDataURL()));
    } catch (e) {
      Log.w("takePicture", e);
      reject(callback(6000));
    }
  });
}
export function saveFile(res,type,filename){
  const blob = new Blob([response.data], { type: type });
  let downloadFilename = res.headers['content-disposition']?.split('filename*=utf-8')[1]?.slice(2) || 'filename';
  console.log(downloadFilename)
  // console.log(downloadFilename)
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    //兼容ie浏览器
    window.navigator.msSaveOrOpenBlob(blob, downloadFilename)
  } else {
    //谷歌,火狐等浏览器
    let url = window.URL.createObjectURL(blob);
    let downloadElement = document.createElement("a");
    downloadElement.style.display = "none";
    downloadElement.href = url;
    downloadElement.download = downloadFilename;
    document.body.appendChild(downloadElement);
    downloadElement.click();
    document.body.removeChild(downloadElement);
    window.URL.revokeObjectURL(url);
  }
}
//   节流
export function throttle(func, delay) {
  let timer = null;
  let lastExecutedTime = 0;
  return function (...args) {
      const currentTime = Date.now();
      if (currentTime - lastExecutedTime < delay) {
          console.error('+++')
          timer = setTimeout(() => {
              lastExecutedTime = currentTime;
              func.apply(this, args);
          }, delay);
          clearTimeout(timer);
      } else {
          console.error('----')
          lastExecutedTime = currentTime;
          func.apply(this, args);
      }
      
  };
}
export function getZodiacSign(birthday) {
  const zodiacSigns = [
      '鼠', // Rat
      '牛', // Ox
      '虎', // Tiger
      '兔', // Rabbit
      '龙', // Dragon
      '蛇', // Snake
      '马', // Horse
      '羊', // Goat
      '猴', // Monkey
      '鸡', // Rooster
      '狗', // Dog
      '猪', // Pig
  ];
  // 获取公历年份
  const year = new Date(birthday).getFullYear();
  // 通过年份计算属相索引
  const index = (year - 4) % 12;
  return zodiacSigns[index];
}