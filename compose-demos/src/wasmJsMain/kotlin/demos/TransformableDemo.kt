package demos

import androidx.compose.foundation.background
import androidx.compose.foundation.gestures.rememberTransformableState
import androidx.compose.foundation.gestures.transformable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.unit.dp
import kotlin.math.roundToInt

@Composable
fun TransformableDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("Modifier.transformable 示例", style = MaterialTheme.typography.titleMedium)

        SectionLabel("双指缩放 + 旋转（鼠标滚轮/触控板模拟）")
        Text(
            "在触控设备上用双指操作；桌面端可用触控板双指缩放手势。",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        var scale by remember { mutableStateOf(1f) }
        var rotation by remember { mutableStateOf(0f) }
        var offset by remember { mutableStateOf(Offset.Zero) }

        val transformState = rememberTransformableState { zoomChange, panChange, rotationChange ->
            scale = (scale * zoomChange).coerceIn(0.5f, 3f)
            rotation += rotationChange
            offset += panChange
        }

        Box(
            modifier = Modifier.fillMaxWidth().height(240.dp)
                .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(12.dp)),
            contentAlignment = Alignment.Center
        ) {
            Box(
                modifier = Modifier
                    .size(120.dp)
                    .graphicsLayer(
                        scaleX = scale,
                        scaleY = scale,
                        rotationZ = rotation,
                        translationX = offset.x,
                        translationY = offset.y
                    )
                    .background(MaterialTheme.colorScheme.primary, RoundedCornerShape(16.dp))
                    .transformable(state = transformState),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    "拖我\n缩放\n旋转",
                    style = MaterialTheme.typography.labelLarge,
                    color = MaterialTheme.colorScheme.onPrimary,
                    textAlign = androidx.compose.ui.text.style.TextAlign.Center
                )
            }
        }

        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Text("缩放：${"%.2f".format(scale)}x", style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant)
            Text("旋转：${rotation.roundToInt()}°", style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant)
            Text("平移：(${offset.x.roundToInt()}, ${offset.y.roundToInt()})",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant)
        }

        OutlinedButton(onClick = { scale = 1f; rotation = 0f; offset = Offset.Zero }) {
            Text("重置")
        }

        HorizontalDivider()

        SectionLabel("说明")
        Text(
            "• transformable 同时处理缩放、旋转、平移三种手势\n" +
            "• 配合 graphicsLayer 应用变换，不影响布局占位\n" +
            "• coerceIn 限制缩放范围，防止过度缩放",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}
