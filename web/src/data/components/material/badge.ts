import type { ComponentEntry } from '../../types'

export const badgeComponent: ComponentEntry = {
  id: 'badge',
  demo: { id: 'badge', sourceFile: 'BadgeDemo.kt' },
  name: 'Badge / BadgedBox',
  category: 'Material',
  description: 'BadgedBox 在子组件右上角叠加 Badge 徽标，用于显示未读消息数量、新功能提示或状态标识。Badge 可显示数字或作为小圆点，常用于导航栏图标、通知按钮。',
  tags: ['badge', 'notification', 'count', 'indicator', 'dot'],
  params: [
    { name: 'badge', type: '@Composable BoxScope.() -> Unit', required: true, description: '徽标内容，通常为 Badge { Text(...) } 或 Badge()（小圆点）' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: 'BadgedBox 的修饰符' },
    { name: 'content', type: '@Composable BoxScope.() -> Unit', required: true, description: '被徽标装饰的主体内容，通常为 Icon' },
  ],
  examples: [
    {
      title: '数字徽标',
      code: `BadgedBox(
    badge = {
        Badge {
            Text("5")
        }
    }
) {
    Icon(
        Icons.Default.Notifications,
        contentDescription = "通知"
    )
}`,
    },
    {
      title: '小红点（无数字）',
      code: `BadgedBox(
    badge = {
        Badge()  // 无内容显示为小圆点
    }
) {
    Icon(
        Icons.Default.Email,
        contentDescription = "邮件"
    )
}`,
    },
    {
      title: '超出显示 99+',
      code: `val unreadCount = 120

BadgedBox(
    badge = {
        Badge {
            Text(
                if (unreadCount > 99) "99+" else unreadCount.toString()
            )
        }
    }
) {
    Icon(
        Icons.Default.ShoppingCart,
        contentDescription = "购物车"
    )
}`,
    },
    {
      title: '条件显示徽标',
      code: `val unreadCount = 5

BadgedBox(
    badge = {
        if (unreadCount > 0) {
            Badge {
                Text(unreadCount.toString())
            }
        }
    }
) {
    Icon(
        Icons.Default.Message,
        contentDescription = "消息"
    )
}`,
    },
    {
      title: '自定义徽标颜色',
      code: `BadgedBox(
    badge = {
        Badge(
            containerColor = MaterialTheme.colorScheme.error,
            contentColor = MaterialTheme.colorScheme.onError
        ) {
            Text("新")
        }
    }
) {
    Icon(
        Icons.Default.Lightbulb,
        contentDescription = "新功能"
    )
}`,
    },
    {
      title: '导航栏徽标',
      code: `@Composable
fun NavigationBarWithBadges() {
    var selectedTab by remember { mutableIntStateOf(0) }
    val unreadMessages = 3
    val unreadNotifications = 10

    Scaffold(
        bottomBar = {
            NavigationBar {
                NavigationBarItem(
                    selected = selectedTab == 0,
                    onClick = { selectedTab = 0 },
                    icon = {
                        Icon(Icons.Default.Home, contentDescription = "首页")
                    },
                    label = { Text("首页") }
                )

                NavigationBarItem(
                    selected = selectedTab == 1,
                    onClick = { selectedTab = 1 },
                    icon = {
                        BadgedBox(
                            badge = {
                                if (unreadMessages > 0) {
                                    Badge {
                                        Text(unreadMessages.toString())
                                    }
                                }
                            }
                        ) {
                            Icon(Icons.Default.Message, contentDescription = "消息")
                        }
                    },
                    label = { Text("消息") }
                )

                NavigationBarItem(
                    selected = selectedTab == 2,
                    onClick = { selectedTab = 2 },
                    icon = {
                        BadgedBox(
                            badge = {
                                if (unreadNotifications > 0) {
                                    Badge {
                                        Text(
                                            if (unreadNotifications > 99) "99+"
                                            else unreadNotifications.toString()
                                        )
                                    }
                                }
                            }
                        ) {
                            Icon(Icons.Default.Notifications, contentDescription = "通知")
                        }
                    },
                    label = { Text("通知") }
                )

                NavigationBarItem(
                    selected = selectedTab == 3,
                    onClick = { selectedTab = 3 },
                    icon = {
                        Icon(Icons.Default.Person, contentDescription = "我的")
                    },
                    label = { Text("我的") }
                )
            }
        }
    ) { paddingValues ->
        Content(modifier = Modifier.padding(paddingValues))
    }
}`,
    },
    {
      title: 'TopAppBar 徽标',
      code: `@Composable
fun AppBarWithBadges() {
    val cartItemCount = 3

    TopAppBar(
        title = { Text("商品列表") },
        actions = {
            IconButton(onClick = { /* 打开通知 */ }) {
                BadgedBox(
                    badge = { Badge() }  // 小红点
                ) {
                    Icon(
                        Icons.Default.Notifications,
                        contentDescription = "通知"
                    )
                }
            }

            IconButton(onClick = { /* 打开购物车 */ }) {
                BadgedBox(
                    badge = {
                        if (cartItemCount > 0) {
                            Badge { Text(cartItemCount.toString()) }
                        }
                    }
                ) {
                    Icon(
                        Icons.Default.ShoppingCart,
                        contentDescription = "购物车"
                    )
                }
            }
        }
    )
}`,
    },
  ],

  useCases: [
    {
      title: 'Tab 标签页徽标',
      description: '在 Tab 上显示未读数',
      code: `@Composable
fun TabsWithBadges() {
    var selectedTab by remember { mutableIntStateOf(0) }
    val tabs = listOf("全部", "未读", "重要")
    val unreadCounts = listOf(0, 5, 2)

    Column {
        TabRow(selectedTabIndex = selectedTab) {
            tabs.forEachIndexed { index, title ->
                Tab(
                    selected = selectedTab == index,
                    onClick = { selectedTab = index },
                    text = {
                        BadgedBox(
                            badge = {
                                if (unreadCounts[index] > 0) {
                                    Badge {
                                        Text(unreadCounts[index].toString())
                                    }
                                }
                            }
                        ) {
                            Text(title)
                        }
                    }
                )
            }
        }

        // Tab 内容
        when (selectedTab) {
            0 -> AllMessagesContent()
            1 -> UnreadMessagesContent()
            2 -> ImportantMessagesContent()
        }
    }
}`
    },
    {
      title: '列表项徽标',
      description: '在列表项中显示状态标识',
      code: `@Composable
fun ChatListItem(chat: Chat) {
    ListItem(
        headlineContent = { Text(chat.userName) },
        supportingContent = { Text(chat.lastMessage) },
        leadingContent = {
            BadgedBox(
                badge = {
                    if (chat.unreadCount > 0) {
                        Badge {
                            Text(
                                if (chat.unreadCount > 99) "99+"
                                else chat.unreadCount.toString()
                            )
                        }
                    }
                }
            ) {
                AsyncImage(
                    model = chat.avatarUrl,
                    contentDescription = chat.userName,
                    modifier = Modifier
                        .size(40.dp)
                        .clip(CircleShape)
                )
            }
        },
        trailingContent = {
            Text(
                chat.timestamp,
                style = MaterialTheme.typography.bodySmall
            )
        }
    )
}`
    },
  ],

  bestPractices: [
    {
      title: '超过 99 显示 99+',
      description: '避免徽标过长影响布局',
      goodExample: `Badge {
    Text(if (count > 99) "99+" else count.toString())
}`,
      badExample: `Badge {
    Text(count.toString())  // 如 count=1234 会显示 1234
}`
    },
    {
      title: '无数量时使用小圆点',
      description: '表示有新内容但不显示具体数量',
      goodExample: `BadgedBox(
    badge = { Badge() }  // 小圆点
) {
    Icon(Icons.Default.Notifications, contentDescription = "通知")
}`,
    },
    {
      title: '0 时不显示徽标',
      description: '没有未读消息时不应显示徽标',
      goodExample: `BadgedBox(
    badge = {
        if (count > 0) {
            Badge { Text(count.toString()) }
        }
    }
) {
    Icon(Icons.Default.Message, contentDescription = "消息")
}`,
      badExample: `BadgedBox(
    badge = {
        Badge { Text(count.toString()) }  // count=0 也会显示 "0"
    }
) {
    Icon(Icons.Default.Message, contentDescription = "消息")
}`
    },
    {
      title: 'Badge 内文字应简短',
      description: '徽标只用于显示数字或简短标识',
      goodExample: `Badge { Text("新") }
Badge { Text("5") }`,
      badExample: `Badge { Text("未读消息") }  // 文字过长`
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'Badge 自动定位在右上角',
      content: 'BadgedBox 会自动将 Badge 定位在 content 的右上角，无需手动调整位置'
    },
    {
      type: 'warning',
      title: 'Badge() 无内容显示为小圆点',
      content: 'Badge() 不传入内容时，显示为小圆点（6dp 直径）；传入 Text 时显示为带数字的徽标'
    },
    {
      type: 'info',
      title: '徽标颜色使用 error 色系',
      content: 'Badge 默认使用 error 色（红色），符合用户对未读提示的认知'
    },
    {
      type: 'info',
      title: 'NavigationBarItem 内置徽标支持',
      content: 'NavigationBarItem 的 icon 参数天然支持 BadgedBox，无需额外处理'
    },
    {
      type: 'error',
      title: '避免过度使用徽标',
      content: '徽标是强提示，过多使用会分散用户注意力。只在真正需要提醒的地方使用'
    },
  ],

  relatedComponents: ['navigation-bar', 'icon-button'],
  since: '1.0.0',
}
