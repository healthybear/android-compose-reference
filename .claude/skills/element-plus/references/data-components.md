# 数据展示类组件参考

## el-table

| Prop | 类型 | 默认 | 说明 |
|------|------|------|------|
| `data` | `array` | `[]` | 表格数据 |
| `height` | `string/number` | — | 固定高度，超出滚动 |
| `max-height` | `string/number` | — | 最大高度 |
| `stripe` | `boolean` | `false` | 斑马纹 |
| `border` | `boolean` | `false` | 纵向边框 |
| `size` | `'large'/'default'/'small'` | — | 尺寸 |
| `fit` | `boolean` | `true` | 列宽自适应 |
| `show-header` | `boolean` | `true` | 显示表头 |
| `highlight-current-row` | `boolean` | `false` | 高亮当前行 |
| `row-key` | `string/Function` | — | 行数据唯一键，树形/懒加载必填 |
| `default-expand-all` | `boolean` | `false` | 默认展开所有行 |
| `v-loading` | `boolean` | — | 加载状态（指令） |
| `empty-text` | `string` | `'暂无数据'` | 空数据文本 |
| `span-method` | `Function` | — | 合并行列，`({ row, column, rowIndex, columnIndex }) => [rowspan, colspan]` |
| `summary-method` | `Function` | — | 自定义合计行 |
| `show-summary` | `boolean` | `false` | 显示合计行 |

**Events**

| 事件 | 说明 |
|------|------|
| `selection-change` | 多选变化，参数为选中行数组 |
| `sort-change` | 排序变化，`{ column, prop, order }` |
| `row-click` | 行点击，`(row, column, event)` |
| `row-dblclick` | 行双击 |
| `current-change` | 当前行变化（highlight-current-row 时） |
| `expand-change` | 行展开/收起 |

**Methods（ref 调用）**

| 方法 | 说明 |
|------|------|
| `clearSelection()` | 清空多选 |
| `toggleRowSelection(row, selected?)` | 切换行选中状态 |
| `toggleAllSelection()` | 全选/取消全选 |
| `setCurrentRow(row)` | 设置当前行 |
| `clearSort()` | 清空排序 |
| `doLayout()` | 重新布局（父容器变化后调用） |

## el-table-column

| Prop | 类型 | 说明 |
|------|------|------|
| `prop` | `string` | 对应 data 的字段名 |
| `label` | `string` | 列标题 |
| `width` | `string/number` | 列宽 |
| `min-width` | `string/number` | 最小列宽 |
| `fixed` | `'left'/'right'/boolean` | 固定列 |
| `sortable` | `boolean/'custom'` | 排序，`'custom'` 为自定义排序 |
| `type` | `'selection'/'index'/'expand'` | 特殊列类型 |
| `align` | `'left'/'center'/'right'` | 对齐方式 |
| `show-overflow-tooltip` | `boolean` | 超出显示 tooltip |
| `formatter` | `Function` | `(row, column, value, index) => string` |

**Slots**: `default`（自定义内容，`{ row, column, $index }`）/ `header`（自定义表头）

## el-pagination

| Prop | 类型 | 默认 | 说明 |
|------|------|------|------|
| `v-model:current-page` | `number` | `1` | 当前页 |
| `v-model:page-size` | `number` | `10` | 每页条数 |
| `total` | `number` | — | 总条数 |
| `page-sizes` | `number[]` | `[10,20,50,100]` | 每页条数选项 |
| `layout` | `string` | `'prev,pager,next'` | 组件布局，常用 `'total, sizes, prev, pager, next, jumper'` |
| `background` | `boolean` | `false` | 按钮有背景色 |
| `small` | `boolean` | `false` | 小型分页 |
| `disabled` | `boolean` | `false` | 禁用 |
| `hide-on-single-page` | `boolean` | `false` | 只有一页时隐藏 |

**Events**: `change(currentPage, pageSize)` / `current-change` / `size-change`

## el-tree

| Prop | 类型 | 说明 |
|------|------|------|
| `data` | `array` | 树形数据 |
| `props` | `object` | 字段映射，`{ label: 'name', children: 'children', disabled: 'disabled' }` |
| `node-key` | `string` | 节点唯一标识字段 |
| `show-checkbox` | `boolean` | 显示复选框 |
| `default-expand-all` | `boolean` | 默认展开所有 |
| `default-expanded-keys` | `array` | 默认展开的节点 key |
| `default-checked-keys` | `array` | 默认选中的节点 key |
| `lazy` | `boolean` | 懒加载 |
| `load` | `Function` | 懒加载方法 |
| `filter-node-method` | `Function` | 过滤节点方法 |
| `highlight-current` | `boolean` | 高亮当前节点 |
| `draggable` | `boolean` | 可拖拽 |

**Methods**: `filter(value)` / `getCheckedKeys()` / `setCheckedKeys(keys)` / `getCheckedNodes()`

## el-tag

| Prop | 说明 |
|------|------|
| `type` | `'success'/'info'/'warning'/'danger'` |
| `size` | `'large'/'default'/'small'` |
| `closable` | 可关闭，配合 `@close` |
| `effect` | `'dark'/'light'/'plain'` |
| `round` | 圆形 |
| `color` | 自定义背景色 |

## el-descriptions

```vue
<el-descriptions title="用户信息" :column="2" border>
  <el-descriptions-item label="姓名">张三</el-descriptions-item>
  <el-descriptions-item label="手机号">138xxxx</el-descriptions-item>
  <el-descriptions-item label="备注" :span="2">...</el-descriptions-item>
</el-descriptions>
```

| Prop | 说明 |
|------|------|
| `column` | 每行列数，默认 3 |
| `direction` | `'horizontal'/'vertical'` |
| `border` | 显示边框 |
| `size` | 尺寸 |

## el-image

| Prop | 说明 |
|------|------|
| `src` | 图片地址 |
| `fit` | `'fill'/'contain'/'cover'/'none'/'scale-down'` |
| `lazy` | 懒加载 |
| `preview-src-list` | 预览图片列表，设置后点击可预览 |
| `initial-index` | 预览初始索引 |
| `preview-teleported` | 预览挂载到 body |

## el-statistic

```vue
<el-statistic title="日活用户" :value="12345" suffix="人">
  <template #prefix><el-icon><User /></el-icon></template>
</el-statistic>
```

## el-timeline

```vue
<el-timeline>
  <el-timeline-item
    v-for="item in activities"
    :key="item.id"
    :timestamp="item.time"
    :type="item.type"
  >
    {{ item.content }}
  </el-timeline-item>
</el-timeline>
```
