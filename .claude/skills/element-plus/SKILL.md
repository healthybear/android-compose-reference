---
name: element-plus
description: >
  Element Plus v2.x 专项辅助 skill，用于 Vue 3 项目开发。覆盖以下场景，遇到这些需求时优先触发：
  (1) 查询组件 Props / Events / Slots / Exposes（如"el-table 有哪些属性"）
  (2) 生成组件代码（如"帮我写一个带分页的 el-table"、"用 el-form 做登录表单"）
  (3) 排查组件问题（如"el-select v-model 不生效"、"el-dialog 关闭后状态没重置"）
  (4) 主题与样式定制（如"覆盖 el-button 颜色"、"CSS 变量怎么用"）
  (5) 场景推荐（如"当前场景用哪个组件合适"、"el-table 和 el-descriptions 怎么选"）
  项目版本：Element Plus 2.9.0 + Vue 3 + TypeScript + Vite + pnpm
---

# Element Plus 开发辅助

项目版本：**Element Plus 2.9.0**，Vue 3 + TypeScript + Vite + pnpm + VueUse + Day.js + Sass。

## 快速参考

### 组件分类速查

| 分类 | 常用组件 |
|------|---------|
| 布局 | Container / Layout(Row+Col) / Space / Divider / Scrollbar |
| 导航 | Menu / Tabs / Breadcrumb / Pagination / Steps / Anchor |
| 表单 | Form / Input / Select / DatePicker / TimePicker / Checkbox / Radio / Switch / Slider / Upload / Rate / ColorPicker / Transfer |
| 数据展示 | Table / Tree / Tag / Badge / Avatar / Image / Descriptions / Result / Statistic / Timeline / Tour |
| 反馈 | Dialog / Drawer / Message / MessageBox / Notification / Popover / Tooltip / Loading / Skeleton / Empty / Progress |
| 其他 | Card / Collapse / Carousel / Calendar / InfiniteScroll / Backtop / Watermark / Segmented |

### 场景 → 组件推荐

| 场景 | 推荐组件 | 备注 |
|------|---------|------|
| 列表展示 + 排序/筛选 | `el-table` | 数据量大用虚拟滚动 `el-table-v2` |
| 键值对详情展示 | `el-descriptions` | 替代纯文本布局 |
| 树形数据 | `el-tree` / `el-tree-select` | 可选择时用 tree-select |
| 多步骤流程 | `el-steps` + `el-form` | 每步一个 form |
| 弹出确认 | `ElMessageBox.confirm` | 轻量，无需 Dialog |
| 全局提示 | `ElMessage` | 成功/错误/警告 |
| 侧滑面板 | `el-drawer` | 比 Dialog 更适合详情编辑 |
| 日期范围选择 | `el-date-picker` type="daterange" | 配合 Day.js 格式化 |
| 文件上传 | `el-upload` | 配合 action 或自定义 http-request |

---

## 代码模式

### Form 表单（含验证）

```vue
<el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
  <el-form-item label="用户名" prop="username">
    <el-input v-model="form.username" />
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submit">提交</el-button>
  </el-form-item>
</el-form>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
const formRef = ref<FormInstance>()
const form = reactive({ username: '' })
const rules: FormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
}
const submit = () => formRef.value?.validate(valid => { if (valid) { /* submit */ } })
</script>
```

### Table 带分页

```vue
<el-table :data="tableData" v-loading="loading">
  <el-table-column prop="name" label="名称" sortable />
  <el-table-column label="操作" width="120">
    <template #default="{ row }">
      <el-button size="small" @click="handleEdit(row)">编辑</el-button>
    </template>
  </el-table-column>
</el-table>
<el-pagination
  v-model:current-page="page"
  v-model:page-size="pageSize"
  :total="total"
  layout="total, sizes, prev, pager, next"
  @change="fetchData"
/>
```

### Dialog（防止关闭后状态残留）

```vue
<el-dialog v-model="visible" title="标题" @closed="resetForm">
  <el-form ref="dialogFormRef" :model="form">...</el-form>
  <template #footer>
    <el-button @click="visible = false">取消</el-button>
    <el-button type="primary" @click="confirm">确认</el-button>
  </template>
</el-dialog>
```
> 用 `@closed`（动画结束后）而非 `@close` 重置，避免关闭动画中看到内容闪变。

### Day.js 与 DatePicker 配合

```ts
import dayjs from 'dayjs'
// el-date-picker 返回 Date 对象，格式化用 dayjs
const formatted = dayjs(date).format('YYYY-MM-DD')
// 限制可选范围
const disabledDate = (date: Date) => dayjs(date).isAfter(dayjs())
```

---

## 样式定制

### CSS 变量覆盖（推荐方式）

```scss
// 全局覆盖
:root {
  --el-color-primary: #6366f1;
  --el-border-radius-base: 6px;
}

// 暗色模式
html.dark {
  --el-bg-color: #1a1a2e;
}
```

### 组件级 scoped 覆盖

```scss
// 必须用 :deep() 穿透 scoped
.my-table :deep(.el-table__header) {
  background: var(--el-fill-color-light);
}
```

### 常用 CSS 变量

| 变量 | 用途 |
|------|------|
| `--el-color-primary` | 主色 |
| `--el-bg-color` | 背景色 |
| `--el-bg-color-overlay` | 浮层背景 |
| `--el-text-color-primary` | 主文字色 |
| `--el-text-color-secondary` | 次要文字 |
| `--el-border-color` | 边框色 |
| `--el-fill-color-light` | 浅填充色 |
| `--el-border-radius-base` | 基础圆角 |

---

## 常见问题

| 问题 | 原因 | 解决 |
|------|------|------|
| `v-model` 不生效 | 绑定了对象属性但未用 `reactive`/`ref` | 确保响应式，或用 `.value` |
| `el-select` 选项不显示 | `value` 类型不匹配（string vs number） | 统一类型，或加 `:value="String(item.id)"` |
| Dialog 关闭后表单有残留 | 用了 `@close` 而非 `@closed` | 改用 `@closed` 回调重置 |
| Table 列宽不生效 | 父容器没有固定宽度 | 给 `el-table` 加 `width="100%"` 或固定父容器 |
| DatePicker 格式化不对 | `value-format` 未设置 | 加 `value-format="YYYY-MM-DD"` |
| Upload 自定义请求 | 默认用 XHR，需要 axios | 用 `:http-request` 覆盖上传方法 |
| Tooltip 在 Dialog 内消失 | `teleported` 默认挂到 body | 加 `:teleported="false"` |

---

## 详细参考

需要某个组件的完整 Props / Events / Slots 时，读取对应参考文件：

- 表单类组件：[references/form-components.md](references/form-components.md)
- 数据展示类：[references/data-components.md](references/data-components.md)
- 反馈/弹出类：[references/feedback-components.md](references/feedback-components.md)
