# DragSort 拖拽排序
用于列表、宫格等场景的拖拽排序组件。

---$

### 代码演示

#### 基础用法
- 通过 `v-model` 传入待排序列表
- 通过具名插槽 `item` 自定义每一项的展示内容

```html
<template>
    <ste-drag-sort v-model="basicList">
        <template v-slot:item="{ item, index }">
            <view class="demo-card-item">{{ index + 1 }}. {{ item.text }}</view>
        </template>
    </ste-drag-sort>
</template>
<script>
export default {
    data() {
        return {
            basicList: [{ text: '商品 A' }, { text: '商品 B' }, { text: '商品 C' }],
        };
    },
};
</script>
<style>
.demo-card-item {
    padding: 24rpx;
    margin-bottom: 16rpx;
    border-radius: 16rpx;
    background: #f5f7fa;
}
</style>
```

#### 网格排序
- `columns` 大于 `1` 时会按网格布局排序
- 网格类纯拖拽场景可按需要设置 `:longPress="false"`

```html
<template>
    <ste-drag-sort v-model="gridList" :columns="3" :longPress="false">
        <template v-slot:item="{ item }">
            <view class="grid-item">{{ item.text }}</view>
        </template>
    </ste-drag-sort>
</template>
<script>
export default {
    data() {
        return {
            gridList: [{ text: '1' }, { text: '2' }, { text: '3' }, { text: '4' }, { text: '5' }, { text: '6' }],
        };
    },
};
</script>
<style>
.grid-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120rpx;
    margin: 12rpx;
    border-radius: 16rpx;
    background: #eef3ff;
}
</style>
```

#### 禁用单项拖拽
- 列表项数据中可直接写 `disabled: true`
- 被禁用项会保留展示，但不能被拖拽

```html
<template>
    <ste-drag-sort v-model="disabledList">
        <template v-slot:item="{ item }">
            <view class="demo-card-item" :style="{ opacity: item.disabled ? 0.5 : 1 }">{{ item.text }}</view>
        </template>
    </ste-drag-sort>
</template>
<script>
export default {
    data() {
        return {
            disabledList: [{ text: '固定在这里', disabled: true }, { text: '可拖拽 1' }, { text: '可拖拽 2' }],
        };
    },
};
</script>
```

---$

### API

#### Props

| 参数         | 说明                                                                                                   | 类型      | 默认值  | 可选值 | 支持版本 |
| ---          | ---                                                                                                    | ---       | ---     | ---    | ---      |
| `value`      | 拖拽数据列表，支持 v-model 双向绑定                                                                    | `Array`   | `[]`    | -      | -        |
| `disabled`   | 是否禁用拖拽功能                                                                                       | `Boolean` | `false` | -      | -        |
| `columns`    | 列数，1 为纵向列表，大于 1 为网格排序                                                                  | `Number`  | `1`     | -      | -        |
| `longPress`  | 拖拽启动方式。true 为长按后开始拖拽，适合列表和可滚动页面；false 为按下立即拖拽，适合网格和纯排序面板 | `Boolean` | `true`  | -      | -        |

#### Events

| 事件名   | 说明                   | 事件参数                    | 支持版本 |
| ---      | ---                    | ---                         | ---      |
| `start`  | 开始拖拽时触发         | `index`：当前拖拽项索引     | -        |
| `change` | 排序结果发生变化时触发 | `list`：最新排序结果        | -        |
| `end`    | 拖拽结束时触发         | `index`：最终落点索引       | -        |

#### Slots

| 插槽名 | 说明           | 插槽参数                                                                                                                                                  | 支持版本 |
| ---    | ---            | ---                                                                                                                                                       | ---      |
| `item` | 单个拖拽项内容 | `item`：当前项数据<br/>`index`：当前项索引<br/>`dragging`：当前是否处于拖拽中<br/>`dragIndex`：当前拖拽项索引<br/>`insertIndex`：当前插入位置索引 | -        |

---$
{{fuyuwei}}
