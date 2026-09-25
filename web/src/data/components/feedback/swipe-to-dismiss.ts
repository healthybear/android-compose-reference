import type { ComponentEntry } from '../../types'

export const swipeToDismissComponent: ComponentEntry = {
  id: 'swipe-to-dismiss',
  demo: { id: 'swipe-to-dismiss', sourceFile: 'SwipeToDismissDemo.kt' },
  name: 'SwipeToDismissBox',
  category: 'Feedback',
  description: '左右滑动删除/操作容器，滑动时在背景层显示操作提示，松手后触发回调，符合 Material3 规范。',
  tags: ['swipe', 'dismiss', 'delete', 'gesture', '滑动删除'],
  params: [
    { name: 'state', type: 'SwipeToDismissBoxState', required: true, description: '滑动状态，由 rememberSwipeToDismissBoxState() 创建' },
    { name: 'backgroundContent', type: '@Composable RowScope.() -> Unit', required: true, description: '滑动时显示的背景层，通常为删除/操作提示' },
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    { name: 'enableDismissFromStartToEnd', type: 'Boolean', default: 'true', description: '是否允许从左向右滑动' },
    { name: 'enableDismissFromEndToStart', type: 'Boolean', default: 'true', description: '是否允许从右向左滑动' },
    { name: 'content', type: '@Composable RowScope.() -> Unit', required: true, description: '前景内容，即列表项本身' },
  ],
  examples: [
    {
      title: '滑动删除列表项',
      code: `var items by remember { mutableStateOf(List(10) { "Item " + it.toString() }) }

LazyColumn {
    items(items, key = { it }) { item ->
        val dismissState = rememberSwipeToDismissBoxState(
            confirmValueChange = { value ->
                if (value == SwipeToDismissBoxValue.EndToStart) {
                    items = items - item
                    true
                } else false
            }
        )
        SwipeToDismissBox(
            state = dismissState,
            enableDismissFromStartToEnd = false,
            backgroundContent = {
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .background(MaterialTheme.colorScheme.errorContainer)
                        .padding(end = 16.dp),
                    contentAlignment = Alignment.CenterEnd
                ) {
                    Icon(Icons.Default.Delete, contentDescription = "删除", tint = MaterialTheme.colorScheme.onErrorContainer)
                }
            }
        ) {
            ListItem(headlineContent = { Text(item) }, modifier = Modifier.background(MaterialTheme.colorScheme.surface))
        }
    }
}`,
    },
    {
      title: '双向滑动（归档/删除）',
      code: `val dismissState = rememberSwipeToDismissBoxState(
    confirmValueChange = { value ->
        when (value) {
            SwipeToDismissBoxValue.StartToEnd -> {
                // 向右滑：归档
                onArchive()
                true
            }
            SwipeToDismissBoxValue.EndToStart -> {
                // 向左滑：删除
                onDelete()
                true
            }
            else -> false
        }
    }
)

SwipeToDismissBox(
    state = dismissState,
    backgroundContent = {
        val direction = dismissState.targetValue
        val alignment = if (direction == SwipeToDismissBoxValue.StartToEnd) {
            Alignment.CenterStart
        } else {
            Alignment.CenterEnd
        }
        val icon = if (direction == SwipeToDismissBoxValue.StartToEnd) {
            Icons.Default.Archive
        } else {
            Icons.Default.Delete
        }
        val color = if (direction == SwipeToDismissBoxValue.StartToEnd) {
            MaterialTheme.colorScheme.primaryContainer
        } else {
            MaterialTheme.colorScheme.errorContainer
        }

        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(color)
                .padding(horizontal = 16.dp),
            contentAlignment = alignment
        ) {
            Icon(icon, contentDescription = null)
        }
    }
) {
    Card(modifier = Modifier.fillMaxWidth()) {
        Text("向左删除，向右归档", modifier = Modifier.padding(16.dp))
    }
}`,
    },
    {
      title: '带动画的删除效果',
      code: `var items by remember { mutableStateOf(List(10) { "Item " + it.toString() }) }

LazyColumn {
    items(items, key = { it }) { item ->
        val dismissState = rememberSwipeToDismissBoxState(
            confirmValueChange = { value ->
                if (value != SwipeToDismissBoxValue.Settled) {
                    items = items - item
                    true
                } else false
            }
        )

        AnimatedVisibility(
            visible = items.contains(item),
            exit = shrinkVertically() + fadeOut()
        ) {
            SwipeToDismissBox(
                state = dismissState,
                enableDismissFromStartToEnd = false,
                backgroundContent = {
                    val backgroundColor by animateColorAsState(
                        when (dismissState.targetValue) {
                            SwipeToDismissBoxValue.EndToStart -> MaterialTheme.colorScheme.errorContainer
                            else -> Color.Transparent
                        },
                        label = "background"
                    )
                    Box(
                        modifier = Modifier
                            .fillMaxSize()
                            .background(backgroundColor)
                            .padding(end = 16.dp),
                        contentAlignment = Alignment.CenterEnd
                    ) {
                        Icon(Icons.Default.Delete, contentDescription = "删除")
                    }
                }
            ) {
                ListItem(
                    headlineContent = { Text(item) },
                    modifier = Modifier.background(MaterialTheme.colorScheme.surface)
                )
            }
        }
    }
}`,
    },
    {
      title: '撤销删除功能',
      code: `var items by remember { mutableStateOf(List(10) { "Item " + it.toString() }) }
var deletedItem by remember { mutableStateOf<String?>(null) }
val scope = rememberCoroutineScope()

Scaffold(
    snackbarHost = { SnackbarHost(hostState = snackbarHostState) }
) { padding ->
    LazyColumn(contentPadding = padding) {
        items(items, key = { it }) { item ->
            val dismissState = rememberSwipeToDismissBoxState(
                confirmValueChange = { value ->
                    if (value == SwipeToDismissBoxValue.EndToStart) {
                        deletedItem = item
                        items = items - item

                        scope.launch {
                            val result = snackbarHostState.showSnackbar(
                                message = "已删除",
                                actionLabel = "撤销",
                                duration = SnackbarDuration.Short
                            )
                            if (result == SnackbarResult.ActionPerformed) {
                                items = items + deletedItem!!
                            }
                        }
                        true
                    } else false
                }
            )

            SwipeToDismissBox(
                state = dismissState,
                enableDismissFromStartToEnd = false,
                backgroundContent = {
                    Box(
                        modifier = Modifier
                            .fillMaxSize()
                            .background(MaterialTheme.colorScheme.errorContainer),
                        contentAlignment = Alignment.CenterEnd
                    ) {
                        Icon(
                            Icons.Default.Delete,
                            contentDescription = null,
                            modifier = Modifier.padding(16.dp)
                        )
                    }
                }
            ) {
                ListItem(
                    headlineContent = { Text(item) },
                    modifier = Modifier.background(MaterialTheme.colorScheme.surface)
                )
            }
        }
    }
}`,
    },
    {
      title: '自定义滑动阈值',
      code: `val dismissState = rememberSwipeToDismissBoxState(
    confirmValueChange = { value ->
        if (value == SwipeToDismissBoxValue.EndToStart) {
            onDismiss()
            true
        } else false
    },
    positionalThreshold = { distance -> distance * 0.5f }  // 滑动一半即触发
)

SwipeToDismissBox(
    state = dismissState,
    enableDismissFromStartToEnd = false,
    backgroundContent = {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(MaterialTheme.colorScheme.errorContainer),
            contentAlignment = Alignment.CenterEnd
        ) {
            Column(
                modifier = Modifier.padding(16.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Icon(Icons.Default.Delete, contentDescription = null)
                Text("删除", fontSize = 12.sp)
            }
        }
    }
) {
    Card(modifier = Modifier.fillMaxWidth().padding(8.dp)) {
        Text("滑动一半即可删除", modifier = Modifier.padding(16.dp))
    }
}`,
    },
    {
      title: '多种操作选项',
      code: `SwipeToDismissBox(
    state = dismissState,
    backgroundContent = {
        val direction = dismissState.dismissDirection
        Row(
            modifier = Modifier
                .fillMaxSize()
                .background(
                    when (direction) {
                        SwipeToDismissBoxValue.StartToEnd -> Color(0xFF4CAF50)
                        SwipeToDismissBoxValue.EndToStart -> Color(0xFFF44336)
                        else -> Color.Transparent
                    }
                )
                .padding(horizontal = 16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            // 左侧图标
            if (direction == SwipeToDismissBoxValue.StartToEnd) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(Icons.Default.Check, contentDescription = null, tint = Color.White)
                    Spacer(Modifier.width(8.dp))
                    Text("完成", color = Color.White, fontWeight = FontWeight.Bold)
                }
            }

            Spacer(Modifier.weight(1f))

            // 右侧图标
            if (direction == SwipeToDismissBoxValue.EndToStart) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text("删除", color = Color.White, fontWeight = FontWeight.Bold)
                    Spacer(Modifier.width(8.dp))
                    Icon(Icons.Default.Delete, contentDescription = null, tint = Color.White)
                }
            }
        }
    }
) {
    Surface(
        modifier = Modifier.fillMaxWidth(),
        shadowElevation = 2.dp
    ) {
        Text("待办事项", modifier = Modifier.padding(16.dp))
    }
}`,
    },
  ],

  useCases: [
    {
      title: '邮件应用收件箱',
      description: '实现类似 Gmail 的邮件滑动归档/删除功能',
      code: `data class Email(val id: Int, val subject: String, val sender: String)

@Composable
fun EmailInbox() {
    var emails by remember {
        mutableStateOf(
            List(20) { index ->
                Email(index, "邮件主题 " + index.toString(), "发件人 " + index.toString())
            }
        )
    }
    val scope = rememberCoroutineScope()
    val snackbarHostState = remember { SnackbarHostState() }

    Scaffold(
        snackbarHost = { SnackbarHost(snackbarHostState) }
    ) { padding ->
        LazyColumn(contentPadding = padding) {
            items(emails, key = { it.id }) { email ->
                val dismissState = rememberSwipeToDismissBoxState(
                    confirmValueChange = { dismissValue ->
                        when (dismissValue) {
                            SwipeToDismissBoxValue.StartToEnd -> {
                                // 归档
                                emails = emails - email
                                scope.launch {
                                    snackbarHostState.showSnackbar("已归档")
                                }
                                true
                            }
                            SwipeToDismissBoxValue.EndToStart -> {
                                // 删除
                                emails = emails - email
                                scope.launch {
                                    snackbarHostState.showSnackbar("已删除")
                                }
                                true
                            }
                            else -> false
                        }
                    }
                )

                SwipeToDismissBox(
                    state = dismissState,
                    backgroundContent = {
                        val direction = dismissState.dismissDirection
                        val color = when (direction) {
                            SwipeToDismissBoxValue.StartToEnd -> Color(0xFF4CAF50)
                            SwipeToDismissBoxValue.EndToStart -> Color(0xFFE53935)
                            else -> Color.Transparent
                        }
                        val alignment = when (direction) {
                            SwipeToDismissBoxValue.StartToEnd -> Alignment.CenterStart
                            SwipeToDismissBoxValue.EndToStart -> Alignment.CenterEnd
                            else -> Alignment.Center
                        }
                        val icon = when (direction) {
                            SwipeToDismissBoxValue.StartToEnd -> Icons.Default.Archive
                            SwipeToDismissBoxValue.EndToStart -> Icons.Default.Delete
                            else -> Icons.Default.Email
                        }

                        Box(
                            modifier = Modifier
                                .fillMaxSize()
                                .background(color)
                                .padding(horizontal = 20.dp),
                            contentAlignment = alignment
                        ) {
                            Icon(icon, contentDescription = null, tint = Color.White)
                        }
                    }
                ) {
                    ListItem(
                        headlineContent = { Text(email.subject) },
                        supportingContent = { Text(email.sender) },
                        leadingContent = {
                            Icon(
                                Icons.Default.Email,
                                contentDescription = null,
                                tint = MaterialTheme.colorScheme.primary
                            )
                        },
                        modifier = Modifier
                            .fillMaxWidth()
                            .background(MaterialTheme.colorScheme.surface)
                    )
                }

                HorizontalDivider()
            }
        }
    }
}`
    },
    {
      title: '购物车商品管理',
      description: '滑动删除购物车商品，带撤销功能',
      code: `data class CartItem(val id: Int, val name: String, val price: Float)

@Composable
fun ShoppingCart() {
    var cartItems by remember {
        mutableStateOf(
            listOf(
                CartItem(1, "商品 A", 99.99f),
                CartItem(2, "商品 B", 149.99f),
                CartItem(3, "商品 C", 79.99f)
            )
        )
    }
    var recentlyDeleted by remember { mutableStateOf<CartItem?>(null) }
    val scope = rememberCoroutineScope()
    val snackbarHostState = remember { SnackbarHostState() }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("购物车 (" + cartItems.size.toString() + ")") }
            )
        },
        snackbarHost = { SnackbarHost(snackbarHostState) }
    ) { padding ->
        LazyColumn(
            contentPadding = padding,
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            items(cartItems, key = { it.id }) { item ->
                val dismissState = rememberSwipeToDismissBoxState(
                    confirmValueChange = { value ->
                        if (value == SwipeToDismissBoxValue.EndToStart) {
                            recentlyDeleted = item
                            cartItems = cartItems - item

                            scope.launch {
                                val result = snackbarHostState.showSnackbar(
                                    message = "已从购物车移除",
                                    actionLabel = "撤销",
                                    duration = SnackbarDuration.Short
                                )
                                if (result == SnackbarResult.ActionPerformed) {
                                    cartItems = cartItems + recentlyDeleted!!
                                    recentlyDeleted = null
                                }
                            }
                            true
                        } else false
                    }
                )

                SwipeToDismissBox(
                    state = dismissState,
                    enableDismissFromStartToEnd = false,
                    backgroundContent = {
                        Box(
                            modifier = Modifier
                                .fillMaxSize()
                                .background(MaterialTheme.colorScheme.errorContainer)
                                .padding(horizontal = 20.dp),
                            contentAlignment = Alignment.CenterEnd
                        ) {
                            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                                Icon(
                                    Icons.Default.Delete,
                                    contentDescription = null,
                                    tint = MaterialTheme.colorScheme.onErrorContainer
                                )
                                Text(
                                    "删除",
                                    color = MaterialTheme.colorScheme.onErrorContainer,
                                    fontSize = 12.sp
                                )
                            }
                        }
                    }
                ) {
                    Card(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(horizontal = 16.dp)
                    ) {
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(16.dp),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Column {
                                Text(
                                    item.name,
                                    style = MaterialTheme.typography.bodyLarge
                                )
                                Text(
                                    "¥" + item.price.toString(),
                                    style = MaterialTheme.typography.bodyMedium,
                                    color = MaterialTheme.colorScheme.primary
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}`
    },
  ],

  bestPractices: [
    {
      title: '使用 confirmValueChange 确认删除',
      description: 'confirmValueChange 返回 true 才会真正 dismiss，可以在这里执行删除逻辑',
      goodExample: `val dismissState = rememberSwipeToDismissBoxState(
    confirmValueChange = { value ->
        if (value == SwipeToDismissBoxValue.EndToStart) {
            // 先从列表移除
            items = items - item
            // 返回 true 允许 dismiss
            true
        } else false
    }
)`,
      badExample: `val dismissState = rememberSwipeToDismissBoxState()

SwipeToDismissBox(state = dismissState) {
    // dismiss 后才删除，会导致闪烁
    LaunchedEffect(dismissState.currentValue) {
        if (dismissState.currentValue != SwipeToDismissBoxValue.Settled) {
            items = items - item
        }
    }
}`,
    },
    {
      title: '使用 key 参数保证列表稳定性',
      description: '在 LazyColumn items 中必须提供唯一 key，避免删除错误项',
      goodExample: `LazyColumn {
    items(items, key = { it.id }) { item ->
        SwipeToDismissBox(/* ... */) {
            ListItem(/* ... */)
        }
    }
}`,
      badExample: `LazyColumn {
    items(items) { item ->  // 没有 key，删除时可能混乱
        SwipeToDismissBox(/* ... */) {
            ListItem(/* ... */)
        }
    }
}`,
    },
    {
      title: '根据滑动方向显示不同背景',
      description: '通过 dismissState.dismissDirection 判断滑动方向，显示对应的操作提示',
      goodExample: `backgroundContent = {
    val direction = dismissState.dismissDirection
    val alignment = if (direction == SwipeToDismissBoxValue.StartToEnd) {
        Alignment.CenterStart
    } else {
        Alignment.CenterEnd
    }
    val icon = if (direction == SwipeToDismissBoxValue.StartToEnd) {
        Icons.Default.Archive
    } else {
        Icons.Default.Delete
    }

    Box(
        modifier = Modifier.fillMaxSize().background(color),
        contentAlignment = alignment
    ) {
        Icon(icon, contentDescription = null)
    }
}`,
      badExample: `backgroundContent = {
    // 固定显示删除图标，无法区分方向
    Box(Modifier.fillMaxSize().background(Color.Red)) {
        Icon(Icons.Default.Delete, contentDescription = null)
    }
}`,
    },
    {
      title: '结合 AnimatedVisibility 实现平滑删除',
      description: '使用 AnimatedVisibility 包裹 SwipeToDismissBox，删除时有动画过渡',
      goodExample: `AnimatedVisibility(
    visible = items.contains(item),
    exit = shrinkVertically() + fadeOut()
) {
    SwipeToDismissBox(/* ... */) {
        ListItem(/* ... */)
    }
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'Material 3 设计规范',
      content: 'SwipeToDismissBox 是 Material 3 组件，遵循 Material Design 的滑动删除模式和动画规范'
    },
    {
      type: 'tip',
      title: '使用 positionalThreshold 自定义触发阈值',
      content: '默认需要滑动一半距离才触发 dismiss，可以通过 positionalThreshold 参数自定义阈值'
    },
    {
      type: 'tip',
      title: '提供撤销功能',
      content: '删除重要数据时，建议通过 Snackbar 提供撤销选项，避免误操作导致数据丢失'
    },
    {
      type: 'warning',
      title: '在 LazyColumn 中必须使用 key',
      content: '使用 items(list, key = { it.id }) 提供唯一标识，否则滑动删除时可能出现错误的项被删除'
    },
    {
      type: 'warning',
      title: 'enableDismissFromStartToEnd 控制方向',
      content: '如果只需要单向滑动删除，设置 enableDismissFromStartToEnd = false 或 enableDismissFromEndToStart = false'
    },
    {
      type: 'danger',
      title: 'confirmValueChange 必须返回布尔值',
      content: 'confirmValueChange 返回 false 会阻止 dismiss 并回弹，返回 true 才会执行 dismiss 动画'
    },
  ],

  relatedComponents: ['basic-alert-dialog', 'snackbar'],
  since: '1.2.0',
}
