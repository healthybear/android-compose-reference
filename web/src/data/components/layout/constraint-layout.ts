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
// implementation("androidx.constraintlayout:constraintlayout-compose:1.1.1")

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
      title: 'Guideline + Barrier',
      code: `ConstraintLayout(modifier = Modifier.fillMaxWidth().padding(16.dp)) {
    val (label1, label2, field1, field2) = createRefs()

    // 垂直 Guideline，距左侧 30%
    val guideline = createGuidelineFromStart(0.3f)

    // Barrier：跟随最宽的 label
    val barrier = createEndBarrier(label1, label2)

    Text("用户名", modifier = Modifier.constrainAs(label1) {
        top.linkTo(parent.top)
        end.linkTo(guideline)
    })
    Text("密码", modifier = Modifier.constrainAs(label2) {
        top.linkTo(label1.bottom, margin = 16.dp)
        end.linkTo(guideline)
    })
    OutlinedTextField(value = "", onValueChange = {}, modifier = Modifier.constrainAs(field1) {
        top.linkTo(label1.top)
        start.linkTo(barrier, margin = 8.dp)
        end.linkTo(parent.end)
        width = Dimension.fillToConstraints
    })
    OutlinedTextField(value = "", onValueChange = {}, modifier = Modifier.constrainAs(field2) {
        top.linkTo(label2.top)
        start.linkTo(barrier, margin = 8.dp)
        end.linkTo(parent.end)
        width = Dimension.fillToConstraints
    })
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

ConstraintLayout(constraintSet = constraints, modifier = Modifier.fillMaxSize()) {
    Box(modifier = Modifier.background(MaterialTheme.colorScheme.primary).layoutId("box"))
    Text("居中方块", modifier = Modifier.layoutId("text"))
}`,
    },
  ],
}
