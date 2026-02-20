package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

/**
 * OutlinedTextFieldDemo 演示 Material3 OutlinedTextField（轮廓样式）的核心用法。
 *
 * OutlinedTextField 与 TextField 功能完全相同，区别仅在于视觉样式：
 * 使用边框轮廓代替底部下划线，背景透明，更适合卡片、对话框等浅色背景场景。
 *
 * 核心参数（与 TextField 完全一致）：
 * - `value` / `onValueChange`：受控输入
 * - `label`：浮动标签（聚焦时嵌入边框顶部）
 * - `placeholder`：占位文字
 * - `leadingIcon` / `trailingIcon`：前置/后置图标
 * - `isError`：错误状态（边框变为 error 颜色）
 * - `supportingText`：底部辅助/错误文字
 * - `keyboardOptions`：键盘类型（数字、邮箱、密码等）
 * - `visualTransformation`：视觉变换（如 PasswordVisualTransformation 隐藏密码）
 */
@Composable
fun OutlinedTextFieldDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("OutlinedTextField 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 基础 ───────────────────────────────────────────
        SectionLabel("基础 OutlinedTextField")
        var text1 by remember { mutableStateOf("") }
        OutlinedTextField(
            value = text1,
            onValueChange = { text1 = it },
            label = { Text("标签") },
            modifier = Modifier.fillMaxWidth()
        )

        HorizontalDivider()

        // ── 2. placeholder ────────────────────────────────────
        SectionLabel("placeholder")
        var text2 by remember { mutableStateOf("") }
        OutlinedTextField(
            value = text2,
            onValueChange = { text2 = it },
            placeholder = { Text("请输入内容…") },
            modifier = Modifier.fillMaxWidth()
        )

        HorizontalDivider()

        // ── 3. leadingIcon / trailingIcon ─────────────────────
        SectionLabel("leadingIcon / trailingIcon")
        var password by remember { mutableStateOf("") }
        var visible by remember { mutableStateOf(false) }
        OutlinedTextField(
            value = password,
            onValueChange = { password = it },
            label = { Text("密码") },
            leadingIcon = { Icon(Icons.Filled.Lock, contentDescription = null) },
            trailingIcon = {
                IconButton(onClick = { visible = !visible }) {
                    Icon(
                        if (visible) Icons.Filled.Visibility else Icons.Filled.VisibilityOff,
                        contentDescription = if (visible) "隐藏密码" else "显示密码"
                    )
                }
            },
            visualTransformation = if (visible)
                androidx.compose.ui.text.input.VisualTransformation.None
            else
                androidx.compose.ui.text.input.PasswordVisualTransformation(),
            modifier = Modifier.fillMaxWidth()
        )

        HorizontalDivider()

        // ── 4. error 状态 ─────────────────────────────────────
        SectionLabel("error 状态")
        var username by remember { mutableStateOf("") }
        val isError = username.isNotEmpty() && username.length < 3
        OutlinedTextField(
            value = username,
            onValueChange = { username = it },
            label = { Text("用户名") },
            isError = isError,
            supportingText = {
                if (isError) Text("用户名至少 3 个字符")
                else if (username.isNotEmpty()) Text("✓ 格式正确")
            },
            modifier = Modifier.fillMaxWidth()
        )

        HorizontalDivider()

        // ── 5. 字数统计 ───────────────────────────────────────
        SectionLabel("字数统计 + 多行")
        val maxLen = 100
        var content by remember { mutableStateOf("") }
        OutlinedTextField(
            value = content,
            onValueChange = { if (it.length <= maxLen) content = it },
            label = { Text("内容") },
            supportingText = { Text("${content.length} / $maxLen") },
            minLines = 3,
            maxLines = 5,
            modifier = Modifier.fillMaxWidth()
        )
    }
}
