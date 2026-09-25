import type { ComponentEntry } from '../../types'

export const constraintLayoutComponent: ComponentEntry = {
  id: 'constraint-layout',
  name: 'ConstraintLayout',
  category: 'Layout',
  description: '约束布局，通过引用和约束关系定位子组件，适合复杂的相对定位场景，需引入 androidx.constraintlayout:constraintlayout-compose。',
  tags: ['constraintlayout', 'constraint', 'layout', 'relative', '约束布局'],
  params: [
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'optimizationLevel', type: 'Int', default: 'Optimizer.OPTIMIZATION_STANDARD', description: '约束求解优化级别' },
    { name: 'content', type: '@Composable ConstraintLayoutScope.() -> Unit', required: true, description: '子组件内容，在此作用域内使用 createRef/createRefs 和 Modifier.constrainAs 定义约束' },
  ],
  examples: [
    {
      title: '基础约束定位',
      code: `// build.gradle.kts
// implementation("androidx.constraintlayout:constraintlayout-compose:1.1.0")

ConstraintLayout(modifier = Modifier.fillMaxSize()) {
    val (avatar, name, bio) = createRefs()

    Image(
        painter = painterResource(R.drawable.avatar),
        contentDescription = null,
        modifier = Modifier
            .size(64.dp)
            .clip(CircleShape)
            .constrainAs(avatar) {
                top.linkTo(parent.top, margin = 16.dp)
                start.linkTo(parent.start, margin = 16.dp)
            }
    )

    Text(
        text = "用户名",
        style = MaterialTheme.typography.titleMedium,
        modifier = Modifier.constrainAs(name) {
            top.linkTo(avatar.top)
            start.linkTo(avatar.end, margin = 12.dp)
        }
    )

    Text(
        text = "个人简介",
        style = MaterialTheme.typography.bodyMedium,
        modifier = Modifier.constrainAs(bio) {
            top.linkTo(name.bottom, margin = 4.dp)
            start.linkTo(name.start)
        }
    )
}`,
    },
    {
      title: 'Guideline 辅助线',
      code: `ConstraintLayout(modifier = Modifier.fillMaxSize().padding(16.dp)) {
    val (label1, label2, field1, field2) = createRefs()

    // 垂直 Guideline，距左侧 30%
    val guideline = createGuidelineFromStart(0.3f)

    Text(
        text = "用户名",
        modifier = Modifier.constrainAs(label1) {
            top.linkTo(parent.top)
            end.linkTo(guideline, margin = 8.dp)
        }
    )

    OutlinedTextField(
        value = "",
        onValueChange = {},
        modifier = Modifier.constrainAs(field1) {
            top.linkTo(label1.top)
            bottom.linkTo(label1.bottom)
            start.linkTo(guideline, margin = 8.dp)
            end.linkTo(parent.end)
            width = Dimension.fillToConstraints
        }
    )

    Text(
        text = "密码",
        modifier = Modifier.constrainAs(label2) {
            top.linkTo(label1.bottom, margin = 16.dp)
            end.linkTo(guideline, margin = 8.dp)
        }
    )

    OutlinedTextField(
        value = "",
        onValueChange = {},
        modifier = Modifier.constrainAs(field2) {
            top.linkTo(label2.top)
            bottom.linkTo(label2.bottom)
            start.linkTo(guideline, margin = 8.dp)
            end.linkTo(parent.end)
            width = Dimension.fillToConstraints
        }
    )
}`,
    },
    {
      title: 'Barrier 屏障',
      code: `ConstraintLayout(modifier = Modifier.fillMaxWidth().padding(16.dp)) {
    val (label1, label2, field1, field2) = createRefs()

    // Barrier：跟随最宽的 label
    val barrier = createEndBarrier(label1, label2, margin = 8.dp)

    Text("用户名", modifier = Modifier.constrainAs(label1) {
        top.linkTo(parent.top)
        start.linkTo(parent.start)
    })

    Text("邮箱地址", modifier = Modifier.constrainAs(label2) {
        top.linkTo(label1.bottom, margin = 16.dp)
        start.linkTo(parent.start)
    })

    OutlinedTextField(
        value = "",
        onValueChange = {},
        modifier = Modifier.constrainAs(field1) {
            top.linkTo(label1.top)
            bottom.linkTo(label1.bottom)
            start.linkTo(barrier)
            end.linkTo(parent.end)
            width = Dimension.fillToConstraints
        }
    )

    OutlinedTextField(
        value = "",
        onValueChange = {},
        modifier = Modifier.constrainAs(field2) {
            top.linkTo(label2.top)
            bottom.linkTo(label2.bottom)
            start.linkTo(barrier)
            end.linkTo(parent.end)
            width = Dimension.fillToConstraints
        }
    )
}`,
    },
    {
      title: 'Chain 链式布局',
      code: `ConstraintLayout(modifier = Modifier.fillMaxWidth().height(100.dp)) {
    val (button1, button2, button3) = createRefs()

    // 创建水平链，均匀分布
    createHorizontalChain(button1, button2, button3, chainStyle = ChainStyle.Spread)

    Button(
        onClick = {},
        modifier = Modifier.constrainAs(button1) {
            top.linkTo(parent.top)
            bottom.linkTo(parent.bottom)
        }
    ) {
        Text("取消")
    }

    Button(
        onClick = {},
        modifier = Modifier.constrainAs(button2) {
            top.linkTo(parent.top)
            bottom.linkTo(parent.bottom)
        }
    ) {
        Text("重置")
    }

    Button(
        onClick = {},
        modifier = Modifier.constrainAs(button3) {
            top.linkTo(parent.top)
            bottom.linkTo(parent.bottom)
        }
    ) {
        Text("确定")
    }
}`,
    },
    {
      title: 'ConstraintSet（解耦约束）',
      code: `val constraints = ConstraintSet {
    val box = createRefFor("box")
    val text = createRefFor("text")

    constrain(box) {
        centerTo(parent)
        width = Dimension.value(100.dp)
        height = Dimension.value(100.dp)
    }

    constrain(text) {
        top.linkTo(box.bottom, margin = 8.dp)
        centerHorizontallyTo(box)
    }
}

ConstraintLayout(
    constraintSet = constraints,
    modifier = Modifier.fillMaxSize()
) {
    Box(
        modifier = Modifier
            .background(MaterialTheme.colorScheme.primary)
            .layoutId("box")
    )
    Text("居中方块", modifier = Modifier.layoutId("text"))
}`,
    },
    {
      title: '宽高比约束',
      code: `ConstraintLayout(modifier = Modifier.fillMaxSize().padding(16.dp)) {
    val (image, title, description) = createRefs()

    // 图片保持 16:9 宽高比
    AsyncImage(
        model = "https://example.com/image.jpg",
        contentDescription = null,
        modifier = Modifier.constrainAs(image) {
            top.linkTo(parent.top)
            start.linkTo(parent.start)
            end.linkTo(parent.end)
            width = Dimension.fillToConstraints
            height = Dimension.ratio("16:9")
        },
        contentScale = ContentScale.Crop
    )

    Text(
        text = "标题",
        style = MaterialTheme.typography.titleLarge,
        modifier = Modifier.constrainAs(title) {
            top.linkTo(image.bottom, margin = 16.dp)
            start.linkTo(parent.start)
        }
    )

    Text(
        text = "描述内容...",
        modifier = Modifier.constrainAs(description) {
            top.linkTo(title.bottom, margin = 8.dp)
            start.linkTo(parent.start)
            end.linkTo(parent.end)
            width = Dimension.fillToConstraints
        }
    )
}`,
    },
    {
      title: '循环依赖解决（使用 Barrier）',
      code: `ConstraintLayout(modifier = Modifier.fillMaxWidth().padding(16.dp)) {
    val (icon, title, subtitle, button) = createRefs()

    // 使用 Barrier 避免 title 和 subtitle 与 button 的循环依赖
    val textBarrier = createEndBarrier(title, subtitle)

    Icon(
        Icons.Default.Notifications,
        contentDescription = null,
        modifier = Modifier
            .size(48.dp)
            .constrainAs(icon) {
                top.linkTo(parent.top)
                start.linkTo(parent.start)
            }
    )

    Text(
        text = "通知标题",
        style = MaterialTheme.typography.titleMedium,
        modifier = Modifier.constrainAs(title) {
            top.linkTo(icon.top)
            start.linkTo(icon.end, margin = 16.dp)
            end.linkTo(button.start, margin = 8.dp)
            width = Dimension.fillToConstraints
        }
    )

    Text(
        text = "通知内容描述",
        style = MaterialTheme.typography.bodyMedium,
        modifier = Modifier.constrainAs(subtitle) {
            top.linkTo(title.bottom, margin = 4.dp)
            start.linkTo(title.start)
            end.linkTo(button.start, margin = 8.dp)
            width = Dimension.fillToConstraints
        }
    )

    TextButton(
        onClick = {},
        modifier = Modifier.constrainAs(button) {
            top.linkTo(parent.top)
            bottom.linkTo(parent.bottom)
            end.linkTo(parent.end)
        }
    ) {
        Text("查看")
    }
}`,
    },
  ],

  useCases: [
    {
      title: '聊天消息气泡',
      description: '实现左右对齐的聊天消息布局，头像和消息内容相对定位',
      code: `@Composable
fun ChatMessageItem(
    message: ChatMessage,
    isMine: Boolean
) {
    ConstraintLayout(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 4.dp, horizontal = 8.dp)
    ) {
        val (avatar, bubble, time, status) = createRefs()

        // 头像
        AsyncImage(
            model = message.avatarUrl,
            contentDescription = null,
            modifier = Modifier
                .size(40.dp)
                .clip(CircleShape)
                .constrainAs(avatar) {
                    top.linkTo(parent.top)
                    if (isMine) {
                        end.linkTo(parent.end)
                    } else {
                        start.linkTo(parent.start)
                    }
                }
        )

        // 消息气泡
        Surface(
            shape = RoundedCornerShape(12.dp),
            color = if (isMine) {
                MaterialTheme.colorScheme.primary
            } else {
                MaterialTheme.colorScheme.surfaceVariant
            },
            modifier = Modifier.constrainAs(bubble) {
                top.linkTo(avatar.top)
                if (isMine) {
                    end.linkTo(avatar.start, margin = 8.dp)
                    start.linkTo(parent.start, margin = 60.dp)
                } else {
                    start.linkTo(avatar.end, margin = 8.dp)
                    end.linkTo(parent.end, margin = 60.dp)
                }
                width = Dimension.fillToConstraints
            }
        ) {
            Text(
                text = message.content,
                modifier = Modifier.padding(12.dp),
                color = if (isMine) {
                    MaterialTheme.colorScheme.onPrimary
                } else {
                    MaterialTheme.colorScheme.onSurfaceVariant
                }
            )
        }

        // 时间戳
        Text(
            text = message.timestamp,
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            modifier = Modifier.constrainAs(time) {
                top.linkTo(bubble.bottom, margin = 4.dp)
                if (isMine) {
                    end.linkTo(bubble.end)
                } else {
                    start.linkTo(bubble.start)
                }
            }
        )

        // 发送状态（仅自己的消息）
        if (isMine) {
            Icon(
                imageVector = when (message.status) {
                    MessageStatus.SENDING -> Icons.Default.Schedule
                    MessageStatus.SENT -> Icons.Default.Done
                    MessageStatus.READ -> Icons.Default.DoneAll
                    else -> Icons.Default.Error
                },
                contentDescription = null,
                modifier = Modifier
                    .size(16.dp)
                    .constrainAs(status) {
                        top.linkTo(time.top)
                        bottom.linkTo(time.bottom)
                        end.linkTo(time.start, margin = 4.dp)
                    },
                tint = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
    }
}`
    },
    {
      title: '复杂卡片布局',
      description: '实现带图片、标题、标签和操作按钮的新闻卡片',
      code: `@Composable
fun NewsCard(news: NewsItem) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(8.dp)
    ) {
        ConstraintLayout(
            modifier = Modifier
                .fillMaxWidth()
                .padding(12.dp)
        ) {
            val (thumbnail, category, title, author, time, likeBtn, shareBtn) = createRefs()

            // 创建底部按钮的链
            createHorizontalChain(
                likeBtn, shareBtn,
                chainStyle = ChainStyle.Packed
            )

            // 缩略图（固定宽高比）
            AsyncImage(
                model = news.thumbnailUrl,
                contentDescription = null,
                modifier = Modifier
                    .constrainAs(thumbnail) {
                        top.linkTo(parent.top)
                        start.linkTo(parent.start)
                        width = Dimension.value(120.dp)
                        height = Dimension.ratio("4:3")
                    }
                    .clip(RoundedCornerShape(8.dp)),
                contentScale = ContentScale.Crop
            )

            // 分类标签
            AssistChip(
                onClick = {},
                label = { Text(news.category) },
                modifier = Modifier.constrainAs(category) {
                    top.linkTo(thumbnail.top)
                    start.linkTo(thumbnail.end, margin = 12.dp)
                }
            )

            // 标题
            Text(
                text = news.title,
                style = MaterialTheme.typography.titleMedium,
                maxLines = 2,
                overflow = TextOverflow.Ellipsis,
                modifier = Modifier.constrainAs(title) {
                    top.linkTo(category.bottom, margin = 8.dp)
                    start.linkTo(thumbnail.end, margin = 12.dp)
                    end.linkTo(parent.end)
                    width = Dimension.fillToConstraints
                }
            )

            // 作者
            Text(
                text = news.author,
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                modifier = Modifier.constrainAs(author) {
                    top.linkTo(title.bottom, margin = 4.dp)
                    start.linkTo(title.start)
                }
            )

            // 时间
            Text(
                text = news.publishTime,
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                modifier = Modifier.constrainAs(time) {
                    top.linkTo(author.top)
                    bottom.linkTo(author.bottom)
                    start.linkTo(author.end, margin = 8.dp)
                }
            )

            // 点赞按钮
            IconButton(
                onClick = {},
                modifier = Modifier.constrainAs(likeBtn) {
                    top.linkTo(thumbnail.bottom, margin = 8.dp)
                    bottom.linkTo(parent.bottom)
                }
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(Icons.Default.FavoriteBorder, null, modifier = Modifier.size(20.dp))
                    Spacer(Modifier.width(4.dp))
                    Text("1.2k", style = MaterialTheme.typography.bodySmall)
                }
            }

            // 分享按钮
            IconButton(
                onClick = {},
                modifier = Modifier.constrainAs(shareBtn) {
                    top.linkTo(likeBtn.top)
                    bottom.linkTo(likeBtn.bottom)
                }
            ) {
                Icon(Icons.Default.Share, null, modifier = Modifier.size(20.dp))
            }
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '使用 createRefs 批量创建引用',
      description: '通过解构声明简化引用创建',
      goodExample: `ConstraintLayout {
    val (image, title, subtitle) = createRefs()
    // 使用引用
}`,
      badExample: `ConstraintLayout {
    val image = createRef()
    val title = createRef()
    val subtitle = createRef()
    // 代码冗长
}`
    },
    {
      title: '使用 Barrier 处理动态宽度',
      description: 'Barrier 可以跟随多个组件的边界，适合处理动态内容',
      goodExample: `val (label1, label2, field) = createRefs()
val barrier = createEndBarrier(label1, label2)

// field 自动跟随最宽的 label
TextField(
    modifier = Modifier.constrainAs(field) {
        start.linkTo(barrier, margin = 8.dp)
    }
)`,
      badExample: `// 固定 label 宽度，无法适应内容
TextField(
    modifier = Modifier.constrainAs(field) {
        start.linkTo(label1.end, margin = 8.dp)
    }
)`
    },
    {
      title: '用 ConstraintSet 分离布局逻辑',
      description: '复杂布局或需要动态切换布局时使用 ConstraintSet',
      goodExample: `val portraitConstraints = ConstraintSet { /* 竖屏约束 */ }
val landscapeConstraints = ConstraintSet { /* 横屏约束 */ }

val constraints = if (isPortrait) portraitConstraints else landscapeConstraints

ConstraintLayout(constraintSet = constraints) {
    // 组件定义
}`,
    },
    {
      title: '避免约束循环依赖',
      description: '确保约束链不形成循环',
      goodExample: `// A 依赖 B，B 依赖 C，C 依赖 parent
Text(modifier = Modifier.constrainAs(a) {
    start.linkTo(b.end)
})
Text(modifier = Modifier.constrainAs(b) {
    start.linkTo(c.end)
})
Text(modifier = Modifier.constrainAs(c) {
    start.linkTo(parent.start)
})`,
      badExample: `// 循环依赖：A 依赖 B，B 依赖 A
Text(modifier = Modifier.constrainAs(a) {
    start.linkTo(b.end)
})
Text(modifier = Modifier.constrainAs(b) {
    start.linkTo(a.end)  // 错误：循环
})`
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'ConstraintLayout 需要单独依赖',
      content: '需要在 build.gradle.kts 中添加：implementation("androidx.constraintlayout:constraintlayout-compose:1.1.0")'
    },
    {
      type: 'warning',
      title: 'ConstraintLayout 性能考虑',
      content: 'ConstraintLayout 的约束求解有一定开销。简单布局优先使用 Column/Row/Box，复杂相对定位才用 ConstraintLayout'
    },
    {
      type: 'tip',
      title: 'Dimension 提供灵活的尺寸约束',
      content: 'Dimension.fillToConstraints 填满约束空间，Dimension.wrapContent 包裹内容，Dimension.value(dp) 固定尺寸，Dimension.ratio("16:9") 宽高比'
    },
    {
      type: 'tip',
      title: 'ChainStyle 控制链式布局',
      content: 'Spread（均匀分布）、SpreadInside（两端贴边，中间均匀）、Packed（集中在中间）'
    },
    {
      type: 'danger',
      title: 'layoutId 与 constrainAs 不能混用',
      content: '使用 ConstraintSet 时用 layoutId 标识组件，使用内联约束时用 constrainAs，不要在同一个布局中混用'
    },
    {
      type: 'tip',
      title: 'Guideline 有三种类型',
      content: 'createGuidelineFromStart(offset/fraction)、createGuidelineFromEnd(offset/fraction)、createGuidelineFromTop/Bottom(offset/fraction)'
    },
  ],

  relatedComponents: ['box', 'column', 'row', 'box-with-constraints'],
  since: '1.0.0',
}
