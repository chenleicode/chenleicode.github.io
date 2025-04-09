# 伪元素

选中元素的一些特殊位置

## 常用伪元素

### ::before 和 ::after

- 作用：在元素内容的前面（::before）或后面（::after）插入生成的内容。
- 关键点：
  - `content` 属性是必须的，且不能省略。
  - 常用于添加装饰性图标、清除浮动或视觉特效。
- 示例：

```css
span::before {
  content: "$";
  color: red;
}
```

### ::first-letter

- 作用：选中元素的第一个字母。
- 示例：

```css
p::first-letter {
  font-size: 2em;
  font-weight: bold;
}
```

### ::first-line

- 作用：选中元素的第一行文本。
- 示例：

```css
p::first-line {
  font-weight: bold;
  color: blue;
}
```

### ::selection

- 作用：选中用户选中的文本。
- 注意：safari 和 IE 不支持。
- 示例：

```css
::selection {
  background: yellow;
  color: black;
}
```

## 注意事项

- CSS3 引入了双冒号标记法(`::`)，以将伪类和伪元素区别开。部分旧伪元素支持单冒号 `:`，但推荐统一使用 `::`
- 伪元素生成的内容通常不会被屏幕阅读器读取，避免用于关键信息。
- 伪类 vs. 伪元素：伪类（如 :hover）基于元素状态，而伪元素选择元素的特定部分。

## 参考资料

- https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-elements
- https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Styling_basics/Pseudo_classes_and_elements