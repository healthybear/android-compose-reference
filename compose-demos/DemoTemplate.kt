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
 * [ComponentName]Demo 演示 [Component Full Name] 的用法。
 *
 * [Brief description of the component - 1-2 sentences]
 *
 * 核心参数：
 * - `param1`：[Description]
 * - `param2`：[Description]
 * - `param3`：[Description]
 *
 * 学习要点：
 * - [Key learning point 1]
 * - [Key learning point 2]
 * - [Key learning point 3]
 *
 * 与其他组件的区别：
 * - vs [Component A]：[Key difference]
 * - vs [Component B]：[Key difference]
 */
@Composable
fun [ComponentName]Demo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("[Component Name] 示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 基础用法 ───────────────────────────────────────
        SectionLabel("基础用法")
        var state1 by remember { mutableStateOf([initial_value]) }

        [BasicUsageExample]

        HorizontalDivider()

        // ── 2. 常见变体 ───────────────────────────────────────
        SectionLabel("常见变体")
        var state2 by remember { mutableStateOf([initial_value]) }

        [VariantExample]

        HorizontalDivider()

        // ── 3. 状态管理 ───────────────────────────────────────
        SectionLabel("状态管理")
        var state3 by remember { mutableStateOf([initial_value]) }

        [StateManagementExample]

        HorizontalDivider()

        // ── 4. 自定义样式 ─────────────────────────────────────
        SectionLabel("自定义样式")

        [CustomStyleExample]

        HorizontalDivider()

        // ── 5. 实际场景 ───────────────────────────────────────
        SectionLabel("场景示例：[Scenario Name]")

        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(
                containerColor = MaterialTheme.colorScheme.surfaceVariant
            )
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                Text(
                    "[Scenario Title]",
                    style = MaterialTheme.typography.titleSmall
                )

                [RealWorldScenarioExample]
            }
        }

        HorizontalDivider()

        // ── 6. 错误处理 ───────────────────────────────────────
        SectionLabel("错误处理和边界情况")

        [ErrorHandlingExample]
    }
}

/**
 * Template Instructions:
 *
 * 1. Replace [ComponentName] with the actual component name (e.g., Button, TextField)
 * 2. Replace [Component Full Name] with the full component name
 * 3. Fill in the KDoc with specific details
 * 4. Implement at least 3-5 sections with examples
 * 5. Include at least one real-world scenario
 * 6. Add error handling and edge cases
 * 7. Use SectionLabel for consistent section headers
 * 8. Use HorizontalDivider between sections
 * 9. Follow Material3 design guidelines
 * 10. Add helpful comments for complex logic
 *
 * Code Quality Checklist:
 * ✅ Complete KDoc with parameters and learning points
 * ✅ At least 3 usage examples
 * ✅ One real-world scenario in a Card
 * ✅ Error handling demonstration
 * ✅ Proper state management with remember
 * ✅ Consistent naming conventions
 * ✅ Material3 theming used throughout
 * ✅ Proper spacing with Arrangement.spacedBy
 * ✅ Accessibility considerations (contentDescription for icons)
 * ✅ Comments for non-obvious logic
 */
