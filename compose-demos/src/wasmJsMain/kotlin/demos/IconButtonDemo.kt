package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun IconButtonDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("IconButton 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. IconButton ─────────────────────────────────────
        SectionLabel("IconButton — 基础图标按钮")
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp), verticalAlignment = Alignment.CenterVertically) {
            var liked by remember { mutableStateOf(false) }
            IconButton(onClick = { liked = !liked }) {
                Icon(
                    if (liked) Icons.Filled.Favorite else Icons.Outlined.FavoriteBorder,
                    contentDescription = "收藏",
                    tint = if (liked) MaterialTheme.colorScheme.error else MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
            IconButton(onClick = {}) {
                Icon(Icons.Filled.Share, contentDescription = "分享")
            }
            IconButton(onClick = {}, enabled = false) {
                Icon(Icons.Filled.Delete, contentDescription = "删除")
            }
            Text("（第三个已禁用）", style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant)
        }

        HorizontalDivider()

        // ── 2. FilledIconButton ───────────────────────────────
        SectionLabel("FilledIconButton — 填充背景")
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            FilledIconButton(onClick = {}) {
                Icon(Icons.Filled.Add, contentDescription = "添加")
            }
            FilledIconButton(onClick = {}, enabled = false) {
                Icon(Icons.Filled.Add, contentDescription = "添加（禁用）")
            }
        }

        HorizontalDivider()

        // ── 3. FilledTonalIconButton ──────────────────────────
        SectionLabel("FilledTonalIconButton — 柔和填充")
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            FilledTonalIconButton(onClick = {}) {
                Icon(Icons.Filled.Settings, contentDescription = "设置")
            }
            FilledTonalIconButton(onClick = {}) {
                Icon(Icons.Filled.Notifications, contentDescription = "通知")
            }
            FilledTonalIconButton(onClick = {}, enabled = false) {
                Icon(Icons.Filled.Lock, contentDescription = "锁定（禁用）")
            }
        }

        HorizontalDivider()

        // ── 4. OutlinedIconButton ─────────────────────────────
        SectionLabel("OutlinedIconButton — 描边")
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            OutlinedIconButton(onClick = {}) {
                Icon(Icons.Filled.Edit, contentDescription = "编辑")
            }
            OutlinedIconButton(onClick = {}) {
                Icon(Icons.Filled.Search, contentDescription = "搜索")
            }
            OutlinedIconButton(onClick = {}, enabled = false) {
                Icon(Icons.Filled.Close, contentDescription = "关闭（禁用）")
            }
        }

        HorizontalDivider()

        // ── 5. 切换态 IconButton ──────────────────────────────
        SectionLabel("切换态（checked）")
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp), verticalAlignment = Alignment.CenterVertically) {
            var checked by remember { mutableStateOf(false) }
            IconButton(
                onClick = { checked = !checked },
                colors = IconButtonDefaults.iconButtonColors(
                    contentColor = if (checked) MaterialTheme.colorScheme.primary
                                   else MaterialTheme.colorScheme.onSurfaceVariant
                )
            ) {
                Icon(
                    if (checked) Icons.Filled.Bookmark else Icons.Outlined.BookmarkBorder,
                    contentDescription = "书签"
                )
            }
            Text(
                if (checked) "已收藏" else "未收藏",
                style = MaterialTheme.typography.bodyMedium
            )
        }
    }
}
