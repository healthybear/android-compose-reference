package demos

import androidx.compose.animation.animateColorAsState
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

@Composable
fun SwipeToDismissDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("SwipeToDismiss 示例", style = MaterialTheme.typography.titleMedium)

        SectionLabel("说明")
        Text(
            "向左滑动列表项可触发删除操作。",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        HorizontalDivider()

        // ── 左滑删除列表 ──────────────────────────────────────
        SectionLabel("左滑删除列表项")
        val items = remember {
            mutableStateListOf("Jetpack Compose", "Kotlin", "Material3", "Android", "Coroutines")
        }

        if (items.isEmpty()) {
            Text("所有项目已删除", style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant)
            Button(onClick = {
                items.addAll(listOf("Jetpack Compose", "Kotlin", "Material3", "Android", "Coroutines"))
            }) { Text("重置列表") }
        } else {
            Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                items.toList().forEach { item ->
                    val dismissState = rememberSwipeToDismissBoxState(
                        confirmValueChange = { value ->
                            if (value == SwipeToDismissBoxValue.EndToStart) {
                                items.remove(item)
                                true
                            } else false
                        }
                    )

                    SwipeToDismissBox(
                        state = dismissState,
                        enableDismissFromStartToEnd = false,
                        backgroundContent = {
                            val color by animateColorAsState(
                                targetValue = when (dismissState.targetValue) {
                                    SwipeToDismissBoxValue.EndToStart -> MaterialTheme.colorScheme.errorContainer
                                    else -> Color.Transparent
                                },
                                label = "swipe_bg"
                            )
                            Box(
                                modifier = Modifier
                                    .fillMaxSize()
                                    .background(color, androidx.compose.foundation.shape.RoundedCornerShape(8.dp))
                                    .padding(end = 16.dp),
                                contentAlignment = Alignment.CenterEnd
                            ) {
                                Icon(
                                    Icons.Filled.Delete,
                                    contentDescription = "删除",
                                    tint = MaterialTheme.colorScheme.onErrorContainer
                                )
                            }
                        }
                    ) {
                        Card(modifier = Modifier.fillMaxWidth()) {
                            ListItem(
                                headlineContent = { Text(item) },
                                trailingContent = {
                                    Text("← 左滑删除", style = MaterialTheme.typography.labelSmall,
                                        color = MaterialTheme.colorScheme.onSurfaceVariant)
                                }
                            )
                        }
                    }
                }
            }
            Spacer(Modifier.height(4.dp))
            TextButton(onClick = {
                items.clear()
                items.addAll(listOf("Jetpack Compose", "Kotlin", "Material3", "Android", "Coroutines"))
            }) { Text("重置列表") }
        }
    }
}
