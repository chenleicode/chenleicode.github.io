# `val => {foo = val} 和 val => (foo = val)`

在JavaScript中，箭头函数（Arrow Functions）有一些语法细节需要注意，尤其是当你使用大括号 `{}` 或圆括号 `()` 来定义函数体时。`val => {foo = val}` 和 `val => (foo = val)` 是两个不同的箭头函数表达式，它们的行为也有所不同。

## `val => {foo = val}`

### 解释：
当你在箭头函数中使用大括号 `{}` 时，这意味着你在定义一个“函数体”（function body）。在这种情况下，如果你要返回一个值，必须使用 `return` 语句。

### 示例：

```javascript
const example = val => { foo = val; };
```

### 工作原理：
- 这个箭头函数接收一个参数 `val`。
- `foo = val;` 是一个赋值语句，它将 `val` 的值赋给 `foo`。
- 由于使用了大括号 `{}`，这个箭头函数没有隐式返回值。如果你想要返回一个值，你需要显式使用 `return`。

```javascript
const example = val => {
  foo = val;
  return foo;
};
```

## `val => (foo = val)`

### 解释：
当你在箭头函数中使用圆括号 `()` 时，这意味着你在定义一个“隐式返回值”（implicit return）。这是一种简写形式，箭头函数会自动返回圆括号中的表达式结果。

### 示例：

```javascript
const example = val => (foo = val);
```

### 工作原理：
- 这个箭头函数接收一个参数 `val`。
- `foo = val` 是一个赋值表达式，它将 `val` 的值赋给 `foo`，并返回该值。
- 由于使用了圆括号 `()`，这个箭头函数会隐式返回 `foo = val` 的结果。

## 对比

1. **函数体 vs. 隐式返回**：
   - `val => {foo = val}`：使用大括号表示函数体，需要显式使用 `return` 返回值。
   - `val => (foo = val)`：使用圆括号表示隐式返回，自动返回圆括号中的表达式结果。

2. **语法用途**：
   - `val => {foo = val}`：适用于有多行逻辑或需要显式返回值的函数。
   - `val => (foo = val)`：适用于单行逻辑并且直接返回结果的函数。

## 示例和对比

### `val => {foo = val}`

```javascript
let foo;
const example = val => { foo = val; };

example(42);
console.log(foo); // 42
```

在这个例子中，箭头函数 `example` 将 `val` 赋值给 `foo`，但没有返回值。

### `val => (foo = val)`

```javascript
let foo;
const example = val => (foo = val);

const result = example(42);
console.log(foo);    // 42
console.log(result); // 42
```

在这个例子中，箭头函数 `example` 将 `val` 赋值给 `foo`，并且返回赋值表达式的结果，所以 `result` 也是 `42`。

## 结论

- 使用 `{}` 定义的箭头函数适用于多行语句，需要显式返回值。
- 使用 `()` 定义的箭头函数适用于单行语句，并且自动返回表达式的结果。

根据具体的需求和代码复杂度选择合适的箭头函数语法。
