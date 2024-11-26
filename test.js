import { testAdd, getZodiacSign, registerAgentStatusListener, Log,calculateProgress} from './index.js';
let a = testAdd(1,2);
let b = getZodiacSign('2001-06-15')
console.log(a,b);
Log.showLog(true)
registerAgentStatusListener('jhh').then(res=>{
  console.log(res);
}).catch(err=>{
  Log.e('err1'+err)
  console.log('err',err)
})

const progress = calculateProgress();
console.log(progress);

let data = {
  app:'',
  reviewList:[
  {id:1,explain:'',reviewserialNo:'1',urls:['http://www.baidu.com','http://www.baidu.com']},
  {id:2,explain:'',reviewserialNo:'2',urls:['http://www.baidu.com','http://www.baidu.com']},
  {id:3,explain:'',reviewserialNo:'3',urls:[]}
]
}
const handleData = ()=>{
  let allArr = data.reviewList
  // 将reviewList拆分为包含url和没有url的数组
  let hasUrlArr = allArr.filter(item=>item.urls.length>0)
  let noUrlArr = allArr.filter(item=>item.urls.length==0)
  // 将带有url的数组格式化下
  const newHasUrlArr = [];
  // 遍历 reviewList
  hasUrlArr.forEach(item => {
    // 遍历 urls，将每个 url 转换为一个新的对象
    item.urls.forEach(url => {
      newHasUrlArr.push({
        id: item.id,
        explain: item.explain,
        reviewserialNo: item.reviewserialNo,
        url: url
      });
    });
  })
  // 用这个数组去v-for就能下载用reviewserialNo属性，并且包括explain属性和url属性，也能展示图片
  console.log('newHasUrlArr',newHasUrlArr)
  // 提交有图片的
  const promises = newHasUrlArr.map((element) => this.$sdk.batchUploadImg(element));
  Promise.allSettled(promises).then((results) => {
    // 得到所有有url调用提交完的结果，这里处理没有urls的部分
    
  });
}


// 保存原始的 console.log
const originalLog = console.log;
// 自定义脱敏的手机号正则表达式
const phoneRegex = /(\d{3})\d{4}(\d{4})/;
// 递归处理对象、数组中的值，进行脱敏
function maskSensitiveData(value) {
  if (typeof value === 'string') {
    // 如果是字符串，匹配手机号并脱敏
    return value.replace(phoneRegex, '$1****$2');
  } else if (Array.isArray(value)) {
    // 如果是数组，递归处理每一项
    return value.map(item => maskSensitiveData(item));
  } else if (typeof value === 'object' && value !== null) {
    // 如果是对象，递归处理每一个键值对
    return Object.keys(value).reduce((acc, key) => {
      acc[key] = maskSensitiveData(value[key]);
      return acc;
    }, {});
  }
  // 如果不是字符串、数组或对象，直接返回原值
  return value;
}
// 覆盖 console.log 方法（用于脱敏的版本）
function maskConsoleLog() {
  console.log = function (...args) {
    const processedArgs = args.map(arg => maskSensitiveData(arg));
    originalLog.apply(console, processedArgs);
  };
}
// 恢复原始的 console.log 方法
function restoreOriginalLog() {
  console.log = originalLog;
}
// 模拟一个请求
function fetchRequestAndDecideLog() {
  // 模拟的请求函数（可以是真实的异步请求，如fetch、axios等）
  return new Promise((resolve) => {
    setTimeout(() => {
      // 模拟的请求结果
      const response = { success: true }; // 假设返回的结果带有是否成功的字段
      resolve(response);
    }, 1000);
  });
}
// 根据请求结果决定是否更改console.log
fetchRequestAndDecideLog().then(response => {
  if (response.success) {
    // 如果请求成功，启用脱敏的console.log
    maskConsoleLog();
  } else {
    // 如果请求失败，保持原来的console.log
    restoreOriginalLog();
  }
});
// 测试：如果请求成功，手机号将被脱敏
console.log("我的手机号是：13812345678");
console.log("其他日志内容", { data: "13898765432" });
console.log("混合数据", [ "13512341234", { phone: "13987654321" }, [ "13612344321" ] ]);

