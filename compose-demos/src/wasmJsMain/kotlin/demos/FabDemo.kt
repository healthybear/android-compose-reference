package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun FabDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("FloatingActionButton 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. SmallFloatingActionButton ─────────────────────
        SectionLabel("SmallFloatingActionButton")
        Row(horizontalArrangement = Arrangement.spacedBy(16.dp), verticalAlignment = Alignment.CenterVertically) {
            SmallFloatingActionButton(onClick = {}) {
                Icon(Icons.Filled.Add, contentDescription = "添加")
            }
            Text("size = 40 dp", style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant)
        }

        HorizontalDivider()

        // ── 2. FloatingActionButton（默认）────────────────────
        SectionLabel("FloatingActionButton（默认）")
        Row(horizontalArrangement = Arrangement.spacedBy(16.dp), verticalAlignment = Alignment.CenterVertically) {
            FloatingActionButton(onClick = {}) {
                Icon(Icons.Filled.Add, contentDescription = "添加")
            }
            Text("size = 56 dp", style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant)
        }

        HorizontalDivider()

        // ── 3. LargeFloatingActionButton ─────────────────────
        SectionLabel("LargeFloatingActionButton")
        Row(horizontalArrangement = Arrangement.spacedBy(16.dp), verticalAlignment = Alignment.CenterVertically) {
            LargeFloatingActionButton(onClick = {}) {
                Icon(Icons.Filled.Add, contentDescription = "添加",
                    modifier = Modifier.size(36.dp))
            }
            Text("size = 96 dp", style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant)
        }

        HorizontalDivider()

        // ── 4. 自定义颜色 ─────────────────────────────────────
        SectionLabel("containerColor 自定义")
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            FloatingActionButton(
                onClick = {},
                containerColor = MaterialTheme.colorScheme.primaryContainer
            ) {
                Icon(Icons.Filled.Edit, contentDescription = "编辑",
                    tint = MaterialTheme.colorScheme.onPrimaryContainer)
            }
            FloatingActionButton(
                onClick = {},
                containerColor = MaterialTheme.colorScheme.secondaryContainer
            ) {
                Icon(Icons.Filled.Edit, contentDescription = "编辑",
                    tint = MaterialTheme.colorScheme.onSecondaryContainer)
            }
            FloatingActionButton(
                onClick = {},
                containerColor = MaterialTheme.colorScheme.tertiaryContainer
            ) {
                Icon(Icons.Filled.Edit, contentDescription = "编辑",
                    tint = MaterialTheme.colorScheme.onTertiaryContainer)
            }
        }
    }
}
