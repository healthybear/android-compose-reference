package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

/**
 * TextFieldDemo 演示 Material3 TextField（填充样式）的核心用法。
 *
 * TextField 是 Material3 中的文本输入组件，默认使用填充（Filled）样式，
 * 底部有下划线，背景为 surfaceVariant 色。
 *
 * 核心参数：
 * - `value` / `onValueChange`：受控输入，状态由外部持有
 * - `label`：浮动标签，聚焦时上移，未聚焦且无内容时作为占位提示
 * - `placeholder`：占位文字，仅在聚焦且无内容时显示（与 label 互补）
 * - `leadingIcon` / `trailingIcon`：前置/后置图标插槽
 * - `isError`：错误状态，将边框和标签变为 error 颜色
 * - `supportingText`：底部辅助文字，可用于显示错误信息或字数统计
 * - `singleLine`：单行模式，回车键触发 IME Action 而非换行
 *
 * 与 OutlinedTextField 的区别：样式不同，功能参数完全一致。
 */
@Composable
fun TextFieldDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("TextField 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 基础 ───────────────────────────────────────────
        SectionLabel("基础 TextField")
        var text1 by remember { mutableStateOf("") }
        TextField(
            value = text1,
            onValueChange = { text1 = it },
            label = { Text("标签") },
            modifier = Modifier.fillMaxWidth()
        )

        HorizontalDivider()

        // ── 2. placeholder ────────────────────────────────────
        SectionLabel("placeholder")
        var text2 by remember { mutableStateOf("") }
        TextField(
            value = text2,
            onValueChange = { text2 = it },
            placeholder = { Text("请输入内容…") },
            modifier = Modifier.fillMaxWidth()
        )

        HorizontalDivider()

        // ── 3. leadingIcon / trailingIcon ─────────────────────
        SectionLabel("leadingIcon / trailingIcon")
        var search by remember { mutableStateOf("") }
        TextField(
            value = search,
            onValueChange = { search = it },
            label = { Text("搜索") },
            leadingIcon = { Icon(Icons.Filled.Search, contentDescription = null) },
            trailingIcon = {
                if (search.isNotEmpty()) {
                    IconButton(onClick = { search = "" }) {
                        Icon(Icons.Filled.Close, contentDescription = "清空")
                    }
                }
            },
            modifier = Modifier.fillMaxWidth()
        )

        HorizontalDivider()

        // ── 4. error 状态 ─────────────────────────────────────
        SectionLabel("error 状态")
        var email by remember { mutableStateOf("") }
        val isError = email.isNotEmpty() && !email.contains("@")
        TextField(
            value = email,
            onValueChange = { email = it },
            label = { Text("邮箱") },
            isError = isError,
            supportingText = {
                if (isError) Text("请输入有效的邮箱地址")
                else Text("示例：user@example.com")
            },
            trailingIcon = {
                if (isError) Icon(Icons.Filled.Warning, contentDescription = null,
                    tint = MaterialTheme.colorScheme.error)
            },
            modifier = Modifier.fillMaxWidth()
        )

        HorizontalDivider()

        // ── 5. 字数统计 ───────────────────────────────────────
        SectionLabel("字数统计")
        val maxLen = 50
        var bio by remember { mutableStateOf("") }
        TextField(
            value = bio,
            onValueChange = { if (it.length <= maxLen) bio = it },
            label = { Text("个人简介") },
            supportingText = { Text("${bio.length} / $maxLen") },
            modifier = Modifier.fillMaxWidth()
        )
    }
}
