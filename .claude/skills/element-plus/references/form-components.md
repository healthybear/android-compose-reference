# 表单类组件参考

## el-form

| Prop | 类型 | 默认 | 说明 |
|------|------|------|------|
| `model` | `object` | — | 表单数据对象 |
| `rules` | `FormRules` | — | 验证规则 |
| `label-width` | `string/number` | — | label 宽度，如 `"80px"` |
| `label-position` | `'left'/'right'/'top'` | `'right'` | label 位置 |
| `inline` | `boolean` | `false` | 行内表单 |
| `disabled` | `boolean` | `false` | 禁用所有表单项 |
| `scroll-to-error` | `boolean` | `false` | 验证失败时滚动到错误项 |

**Methods（通过 ref 调用）**

| 方法 | 说明 |
|------|------|
| `validate(callback)` | 验证整个表单，返回 Promise |
| `validateField(props)` | 验证指定字段 |
| `resetFields(props?)` | 重置表单（恢复初始值并清除验证） |
| `clearValidate(props?)` | 仅清除验证状态 |
| `scrollToField(prop)` | 滚动到指定字段 |

## el-form-item

| Prop | 类型 | 说明 |
|------|------|------|
| `prop` | `string` | 对应 model 的字段路径，验证必填 |
| `label` | `string` | 标签文本 |
| `rules` | `FormItemRule/[]` | 单独规则，与 form rules 合并 |
| `required` | `boolean` | 是否必填（自动加红星，但不自动验证） |
| `error` | `string` | 手动设置错误信息 |

## el-input

| Prop | 类型 | 默认 | 说明 |
|------|------|------|------|
| `v-model` | `string/number` | — | 绑定值 |
| `type` | `string` | `'text'` | `text/textarea/password/number/email` 等 |
| `placeholder` | `string` | — | 占位文本 |
| `clearable` | `boolean` | `false` | 显示清除按钮 |
| `show-password` | `boolean` | `false` | 密码可见切换 |
| `disabled` | `boolean` | `false` | 禁用 |
| `readonly` | `boolean` | `false` | 只读 |
| `size` | `'large'/'default'/'small'` | — | 尺寸 |
| `prefix-icon` | `Component` | — | 前缀图标 |
| `suffix-icon` | `Component` | — | 后缀图标 |
| `maxlength` | `number` | — | 最大长度 |
| `show-word-limit` | `boolean` | `false` | 显示字数统计（需配合 maxlength） |
| `rows` | `number` | `2` | textarea 行数 |
| `autosize` | `boolean/object` | `false` | textarea 自适应高度，`{ minRows: 2, maxRows: 6 }` |

**Slots**: `prefix` / `suffix` / `prepend` / `append`

## el-select

| Prop | 类型 | 默认 | 说明 |
|------|------|------|------|
| `v-model` | `string/number/array` | — | 绑定值，多选时为数组 |
| `multiple` | `boolean` | `false` | 多选 |
| `clearable` | `boolean` | `false` | 可清空 |
| `filterable` | `boolean` | `false` | 可搜索 |
| `remote` | `boolean` | `false` | 远程搜索 |
| `remote-method` | `Function` | — | 远程搜索方法 |
| `loading` | `boolean` | `false` | 加载中 |
| `placeholder` | `string` | `'请选择'` | 占位文本 |
| `disabled` | `boolean` | `false` | 禁用 |
| `value-key` | `string` | `'value'` | value 为对象时的唯一标识键 |
| `collapse-tags` | `boolean` | `false` | 多选时折叠 tag |
| `max-collapse-tags` | `number` | `1` | 折叠时显示的最大 tag 数 |

**el-option**

| Prop | 说明 |
|------|------|
| `value` | 选项值（类型需与 v-model 一致） |
| `label` | 显示文本 |
| `disabled` | 禁用该选项 |

## el-date-picker

| Prop | 类型 | 默认 | 说明 |
|------|------|------|------|
| `v-model` | `Date/string/array` | — | 绑定值 |
| `type` | `string` | `'date'` | `date/datetime/daterange/datetimerange/month/year/week` |
| `format` | `string` | — | 显示格式，如 `'YYYY-MM-DD'` |
| `value-format` | `string` | — | 绑定值格式，不设则为 Date 对象 |
| `placeholder` | `string` | — | 单选占位 |
| `start-placeholder` | `string` | — | 范围选择开始占位 |
| `end-placeholder` | `string` | — | 范围选择结束占位 |
| `disabled-date` | `Function` | — | `(date: Date) => boolean`，返回 true 则禁用 |
| `shortcuts` | `array` | — | 快捷选项，`[{ text: '今天', value: new Date() }]` |
| `clearable` | `boolean` | `true` | 可清空 |

## el-checkbox / el-checkbox-group

```vue
<!-- 单个 -->
<el-checkbox v-model="checked" label="选项A" />

<!-- 组 -->
<el-checkbox-group v-model="checkedList">
  <el-checkbox v-for="item in options" :key="item.value" :value="item.value">
    {{ item.label }}
  </el-checkbox>
</el-checkbox-group>
```

## el-radio / el-radio-group

```vue
<el-radio-group v-model="radio">
  <el-radio value="1">选项A</el-radio>
  <el-radio value="2">选项B</el-radio>
</el-radio-group>
```

## el-switch

| Prop | 说明 |
|------|------|
| `v-model` | `boolean/string/number` |
| `active-value` / `inactive-value` | 自定义开/关的值 |
| `active-text` / `inactive-text` | 开/关文字 |
| `loading` | 加载状态 |
| `before-change` | 切换前钩子，返回 Promise 可阻止切换 |

## el-upload

| Prop | 说明 |
|------|------|
| `action` | 上传地址 |
| `http-request` | 自定义上传方法（覆盖默认 XHR） |
| `accept` | 接受的文件类型，如 `'.jpg,.png'` |
| `multiple` | 多文件 |
| `limit` | 最大上传数量 |
| `file-list` / `v-model:file-list` | 文件列表 |
| `list-type` | `'text'/'picture'/'picture-card'` |
| `auto-upload` | 是否自动上传，默认 true |
| `on-exceed` | 超出限制回调 |
| `on-success` / `on-error` | 上传成功/失败回调 |
| `before-upload` | 上传前钩子，返回 false 可阻止 |

**自定义上传示例：**
```ts
const customUpload = async (options: UploadRequestOptions) => {
  const formData = new FormData()
  formData.append('file', options.file)
  const res = await axios.post('/api/upload', formData)
  options.onSuccess(res.data)
}
```
