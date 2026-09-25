import type { ComponentEntry } from '../../types'

export const pointerInputComponent: ComponentEntry = {
  id: 'modifier-pointer-input',
  demo: { id: 'modifier-pointer-input', sourceFile: 'ModifierPointerInputDemo.kt' },
  name: 'Modifier.pointerInput',
  category: 'Modifier',
  description: '底层指针输入处理，通过 PointerInputScope 挂起函数处理原始触摸/鼠标事件，是 detectTapGestures 等高层 API 的基础。',
  tags: ['pointer', 'touch', 'gesture', 'input', '指针输入'],
  params: [
    { name: 'key1', type: 'Any?', required: true, description: '当 key 变化时重启手势处理协程，通常传入与手势相关的状态' },
    { name: 'block', type: 'suspend PointerInputScope.() -> Unit', required: true, description: '手势处理挂起函数，在此使用 detect* 系列函数' },
  ],
  examples: [
    {
      title: '自定义点击与长按',
      code: `Box(
    modifier = Modifier
        .size(100.dp)
        .background(MaterialTheme.colorScheme.primary)
        .pointerInput(Unit) {
            detectTapGestures(
                onTap = { offset ->
                    println("点击位置：" + offset.x + ", " + offset.y)
                },
                onLongPress = { offset ->
                    println("长按位置：" + offset.x + ", " + offset.y)
                },
                onDoubleTap = {
                    println("双击")
                }
            )
        }
)`,
    },
    {
      title: '多点触控（原始事件）',
      code: `var pointerCount by remember { mutableIntStateOf(0) }

Box(
    modifier = Modifier
        .fillMaxSize()
        .pointerInput(Unit) {
            awaitEachGesture {
                // 等待第一个手指按下
                val down = awaitFirstDown()
                pointerCount = 1

                // 持续追踪所有指针
                do {
                    val event = awaitPointerEvent()
                    pointerCount = event.changes.count { it.pressed }
                } while (event.changes.any { it.pressed })

                pointerCount = 0
            }
        },
    contentAlignment = Alignment.Center
) {
    Text("当前触点数：" + pointerCount)
}`,
    },
    {
      title: '自定义拖拽（原始实现）',
      code: `var offset by remember { mutableStateOf(Offset.Zero) }

Box(
    modifier = Modifier
        .offset { IntOffset(offset.x.roundToInt(), offset.y.roundToInt()) }
        .size(80.dp)
        .background(MaterialTheme.colorScheme.tertiary, CircleShape)
        .pointerInput(Unit) {
            detectDragGestures { _, dragAmount ->
                offset += dragAmount
            }
        }
)`,
    },
    {
      title: '追踪触摸轨迹',
      code: `var touchPoints by remember { mutableStateOf(listOf<Offset>()) }

Canvas(
    modifier = Modifier
        .fillMaxSize()
        .background(Color.White)
        .pointerInput(Unit) {
            awaitEachGesture {
                val down = awaitFirstDown()
                touchPoints = listOf(down.position)

                do {
                    val event = awaitPointerEvent()
                    event.changes.forEach { change ->
                        if (change.pressed) {
                            touchPoints = touchPoints + change.position
                            change.consume()
                        }
                    }
                } while (event.changes.any { it.pressed })
            }
        }
) {
    // 绘制触摸轨迹
    if (touchPoints.size > 1) {
        val path = Path().apply {
            moveTo(touchPoints.first().x, touchPoints.first().y)
            touchPoints.drop(1).forEach { point ->
                lineTo(point.x, point.y)
            }
        }
        drawPath(
            path = path,
            color = Color.Blue,
            style = Stroke(width = 5f)
        )
    }
}`,
    },
    {
      title: '按压力度检测',
      code: `var pressure by remember { mutableFloatStateOf(0f) }
var pressurePosition by remember { mutableStateOf(Offset.Zero) }

Box(
    modifier = Modifier
        .fillMaxSize()
        .background(Color.LightGray)
        .pointerInput(Unit) {
            awaitEachGesture {
                awaitFirstDown()
                do {
                    val event = awaitPointerEvent()
                    event.changes.firstOrNull()?.let { change ->
                        pressure = change.pressure
                        pressurePosition = change.position
                    }
                } while (event.changes.any { it.pressed })
                pressure = 0f
            }
        }
) {
    if (pressure > 0f) {
        Box(
            modifier = Modifier
                .offset {
                    IntOffset(
                        (pressurePosition.x - 50).roundToInt(),
                        (pressurePosition.y - 50).roundToInt()
                    )
                }
                .size((50 + pressure * 100).dp)
                .background(
                    Color.Red.copy(alpha = pressure),
                    CircleShape
                )
        )
    }
    Text(
        text = "按压力度: " + "%.2f".format(pressure),
        modifier = Modifier
            .align(Alignment.TopCenter)
            .padding(16.dp)
    )
}`,
    },
    {
      title: '自定义手势冲突处理',
      code: `var canScroll by remember { mutableStateOf(true) }
var dragDirection by remember { mutableStateOf<String?>(null) }

LazyColumn(
    modifier = Modifier.fillMaxSize(),
    userScrollEnabled = canScroll
) {
    items(20) { index ->
        var itemOffset by remember { mutableFloatStateOf(0f) }

        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(60.dp)
                .offset { IntOffset(itemOffset.roundToInt(), 0) }
                .background(MaterialTheme.colorScheme.surface)
                .border(1.dp, Color.Gray)
                .pointerInput(Unit) {
                    awaitEachGesture {
                        val down = awaitFirstDown()
                        var totalDrag = Offset.Zero

                        do {
                            val event = awaitPointerEvent()
                            val change = event.changes.first()
                            val drag = change.position - change.previousPosition
                            totalDrag += drag

                            // 判断拖动方向
                            if (dragDirection == null && totalDrag.getDistance() > 20f) {
                                dragDirection = if (abs(totalDrag.x) > abs(totalDrag.y)) {
                                    "horizontal"
                                } else {
                                    "vertical"
                                }
                            }

                            // 水平拖动时禁用滚动
                            if (dragDirection == "horizontal") {
                                canScroll = false
                                itemOffset += drag.x
                                change.consume()
                            }

                        } while (event.changes.any { it.pressed })

                        // 手势结束，重置状态
                        dragDirection = null
                        canScroll = true
                    }
                },
            contentAlignment = Alignment.CenterStart
        ) {
            Text("项目 " + index, modifier = Modifier.padding(16.dp))
        }
    }
}`,
    },
  ],

  useCases: [
    {
      title: '画板应用',
      description: '记录触摸轨迹并实时绘制',
      code: `@Composable
fun DrawingBoard() {
    var paths by remember { mutableStateOf(listOf<List<Offset>>()) }
    var currentPath by remember { mutableStateOf(listOf<Offset>()) }

    Column {
        // 工具栏
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(8.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Button(onClick = { paths = emptyList() }) {
                Text("清空")
            }
            Button(
                onClick = { if (paths.isNotEmpty()) paths = paths.dropLast(1) }
            ) {
                Text("撤销")
            }
        }

        // 画布
        Canvas(
            modifier = Modifier
                .fillMaxSize()
                .background(Color.White)
                .pointerInput(Unit) {
                    awaitEachGesture {
                        val down = awaitFirstDown()
                        currentPath = listOf(down.position)

                        do {
                            val event = awaitPointerEvent()
                            event.changes.forEach { change ->
                                if (change.pressed) {
                                    currentPath = currentPath + change.position
                                    change.consume()
                                }
                            }
                        } while (event.changes.any { it.pressed })

                        // 手指抬起，保存当前路径
                        if (currentPath.size > 1) {
                            paths = paths + listOf(currentPath)
                            currentPath = emptyList()
                        }
                    }
                }
        ) {
            // 绘制已完成的路径
            paths.forEach { path ->
                if (path.size > 1) {
                    drawPath(
                        path = Path().apply {
                            moveTo(path.first().x, path.first().y)
                            path.drop(1).forEach { point ->
                                lineTo(point.x, point.y)
                            }
                        },
                        color = Color.Black,
                        style = Stroke(width = 5f, cap = StrokeCap.Round)
                    )
                }
            }

            // 绘制当前路径
            if (currentPath.size > 1) {
                drawPath(
                    path = Path().apply {
                        moveTo(currentPath.first().x, currentPath.first().y)
                        currentPath.drop(1).forEach { point ->
                            lineTo(point.x, point.y)
                        }
                    },
                    color = Color.Blue,
                    style = Stroke(width = 5f, cap = StrokeCap.Round)
                )
            }
        }
    }
}`,
    },
    {
      title: '自定义缩放手势',
      description: '使用原始事件实现双指缩放',
      code: `@Composable
fun CustomZoomImage(painter: Painter) {
    var scale by remember { mutableFloatStateOf(1f) }
    var offset by remember { mutableStateOf(Offset.Zero) }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .pointerInput(Unit) {
                awaitEachGesture {
                    var zoom = 1f
                    var pan = Offset.Zero
                    var pastTouchSlop = false

                    awaitFirstDown(requireUnconsumed = false)

                    do {
                        val event = awaitPointerEvent()
                        val canceled = event.changes.any { it.isConsumed }

                        if (!canceled) {
                            val zoomChange = event.calculateZoom()
                            val panChange = event.calculatePan()

                            if (!pastTouchSlop) {
                                zoom *= zoomChange
                                pan += panChange

                                val centroidSize = event.calculateCentroidSize(useCurrent = false)
                                val zoomMotion = abs(1 - zoom) * centroidSize
                                val panMotion = pan.getDistance()

                                if (zoomMotion > touchSlop || panMotion > touchSlop) {
                                    pastTouchSlop = true
                                }
                            }

                            if (pastTouchSlop) {
                                scale = (scale * zoomChange).coerceIn(0.5f, 5f)
                                offset += panChange
                                event.changes.forEach { it.consume() }
                            }
                        }
                    } while (!canceled && event.changes.any { it.pressed })
                }
            }
    ) {
        Image(
            painter = painter,
            contentDescription = null,
            modifier = Modifier
                .fillMaxSize()
                .graphicsLayer(
                    scaleX = scale,
                    scaleY = scale,
                    translationX = offset.x,
                    translationY = offset.y
                )
        )
    }
}`,
    },
  ],

  bestPractices: [
    {
      title: '使用 Unit 作为不变的 key',
      description: '当手势逻辑不依赖外部状态时，使用 Unit 作为 key 避免重启协程',
      goodExample: `Modifier.pointerInput(Unit) {
    detectTapGestures { /* ... */ }
}`,
      badExample: `// 每次重组都会重启手势协程
Modifier.pointerInput(Random.nextInt()) {
    detectTapGestures { /* ... */ }
}`,
    },
    {
      title: '需要读取外部状态时传入 key',
      description: 'pointerInput 的 lambda 不会因外部状态变化而重新执行，需要将状态作为 key',
      goodExample: `var enabled by remember { mutableStateOf(true) }

Modifier.pointerInput(enabled) {
    if (enabled) {
        detectTapGestures { /* ... */ }
    }
}`,
      badExample: `var enabled by remember { mutableStateOf(true) }

Modifier.pointerInput(Unit) {
    if (enabled) {  // enabled 变化不会重启协程
        detectTapGestures { /* ... */ }
    }
}`,
    },
    {
      title: '使用 awaitEachGesture 处理连续手势',
      description: 'awaitEachGesture 会在手势结束后自动重启，适合处理连续触摸',
      goodExample: `pointerInput(Unit) {
    awaitEachGesture {
        val down = awaitFirstDown()
        // 处理手势...
    }  // 自动循环等待下一次手势
}`,
    },
    {
      title: '调用 consume() 消费事件',
      description: '处理事件后调用 consume() 防止事件传播到父组件',
      goodExample: `awaitPointerEvent().changes.forEach { change ->
    if (change.pressed) {
        handleChange(change)
        change.consume()
    }
}`,
    },
  ],

  notes: [
    {
      type: 'info',
      title: 'PointerInputScope 提供协程作用域',
      content: 'pointerInput 的 lambda 在 PointerInputScope 中执行，可以使用 awaitPointerEvent、detectTapGestures 等挂起函数',
    },
    {
      type: 'info',
      title: 'key 参数控制协程生命周期',
      content: '当 key 变化时，当前手势协程会被取消并重启。使用 Unit 表示永不重启',
    },
    {
      type: 'tip',
      title: '高层 API 优先',
      content: '优先使用 detectTapGestures、detectDragGestures 等高层 API，只在需要完全自定义时才使用原始事件',
    },
    {
      type: 'tip',
      title: 'PointerInputChange 包含丰富信息',
      content: 'PointerInputChange 提供位置、压力、历史位置、时间戳等信息，可以实现复杂的手势识别',
    },
    {
      type: 'warning',
      title: 'awaitPointerEvent 会挂起',
      content: 'awaitPointerEvent() 会挂起协程直到有新的指针事件，不要在其后立即执行耗时操作',
    },
    {
      type: 'warning',
      title: '避免在 lambda 外部捕获可变状态',
      content: '如果手势处理需要读取外部状态，要么将状态作为 key，要么使用 rememberUpdatedState',
    },
    {
      type: 'danger',
      title: '注意手势冲突',
      content: '在滚动容器内使用自定义手势时，需要正确调用 consume() 或配合 nestedScroll 避免冲突',
    },
  ],

  relatedComponents: ['detect-tap-gestures', 'detect-drag-gestures', 'modifier-clickable'],
  since: '1.0.0',
}
