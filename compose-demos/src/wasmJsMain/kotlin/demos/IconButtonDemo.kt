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

/**
 * IconButtonDemo 演示 Material3 中四种图标按钮的用法与视觉差异。
 *
 * Material3 图标按钮层级（由强到弱）：
 * - [FilledIconButton] — 填充 primary 色背景，最高强调
 * - [FilledTonalIconButton] — 填充 secondaryContainer，次要强调
 * - [OutlinedIconButton] — 描边无填充，中等强调
 * - [IconButton] — 无背景无边框，最低强调，常用于工具栏
 *
 * 所有变体均支持 enabled/disabled 状态，以及通过 colors 参数自定义颜色。
 */
@Composable
fun IconButtonDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("IconButton 示例", style = MaterialTheme.typography.titleMedium)

        // 无背景的 IconButton 视觉最轻，常用于 TopAppBar 的操作区，
        // 不会与页面主内容争夺注意力，同时保持足够的触控区域（48 dp）。
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

        // FilledIconButton 使用 primary 色填充，视觉权重最高，
        // 适合需要突出单个图标操作的场景，例如发送按钮或确认按钮。
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

        // FilledTonalIconButton 使用 secondaryContainer，比 FilledIconButton 更柔和，
        // 适合工具栏中需要一定强调但不抢主操作焦点的图标，如设置、通知。
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

        // OutlinedIconButton 与 OutlinedButton 同理：描边提供视觉边界但不填充，
        // 适合需要明确点击区域但不需要强调的操作，如编辑、搜索。
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

        // 通过 IconButtonDefaults.iconButtonColors() 动态切换 contentColor，
        // 实现切换态视觉反馈，比直接修改 Icon 的 tint 更符合 Material3 规范。
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
