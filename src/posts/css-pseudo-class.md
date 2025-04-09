# 伪类

CSS 伪类用于指定所选元素的特殊状态。

## 基本语法

```css
selector:pseudo-class {
  property: value;
}
```

## 伪类分类

伪类分为好多种类，按照mdn的分类，主要分为以下几类：

- 动态伪类，比如 `:hover`、`:active`、`:focus` 等
- 结构伪类，比如 `:first-child`、`:last-child`、`:nth-child()` 等
- UI伪类，比如 `:disabled`、`:checked`、`:valid` 等
- 语言伪类，比如 `:lang()` 等
- 其他伪类，比如 `:root`、`:not()`、`:empty`、`:target` 等

## 常用伪类

下面介绍几个常用的伪类：

### :hover

`:hover` 伪类用于指定当鼠标悬停在元素上时的样式。

```css
a:hover {
  color: red;
}
```

### :active

`:active` 伪类用于指定当元素被激活时的样式，比如被点击时。

```css
button:active {
  background-color: blue;
}
```

### :first-child

<!-- `:first-child` 伪类用于选择作为其父元素的第一个子元素的元素。 -->

```css
ul li:first-child {
  color: green;
}
```

### :disabled

`:disabled` 伪类用于选择禁用的元素，比如禁用的输入框或按钮。

```css
input:disabled {
  background-color: gray;
}
```

### :root

`:root` 伪类用于选择文档的根元素。对于 HTML 来说，:root 表示 `<html>` 元素，除了优先级更高之外，与 html 选择器相同。

```css
:root {
  background: yellow;
}
```

在声明全局 CSS 变量时 :root 会很有用：

```css
:root {
  --main-color: hotpink;
  --pane-padding: 5px 42px;
}
```

## 参考资料

- https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes
- https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Styling_basics/Pseudo_classes_and_elements
