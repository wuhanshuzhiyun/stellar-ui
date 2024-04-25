# NoticeBar 公告栏

用于循环播放展示一组消息通知。

{{compatibility}}

### 代码演示
JavaScript后面的演示代码中涉及到的变量和方法都使用本javasaript代码
```javascript
```

#### 基础用法
通过`list`数组参数设置需要滚动的内容。
```
<ste-notice-bar :list="list"></ste-notice-bar>
```

#### 自定义样式
- 通过 `color` 属性设置文字颜色，默认为 `#000000`。 
- 通过 `background` 属性设置背景，默认为 `#ffffff`。 
- 通过 `width` 属性设置宽度，默认为 `100%`，继承父属性。 
```
<ste-notice-bar :list="list" background="#FBF8DC" color="red" :width="400"></ste-notice-bar>
```