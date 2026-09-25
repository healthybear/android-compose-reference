import type { ComponentEntry } from '../../types'

export const modifierSemanticsComponent: ComponentEntry = {
  id: 'modifier-semantics',
  name: 'Modifier.semantics',
  category: 'Modifier',
  description: '为组件添加无障碍语义信息，供 TalkBack 等辅助技术读取，提升应用可访问性。',
  tags: ['modifier', 'semantics', 'accessibility', 'a11y', 'talkback'],
  params: [
    { name: 'mergeDescendants', type: 'Boolean', default: 'false', description: '是否将子节点语义合并到当前节点' },
    { name: 'properties', type: 'SemanticsPropertyReceiver.() -> Unit', required: true, description: '语义属性设置块' },
  ],
  examples: [
    {
      title: '自定义内容描述',
      code: `Box(
    modifier = Modifier
        .size(64.dp)
        .semantics {
            contentDescription = "用户头像，点击查看个人资料"
        }
        .clickable { /* 打开资料 */ }
) {
    Image(
        painter = painterResource(R.drawable.avatar),
        contentDescription = null  // 已在父级设置
    )
}`,
    },
    {
      title: '合并子节点语义（mergeDescendants）',
      code: `Row(
    modifier = Modifier
        .semantics(mergeDescendants = true) {
            // TalkBack 会将整行作为一个元素读取
        }
        .clickable { /* 整行可点击 */ }
        .padding(16.dp)
) {
    Icon(Icons.Default.Star, contentDescription = null)
    Spacer(Modifier.width(8.dp))
    Text("收藏")
    Spacer(Modifier.width(4.dp))
    Text("1234")
}
// TalkBack 读取："收藏 1234"`,
    },
    {
      title: '设置角色和状态',
      code: `Box(
    modifier = Modifier
        .size(48.dp)
        .semantics {
            role = Role.Checkbox
            stateDescription = if (isChecked) "已选中" else "未选中"
        }
        .toggleable(
            value = isChecked,
            onValueChange = { isChecked = it }
        )
        .background(
            if (isChecked) MaterialTheme.colorScheme.primary else Color.Gray,
            CircleShape
        )
) {
    if (isChecked) {
        Icon(Icons.Default.Check, contentDescription = null, tint = Color.White)
    }
}`,
    },
    {
      title: '自定义操作（customActions）',
      code: `Card(
    modifier = Modifier
        .fillMaxWidth()
        .semantics {
            customActions = listOf(
                CustomAccessibilityAction("编辑") { /* 编辑操作 */ true },
                CustomAccessibilityAction("删除") { /* 删除操作 */ true },
                CustomAccessibilityAction("分享") { /* 分享操作 */ true }
            )
        }
) {
    Text("文章标题", modifier = Modifier.padding(16.dp))
}
// TalkBack 用户可以通过操作菜单访问这些自定义操作`,
    },
    {
      title: '清除语义信息（clearAndSetSemantics）',
      code: `// 使用 clearAndSetSemantics 完全替换子节点的语义
Box(
    modifier = Modifier
        .clearAndSetSemantics {
            contentDescription = "5 条未读消息"
        }
) {
    Icon(Icons.Default.Notifications, contentDescription = "通知")
    Badge { Text("5") }
}
// TalkBack 只读取："5 条未读消息"，忽略 Icon 的 contentDescription`,
    },
    {
      title: '隐藏装饰性元素',
      code: `Row(
    modifier = Modifier.padding(16.dp),
    verticalAlignment = Alignment.CenterVertically
) {
    // 装饰性图标，对无障碍用户无意义
    Icon(
        Icons.Default.ChevronRight,
        contentDescription = null,
        modifier = Modifier.semantics { invisibleToUser() }
    )

    Spacer(Modifier.width(8.dp))

    Text("查看详情")
}`,
    },
    {
      title: '进度条的无障碍支持',
      code: `Column(modifier = Modifier.padding(16.dp)) {
    Text("下载进度")

    LinearProgressIndicator(
        progress = downloadProgress,
        modifier = Modifier
            .fillMaxWidth()
            .semantics {
                progressBarRangeInfo = ProgressBarRangeInfo(
                    current = downloadProgress,
                    range = 0f..1f
                )
                stateDescription = "已下载 65%"
            }
    )

    Text("65%")
}`,
    },
    {
      title: '可编辑文本字段',
      code: `var text by remember { mutableStateOf("") }

BasicTextField(
    value = text,
    onValueChange = { text = it },
    modifier = Modifier
        .fillMaxWidth()
        .semantics {
            contentDescription = "用户名输入框"
            editableText = AnnotatedString(text)
            textSelectionRange = TextRange(text.length)
            imeAction = ImeAction.Done
        }
)`,
    },
  ],

  useCases: [
    {
      title: '可访问的自定义开关',
      description: '实现支持无障碍的自定义开关组件',
      code: `@Composable
fun AccessibleCustomSwitch(
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit,
    label: String,
    modifier: Modifier = Modifier
) {
    Row(
        modifier = modifier
            .semantics(mergeDescendants = true) {
                role = Role.Switch
                stateDescription = if (checked) "开启" else "关闭"
                onClick {
                    onCheckedChange(!checked)
                    true
                }
            }
            .toggleable(
                value = checked,
                onValueChange = onCheckedChange
            )
            .padding(16.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(
            text = label,
            modifier = Modifier.weight(1f),
            style = MaterialTheme.typography.bodyLarge
        )

        // 自定义开关 UI
        Box(
            modifier = Modifier
                .width(48.dp)
                .height(24.dp)
                .background(
                    if (checked) MaterialTheme.colorScheme.primary else Color.Gray,
                    RoundedCornerShape(12.dp)
                )
        ) {
            Box(
                modifier = Modifier
                    .size(20.dp)
                    .align(if (checked) Alignment.CenterEnd else Alignment.CenterStart)
                    .padding(2.dp)
                    .background(Color.White, CircleShape)
            )
        }
    }
}`
    },
    {
      title: '可访问的评分组件',
      description: '星级评分组件，支持 TalkBack 读取和操作',
      code: `@Composable
fun AccessibleRatingBar(
    rating: Int,
    onRatingChange: (Int) -> Unit,
    maxRating: Int = 5,
    modifier: Modifier = Modifier
) {
    Row(
        modifier = modifier.semantics(mergeDescendants = true) {
            contentDescription = "评分 4 星，满分 5 星"
            stateDescription = "4 / 5"

            // 为每个评分级别添加自定义操作
            customActions = (1..maxRating).map { stars ->
                CustomAccessibilityAction(stars.toString() + " 星") {
                    onRatingChange(stars)
                    true
                }
            }
        },
        horizontalArrangement = Arrangement.spacedBy(4.dp)
    ) {
        repeat(maxRating) { index ->
            Icon(
                imageVector = if (index < rating) Icons.Filled.Star else Icons.Outlined.Star,
                contentDescription = null,  // 已在父级设置
                modifier = Modifier
                    .size(32.dp)
                    .clickable { onRatingChange(index + 1) },
                tint = if (index < rating) Color(0xFFFFB800) else Color.Gray
            )
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '使用 mergeDescendants 简化复杂布局',
      description: '将多个子元素的语义合并为一个，避免 TalkBack 逐个读取',
      goodExample: `Row(
    modifier = Modifier
        .semantics(mergeDescendants = true) {}
        .clickable { }
) {
    Icon(Icons.Default.Person, contentDescription = null)
    Text("张三")
    Text("在线")
}
// TalkBack 读取："张三 在线"`,
      badExample: `Row(modifier = Modifier.clickable { }) {
    Icon(Icons.Default.Person, contentDescription = "用户")
    Text("张三")
    Text("在线")
}
// TalkBack 分别读取："用户"、"张三"、"在线"`
    },
    {
      title: '为装饰性元素设置 contentDescription = null',
      description: '装饰性图标不应被无障碍服务读取',
      goodExample: `Row {
    Icon(Icons.Default.ChevronRight, contentDescription = null)  // 装饰性
    Text("查看详情")
}`,
      badExample: `Row {
    Icon(Icons.Default.ChevronRight, contentDescription = "右箭头")  // 无意义
    Text("查看详情")
}
// TalkBack 读取："右箭头 查看详情"（冗余）`
    },
    {
      title: '提供有意义的 stateDescription',
      description: '描述组件的当前状态，而非静态标签',
      goodExample: `Checkbox(
    checked = isChecked,
    onCheckedChange = { isChecked = it },
    modifier = Modifier.semantics {
        stateDescription = if (isChecked) "已同意用户协议" else "未同意用户协议"
    }
)`,
      badExample: `Checkbox(
    checked = isChecked,
    onCheckedChange = { isChecked = it },
    modifier = Modifier.semantics {
        contentDescription = "同意协议"  // 没有描述状态
    }
)`
    },
    {
      title: '使用 clearAndSetSemantics 避免混淆',
      description: '自定义组件应该有清晰的单一语义',
      goodExample: `Box(
    modifier = Modifier.clearAndSetSemantics {
        contentDescription = "3 条新消息"
        onClick { openMessages(); true }
    }
) {
    Icon(Icons.Default.Mail, contentDescription = null)
    Badge { Text("3") }
}`,
      badExample: `Box(modifier = Modifier.clickable { }) {
    Icon(Icons.Default.Mail, contentDescription = "邮件")
    Badge { Text("3") }
}
// TalkBack 读取不清晰`
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'Semantics 是无障碍功能的基础',
      content: 'Modifier.semantics 为 TalkBack、开关控制等辅助技术提供组件信息，是构建可访问应用的关键'
    },
    {
      type: 'info',
      title: 'mergeDescendants vs clearAndSetSemantics',
      content: 'mergeDescendants 保留子节点语义并合并，clearAndSetSemantics 完全清除子节点语义并替换为自定义内容'
    },
    {
      type: 'warning',
      title: '不要过度使用 semantics',
      content: 'Compose 的大多数组件已经内置了合理的语义。只在需要自定义或补充时使用 semantics'
    },
    {
      type: 'info',
      title: '测试无障碍功能',
      content: '使用真实设备启用 TalkBack 测试应用，确保所有功能都可以通过语音导航和操作'
    },
    {
      type: 'error',
      title: '装饰性内容必须标记',
      content: '纯装饰性的图标、分隔线等必须设置 contentDescription = null 或使用 invisibleToUser()，避免干扰无障碍用户'
    },
    {
      type: 'info',
      title: '自定义操作提升可用性',
      content: 'customActions 允许用户通过 TalkBack 的操作菜单执行额外操作，如编辑、删除、分享等，无需离开当前焦点'
    },
  ],

  relatedComponents: ['modifier-clickable'],
  since: '1.0.0',
}
