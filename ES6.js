/* linter-disable */

⭐⭐⭐ES6⭐⭐⭐

⭐let 和 const 命令&变量的解构赋值
*变量提升&暂时性死区

*顶层对象，在浏览器环境指的是window对象，在 Node 指的是global对象。ES5 之中，顶层对象的属性与全局变量是等价的。

var a
function a();
this.a
浏览器 → window.a
Node  → global.a
Web Worker → self.a

let、const、class;


⭐ Unicode 字符串的扩展

*s.codePointAt(0)

'\z' === 'z'  // true
'\172' === 'z' // true
'\x7A' === 'z' // true
'\u007A' === 'z' // true
'\u{7A}' === 'z' // true

let s = "𠮷";
s.length // 2
s.charAt(0) // ''
s.charAt(1) // ''
s.charCodeAt(0) // 55362
s.charCodeAt(1) // 57271
s.codePointAt(0) // 134071
s.codePointAt(1) // 57271

let s = '𠮷a';
for (let ch of s) {
  console.log(ch.codePointAt(0).toString(16));
}
// 20bb7
// 61

function is32Bit(c) {
  return c.codePointAt(0) > 0xFFFF;
}
is32Bit("𠮷") // true
is32Bit("a") // false



*
String.fromCharCode(0x20BB7)// "ஷ"
String.fromCodePoint(0x20BB7)// "𠮷"


***注意，fromCodePoint方法定义在String对象上，而codePointAt方法定义在字符串的实例对象上。



*
for (let i of text) {
  console.log(i);
}// "𠮷"



⭐ RegExp 正则的扩展
*RegExp构造函数
var regex = /xyz/i;
var regex = new RegExp(/xyz/i);
var regex = new RegExp('xyz', 'i');
console.log(regex)

// var regexp = new RegExp(/abc/ig);
new RegExp(/abc/ig, 'i').flags; //"i"???????????????????????????????????????????
// console.log(regexp)


*u修饰符，含义为“Unicode 模式”，用来正确处理大于\uFFFF的 Unicode 字符
*unicode属性，表示是否设置了u修饰符。
const r1 = /hello/;
const r2 = /hello/u;

r1.unicode // false
r2.unicode // true


*y修饰符, “粘连”（sticky）修饰符。
*g修饰符只要剩余位置中存在匹配就可，而y修饰符确保匹配必须从剩余的第一个位置开始。
var s = 'aaa_a';
var r1 = /a+/g;
var r2 = /a+/y;

r1.exec(s) // ["aaa"]
r1.exec(s) // ["a"]

r2.exec(s) // ["aaa"]
r2.exec(s) // null
*g修饰符会忽略非法字符，而y修饰符不会，这样就很容易发现错误。

*sticky属性，表示是否设置了y修饰符。
var r = /hello\d/y;
r.sticky // true



*flags属性，会返回正则表达式的修饰符。

// ES5 的 source 属性： 返回正则表达式的正文
/abc/ig.source // "abc"

// ES6 的 flags 属性： 返回正则表达式的修饰符
/abc/ig.flags // 'gi'



*\p{...}和\P{...}，允许正则表达式匹配符合 Unicode 某种属性的所有字符。
\P{…}是\p{…}的反向匹配，即匹配不满足条件的字符。
注意，这两种类只对 Unicode 有效，所以使用的时候一定要加上u修饰符。

// 匹配所有数字
const regex = /^\p{Number}+$/u;


*具名组匹配,允许为每一个组匹配指定一个名字，既便于阅读代码，又便于引用。
const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;

const matchObj = RE_DATE.exec('1999-12-31');
const year = matchObj.groups.year; // 1999
const month = matchObj.groups.month; // 12
const day = matchObj.groups.day; // 31


⭐数值的扩展
*0b（或0B）和0o（或0O）
转为十进制，要使用Number方法。

Number('0b111')  // 7
Number('0o10')  // 8



*Number.isFinite()用来检查一个数值是否为有限的（finite），即不是Infinity。
注意，如果参数类型不是数值，Number.isFinite一律返回false。
Number.isFinite(15); // true
Number.isFinite(0.8); // true
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false
Number.isFinite(-Infinity); // false
Number.isFinite('foo'); // false
Number.isFinite('15'); // false
Number.isFinite(true); // false

*Number.isNaN()用来检查一个值是否为NaN。
如果参数类型不是NaN，Number.isNaN一律返回false。
Number.isNaN(NaN) // true
Number.isNaN(15) // false
Number.isNaN('15') // false
Number.isNaN(true) // false
Number.isNaN(9/NaN) // true
Number.isNaN('true' / 0) // true
Number.isNaN('true' / 'true') // true




*Number.parseInt === parseInt // true
*Number.parseFloat === parseFloat // true
这样做的目的，是逐步减少全局性方法，使得语言逐步模块化。

// ES5的写法
parseInt('12.34') // 12
parseFloat('123.45#') // 123.45
// ES6的写法
Number.parseInt('12.34') // 12
Number.parseFloat('123.45#') // 123.45





*Number.isInteger()用来判断一个数值是否为整数。
JavaScript 内部，整数和浮点数采用的是同样的储存方法，所以 25 和 25.0 被视为同一个值。

Number.isInteger(25) // true
Number.isInteger(25.0) // true
Number.isInteger(25.1) // false
Number.isInteger(3.0000000000000002) // true
Number.isInteger(5E-324) // false
Number.isInteger(5E-325) // true




⭐ Math 对象的扩展
*Math.trunc() 方法用于去除一个数的小数部分，返回整数部分。
*Math.sign() 方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。
*Math.cbrt()方法用于计算一个数的立方根。


*指数运算符（**）
2 ** 3 ** 2  // 相当于 2 ** (3 ** 2)
// 512

Math.pow(99, 99)  // 3.697296376497263e+197
99 ** 99  // 3.697296376497268e+197




⭐函数的扩展
* rest 参数
形式为...变量名 用于获取函数的多余参数，这样就不需要使用arguments对象了。
rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。

function add(...values) {
  let sum = 0;
  for (var val of values) {
    sum += val;
  }
  return sum;
}
add(2, 5, 3) // 10



// arguments变量的写法
function sortNumbers() {
  return Array.prototype.slice.call(arguments).sort();
}

// rest参数的写法
const sortNumbers = (...numbers) => numbers.sort();



* arrow箭头函数
var f = v => v;
// 等同于
var f = function (v) {return v;};


var f = () => 5;
// 等同于
var f = function () { return 5 };







⭐ Symbol
表示独一无二的值。
它是 JavaScript 语言的第七种数据类型，
前六种是：undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。


⭐ Set & Map  集合

const set = new Set([1, 2, 3, 4, 4]);
[...set]
// [1, 2, 3, 4]


const map = new Map([['name', '张三'],['title', 'Author']]);
map.get('name') // "张三"
map.get('title') // "Author"





⭐ Promise 对象
*Promise 是一个对象，从它可以获取异步操作的消息。
（1）对象的状态不受外界影响。
    Promise 对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。
    只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。
    从 pending 变为 fulfilled 和从 pending 变为 rejected。 resolved（已定型）
    此时添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

如果某些事件不断地反复发生，一般来说，使用 Stream 模式是比部署 Promise 更好的选择。

const promise = new Promise(function(resolve, reject) {
  // ... some code
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});






⭐ Iterator 和 for...of 循环

* Iterator : Array 、 Object 、 Map 、 Set
一是为各种数据结构，提供一个统一的、简便的访问接口；
二是使得数据结构的成员能够按某种次序排列；
三是 ES6 创造了一种新的遍历命令 for...of循环，Iterator 接口主要供 for...of消费。


⭐ Generator 一种异步编程解决方案
Generator 函数是一个状态机，封装了多个内部状态。
Generator 函数是一个遍历器对象生成函数。
有两个特征:
一是，function关键字与函数名之间有一个星号；
二是，函数体内部使用yield表达式，定义不同的内部状态（yield在英语里的意思就是“产出”）。

function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}
var hw = helloWorldGenerator();

⭐ Generator 函数的异步应用
*JavaScript 语言的执行环境是“单线程”的。


*ES6 诞生以前，异步编程的传统方法，大概有下面四种。
    回调函数
    事件监听
    发布/订阅
    Promise 对象

*Generator 函数是协程在 ES6 的实现，最大特点就是可以交出函数的执行权（即暂停执行）。
function* gen(x) {
  var y = yield x + 2;
  return y;
}

var g = gen(1);
g.next() // { value: 3, done: false }
g.next() // { value: undefined, done: true }



Thunk 函数
co 模块





⭐ async 函数
Generator 函数的语法糖。
const asyncReadFile = async function () {
  const f1 = await readFile('/etc/fstab');
  const f2 = await readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};



（1）内置执行器。
asyncReadFile();

（2）更好的语义。
async 和 await，比起 星号* 和 yield，语义更清楚了。

（3）更广的适用性。
co模块约定，yield命令后面只能是 Thunk 函数或 Promise 对象，
而async函数的await命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值）

（4）返回值是 Promise。
async函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。







⭐ Module
export 命令用于规定模块的对外接口
import 命令用于输入其他模块提供的功能
*模块顶层

*export
// 写法一
export var m = 1;
// 写法二
var m = 1;
export {m};
// 写法三
var n = 1;
export {n as m};


*import
import命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口。
import { lastName as surname } from './profile.js';
注意，import命令具有提升效果，会提升到整个模块的头部，首先执行。







⭐ Module 的加载
<!-- 页面内嵌的脚本 -->
<script type="application/javascript">
  // module code
</script>

<!-- 外部脚本 -->
<script type="application/javascript" src="path/to/myModule.js">
</script>



>
<script>标签打开defer或async属性，脚本就会异步加载

defer要等到整个页面在内存中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成），才会执行；
async一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。
一句话，defer是“渲染完再执行”，async是“下载完就执行”。

<script src="path/to/myModule.js" defer></script>
<script src="path/to/myModule.js" async></script>





>
*加载 ES6 模块，也使用<script>标签，但是要加入 type="module" 属性
<script type="module" src="./foo.js"></script>
<!-- 等同于 -->
<script type="module" src="./foo.js" defer></script>

<script type="module" src="./foo.js" async></script>





>
* ES6 模块与 CommonJS 模块的差异

CommonJS    模块输出的是一个值的拷贝，
ES6         模块输出的是值的引用。

CommonJS    模块是运行时加载，加载的是一个对象
ES6         模块是编译时输出接口, ES6 模块不是对象


*Node 加载

要求 ES6 模块采用 .mjs 后缀文件名










⭐ JS回调函数 Callback 回头调用

A callback is a function that is passed as an argument to another function and is executed after its parent function has completed。

将 funtion a() 作为 参数 传到另一个函数 funtion b() 里面，当 funtion b() 执行完之后，
再执行传进去的这个函数 funtion a()。

主函数 b() 的事先干完，回头再调用传进来的那个函数 a()。

举一个别人举过的例子：约会结束后你送你女朋友回家，离别时，你肯定会说：“到家了给我发条信息，我很担心你。”
对不，然后你女朋友回家以后还真给你发了条信息。小伙子，你有戏了。
其实这就是一个回调的过程。你留了个参数函数（要求女朋友给你发条信息）给你女朋友，然后你女朋友回家，回家的动作是主函数。
她必须先回到家以后，主函数执行完了，再执行传进去的函数，然后你就收到一条信息了。



//定义回调函数
function A(){
    setTimeout("console.log('我是回调函数')", 3000);//模仿耗时操作
}


//定义主函数，回调函数作为参数
function B(callback) {
    callback();
    console.log('我是主函数');
}


//调用主函数，将函数A传进去
B(A);

//输出结果
我是主函数
我是回调函数














*end
