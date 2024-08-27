下面是学习 JavaScript 异步知识的笔记

## try...catch
try...catch 语句由一个 try 块和一个 catch 块或 finally 块（或两者皆有）组成。首先执行 try 块中的代码，如果它抛出异常，则将执行 catch 块中的代码。finally 块中的代码将在控制流退出整个结构之前始终被执行。

```js
// 语法
try {
  tryStatements
} catch (exceptionVar) {
  catchStatements
} finally {
  finallyStatements
}
```
::: info 注意
- `(exceptionVar)` 是可选的
- 与其他结构（如 if 或 for）不同，try、catch 和 finally 块必须是块，而不是单个语句
:::

## throw
throw 语句用于抛出用户自定义的异常。当前函数的执行将停止（throw 之后的语句不会被执行），并且控制权将传递给调用堆栈中第一个 catch 块。如果调用函数中没有 catch 块，则程序将终止。

### 语法
```js
throw expression; // expression 是表达式
```

### 描述
throw 关键字后面可以跟任何类型的表达式，例如：

```js
throw error; // 抛出之前定义的值（例如，在 catch 块中）
throw new Error("Required"); // 抛出一个新的错误对象
```

在实践中，你抛出的异常应该始终是 Error 对象或 Error 子类的实例，例如 RangeError、TypeError。这是因为捕获错误的代码可能期望捕获的值具有一些属性，例如错误信息。

## 时间顺序
1. promise
2. async, await

## 不懂的知识点
1. 回调地狱，是怎么执行的，为什么是那样执行
2. 多个 .then 是依次执行的吗
