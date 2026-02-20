package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Person
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

/**
 * InputChipDemo 演示 Material3 InputChip 的用法。
 *
 * InputChip 代表用户已输入或选择的值，例如邮件收件人、搜索标签等。
 * 通常带有删除按钮（trailingIcon），允许用户移除该条目。
 *
 * 核心参数：
 * - `selected`：选中状态（InputChip 通常固定为 false，不需要选中语义）
 * - `onClick`：点击回调
 * - `label`：标签内容
 * - `leadingIcon`：前置图标（通常是头像或类型图标）
 * - `trailingIcon`：后置图标（通常是删除按钮 IconButton + Close 图标）
 *
 * 删除模式：
 * 在 trailingIcon 中放置 IconButton，点击时从列表中移除对应项。
 * 使用 `mutableStateListOf` 管理列表，增删操作自动触发重组。
 * 遍历时用 `toList()` 创建快照，避免并发修改异常。
 */
@Composable
fun InputChipDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("InputChip 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 可删除标签列表 ─────────────────────────────────
        SectionLabel("可删除标签列表")
        val tags = remember {
            mutableStateListOf("Jetpack Compose", "Kotlin", "Material3", "Android", "Wasm")
        }

        if (tags.isEmpty()) {
            Text("所有标签已删除", style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant)
        } else {
            FlowRow(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                tags.toList().forEach { tag ->
                    InputChip(
                        selected = false,
                        onClick = {},
                        label = { Text(tag) },
                        trailingIcon = {
                            IconButton(
                                onClick = { tags.remove(tag) },
                                modifier = Modifier.size(InputChipDefaults.IconSize)
                            ) {
                                Icon(Icons.Filled.Close, contentDescription = "删除 $tag",
                                    modifier = Modifier.size(InputChipDefaults.IconSize))
                            }
                        }
                    )
                }
            }
        }
        Button(
            onClick = {
                if (tags.size < 5) tags.add("标签 ${tags.size + 1}")
            },
            enabled = tags.size < 5
        ) { Text("添加标签") }

        HorizontalDivider()

        // ── 2. 带头像图标 ─────────────────────────────────────
        SectionLabel("leadingIcon — 联系人标签")
        val contacts = remember {
            mutableStateListOf("Alice", "Bob", "Carol")
        }
        FlowRow(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            contacts.toList().forEach { name ->
                InputChip(
                    selected = false,
                    onClick = {},
                    label = { Text(name) },
                    leadingIcon = {
                        Icon(Icons.Filled.Person, contentDescription = null,
                            modifier = Modifier.size(InputChipDefaults.IconSize))
                    },
                    trailingIcon = {
                        IconButton(
                            onClick = { contacts.remove(name) },
                            modifier = Modifier.size(InputChipDefaults.IconSize)
                        ) {
                            Icon(Icons.Filled.Close, contentDescription = "移除 $name",
                                modifier = Modifier.size(InputChipDefaults.IconSize))
                        }
                    }
                )
            }
        }

        HorizontalDivider()

        SectionLabel("说明")
        Text(
            "InputChip 代表用户输入的值（如收件人、标签），\n通常带有删除按钮，点击 trailingIcon 可移除。",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}
