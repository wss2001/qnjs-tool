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