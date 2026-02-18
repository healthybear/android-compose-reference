# 反馈/弹出类组件参考

## el-dialog

| Prop | 类型 | 默认 | 说明 |
|------|------|------|------|
| `v-model` | `boolean` | — | 是否显示 |
| `title` | `string` | — | 标题 |
| `width` | `string/number` | `'50%'` | 宽度 |
| `fullscreen` | `boolean` | `false` | 全屏 |
| `top` | `string` | `'15vh'` | 距顶部距离 |
| `modal` | `boolean` | `true` | 显示遮罩 |
| `close-on-click-modal` | `boolean` | `true` | 点击遮罩关闭 |
| `close-on-press-escape` | `boolean` | `true` | ESC 关闭 |
| `show-close` | `boolean` | `true` | 显示关闭按钮 |
| `before-close` | `Function` | — | 关闭前钩子，`(done) => void`，调用 done() 才关闭 |
| `destroy-on-close` | `boolean` | `false` | 关闭时销毁内容（重置表单推荐用 `@closed` 替代） |
| `draggable` | `boolean` | `false` | 可拖拽 |
| `overflow` | `boolean` | `false` | 内容超出时 dialog 本身滚动 |
| `teleported` | `boolean` | `true` | 挂载到 body |
| `z-index` | `number` | — | 自定义层级 |

**Events**: `open` / `opened`（动画完成）/ `close` / `closed`（动画完成）

**Slots**: `default`（内容）/ `header` / `footer`

> 重置表单用 `@closed` 而非 `@close`，避免关闭动画中内容闪变。

## el-drawer

与 Dialog 类似，额外 Props：

| Prop | 说明 |
|------|------|
| `direction` | `'ltr'/'rtl'/'ttb'/'btt'`，默认 `'rtl'`（右侧滑出） |
| `size` | 宽度（水平）或高度（垂直），默认 `'30%'` |
| `with-header` | 是否显示 header，默认 true |

## ElMessage（函数调用）

```ts
import { ElMessage } from 'element-plus'

ElMessage.success('操作成功')
ElMessage.error('操作失败')
ElMessage.warning('请注意')
ElMessage.info('提示信息')

// 完整配置
ElMessage({
  message: '自定义消息',
  type: 'success',
  duration: 3000,       // 显示时长，0 不自动关闭
  showClose: true,      // 显示关闭按钮
  grouping: true,       // 相同内容合并
  plain: true,          // 朴素样式
})
```

## ElMessageBox（函数调用）

```ts
import { ElMessageBox } from 'element-plus'

// 确认框
await ElMessageBox.confirm('确定删除吗？', '提示', {
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  type: 'warning',
})

// 输入框
const { value } = await ElMessageBox.prompt('请输入名称', '提示', {
  inputPattern: /\S+/,
  inputErrorMessage: '不能为空',
})

// 捕获取消
try {
  await ElMessageBox.confirm('...')
  // 确认逻辑
} catch {
  // 用户取消，忽略
}
```

## ElNotification（函数调用）

```ts
import { ElNotification } from 'element-plus'

ElNotification({
  title: '标题',
  message: '通知内容',
  type: 'success',       // success/warning/info/error
  position: 'top-right', // top-right/top-left/bottom-right/bottom-left
  duration: 4500,
  onClick: () => {},
})
```

## el-tooltip

| Prop | 说明 |
|------|------|
| `content` | 提示内容 |
| `placement` | 位置，`'top'/'bottom'/'left'/'right'` 及其变体 |
| `trigger` | `'hover'/'click'/'focus'/'contextmenu'`，默认 hover |
| `effect` | `'dark'/'light'`，默认 dark |
| `disabled` | 禁用 |
| `teleported` | 挂载到 body，默认 true；在 Dialog 内失效时设为 false |
| `show-after` | 延迟显示（ms） |
| `hide-after` | 延迟隐藏（ms） |

## el-popover

| Prop | 说明 |
|------|------|
| `v-model:visible` | 手动控制显示 |
| `trigger` | `'hover'/'click'/'focus'/'contextmenu'` |
| `title` | 标题 |
| `content` | 内容（也可用 slot） |
| `width` | 宽度 |
| `placement` | 位置 |

```vue
<el-popover placement="top" :width="200" trigger="click">
  <template #reference>
    <el-button>点击</el-button>
  </template>
  <p>弹出内容</p>
</el-popover>
```

## el-loading（指令 & 服务）

```vue
<!-- 指令 -->
<div v-loading="isLoading" element-loading-text="加载中...">...</div>

<!-- 全屏 loading -->
<div v-loading.fullscreen.lock="isLoading">...</div>
```

```ts
// 服务方式
import { ElLoading } from 'element-plus'
const loading = ElLoading.service({ fullscreen: true, text: '加载中' })
loading.close()
```

## el-skeleton

```vue
<el-skeleton :rows="5" animated v-if="loading" />
<div v-else>实际内容</div>
```

## el-progress

| Prop | 说明 |
|------|------|
| `percentage` | 进度 0-100 |
| `type` | `'line'/'circle'/'dashboard'` |
| `status` | `'success'/'exception'/'warning'` |
| `stroke-width` | 线宽 |
| `text-inside` | 进度条内显示文字（line 类型） |
| `format` | 自定义文字，`(percentage) => string` |
