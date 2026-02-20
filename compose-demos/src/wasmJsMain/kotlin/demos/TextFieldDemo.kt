package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

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
