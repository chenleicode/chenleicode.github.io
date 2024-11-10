# console.log() in DevTools Console

console.log() 在控制台的输出不是一个快照数据

## 一个例子

```javascript
const testFn = () => {
  const val = {
    a: 'aaa',
    b: 'bbb',
    c: { d: 'ddd' },
  }

  val.c.d = 'first modify'
  console.log(val)
  val.c.d = 'second modify'
}
```

问题来了：最终打印到控制台上的 val 是什么? 

第一直觉告诉我们是 `{ a: 'aaa', b: 'bbb', c: { d: 'first modify' } }`，

但其实答案是 `{ a: 'aaa', b: 'bbb', c: { d: 'second modify' } }`

当我们使用 console.log(val) 打印对象 val 时，控制台显示的实际上是 val 的引用。换句话说，当对象中的属性值在稍后被更改时，控制台可能会显示对象的最新状态，而不是在 console.log 被调用时的状态

## 执行顺序回顾

1. val.c.d 首次被修改为 'first modify'
2. console.log(val) 在这里打印了 val，但这个 val 仍然是一个引用
3. 紧接着，val.c.d 被修改为 'second modify'
4. 因为 val 是引用类型，控制台会展示 val 的最新状态

## 如何解决

如果我们希望打印出对象的快照状态，可以使用对象的深拷贝，如：

```javascript
console.log(JSON.parse(JSON.stringify(val))) // 深拷贝
```
这样，控制台将显示对象在 console.log 被调用时的状态，而不会受后续修改的影响

或者直接使用debugger

## 控制台设置

目前没有设置可以直接调整控制台的对象打印方式来创建快照。因此，最可靠的方式依旧是手动使用深拷贝
