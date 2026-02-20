package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

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
