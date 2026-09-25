package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

/**
 * ModalBottomSheetDemo 演示 Material3 ModalBottomSheet 的用法。
 *
 * ModalBottomSheet 是从底部弹出的模态对话框，常用于展示选项列表或详细信息。
 *
 * 核心参数：
 * - `onDismissRequest`：点击外部或滑动关闭时的回调
 * - `sheetState`：控制底部表单状态（显示/隐藏/高度）
 *
 * 使用场景：
 * - 操作菜单
 * - 筛选选项
 * - 详细信息展示
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ModalBottomSheetDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("ModalBottomSheet 示例", style = MaterialTheme.typography.titleMedium)

        SectionLabel("基础用法")

        var showBottomSheet by remember { mutableStateOf(false) }
        val sheetState = rememberModalBottomSheetState()

        Button(onClick = { showBottomSheet = true }) {
            Text("显示 Bottom Sheet")
        }

        if (showBottomSheet) {
            ModalBottomSheet(
                onDismissRequest = { showBottomSheet = false },
                sheetState = sheetState
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    Text(
                        "选项列表",
                        style = MaterialTheme.typography.titleMedium
                    )
                    HorizontalDivider()

                    repeat(5) { index ->
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(vertical = 8.dp),
                            horizontalArrangement = Arrangement.spacedBy(12.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Icon(Icons.Filled.Star, contentDescription = null)
                            Text("选项 ${index + 1}")
                        }
                    }

                    Spacer(Modifier.height(32.dp))
                }
            }
        }
    }
}
