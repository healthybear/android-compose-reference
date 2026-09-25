package demos

import androidx.compose.animation.*
import androidx.compose.animation.core.tween
import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.pager.HorizontalPager
import androidx.compose.foundation.pager.rememberPagerState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.launch

/**
 * OnboardingCompositionDemo 演示应用引导流程场景。
 *
 * 展示如何组合 HorizontalPager、Button、AnimatedVisibility 等组件实现：
 * - 多步骤引导页面
 * - 页面指示器
 * - 跳过/下一步/完成按钮切换
 * - 页面切换动画
 * - 完成后的状态切换
 *
 * 学习要点：
 * - HorizontalPager 实现滑动翻页
 * - 根据页面索引动态显示不同按钮
 * - AnimatedContent 实现按钮平滑过渡
 * - 引导完成后的状态管理
 */
@OptIn(ExperimentalFoundationApi::class)
@Composable
fun OnboardingCompositionDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("引导流程组合示例", style = MaterialTheme.typography.titleMedium)

        SectionLabel("应用首次启动引导")

        data class OnboardingPage(
            val title: String,
            val description: String,
            val icon: androidx.compose.ui.graphics.vector.ImageVector,
            val iconColor: androidx.compose.ui.graphics.Color
        )

        val pages = listOf(
            OnboardingPage(
                "欢迎使用",
                "探索全新的移动体验，简单高效的任务管理工具",
                Icons.Filled.Star,
                androidx.compose.ui.graphics.Color(0xFF2196F3)
            ),
            OnboardingPage(
                "智能提醒",
                "设置任务提醒，永远不会错过重要的待办事项",
                Icons.Filled.Notifications,
                androidx.compose.ui.graphics.Color(0xFF4CAF50)
            ),
            OnboardingPage(
                "团队协作",
                "与团队成员实时同步，轻松管理共享项目",
                Icons.Filled.Person,
                androidx.compose.ui.graphics.Color(0xFFFF9800)
            ),
            OnboardingPage(
                "数据安全",
                "端到端加密保护您的数据，隐私永远是第一位",
                Icons.Filled.Lock,
                androidx.compose.ui.graphics.Color(0xFF9C27B0)
            )
        )

        var onboardingCompleted by remember { mutableStateOf(false) }
        val pagerState = rememberPagerState(pageCount = { pages.size })
        val scope = rememberCoroutineScope()

        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(
                containerColor = MaterialTheme.colorScheme.surfaceVariant
            )
        ) {
            AnimatedContent(
                targetState = onboardingCompleted,
                transitionSpec = {
                    fadeIn(tween(600)) togetherWith fadeOut(tween(600))
                },
                label = "onboarding_completion"
            ) { completed ->
                if (completed) {
                    // 完成后的欢迎界面
                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(500.dp)
                            .padding(32.dp),
                        horizontalAlignment = Alignment.CenterHorizontally,
                        verticalArrangement = Arrangement.Center
                    ) {
                        Box(
                            modifier = Modifier
                                .size(120.dp)
                                .clip(CircleShape)
                                .background(MaterialTheme.colorScheme.primaryContainer),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                Icons.Filled.CheckCircle,
                                contentDescription = null,
                                modifier = Modifier.size(72.dp),
                                tint = MaterialTheme.colorScheme.primary
                            )
                        }

                        Spacer(Modifier.height(32.dp))

                        Text(
                            "一切准备就绪！",
                            style = MaterialTheme.typography.headlineMedium,
                            color = MaterialTheme.colorScheme.primary
                        )

                        Spacer(Modifier.height(16.dp))

                        Text(
                            "您已完成引导流程\n现在可以开始使用应用了",
                            style = MaterialTheme.typography.bodyLarge,
                            color = MaterialTheme.colorScheme.onSurfaceVariant,
                            textAlign = androidx.compose.ui.text.style.TextAlign.Center
                        )

                        Spacer(Modifier.height(32.dp))

                        Button(
                            onClick = { onboardingCompleted = false },
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Text("重新开始引导")
                        }
                    }
                } else {
                    // 引导页面
                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(500.dp)
                    ) {
                        // 顶部：跳过按钮
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(16.dp),
                            horizontalArrangement = Arrangement.End
                        ) {
                            AnimatedVisibility(
                                visible = pagerState.currentPage < pages.size - 1,
                                enter = fadeIn() + expandHorizontally(),
                                exit = fadeOut() + shrinkHorizontally()
                            ) {
                                TextButton(
                                    onClick = {
                                        scope.launch {
                                            pagerState.animateScrollToPage(pages.size - 1)
                                        }
                                    }
                                ) {
                                    Text("跳过")
                                }
                            }
                        }

                        // 中间：内容区域
                        HorizontalPager(
                            state = pagerState,
                            modifier = Modifier.weight(1f)
                        ) { page ->
                            Column(
                                modifier = Modifier
                                    .fillMaxSize()
                                    .padding(horizontal = 32.dp),
                                horizontalAlignment = Alignment.CenterHorizontally,
                                verticalArrangement = Arrangement.Center
                            ) {
                                Box(
                                    modifier = Modifier
                                        .size(120.dp)
                                        .clip(CircleShape)
                                        .background(pages[page].iconColor.copy(alpha = 0.2f)),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Icon(
                                        pages[page].icon,
                                        contentDescription = null,
                                        modifier = Modifier.size(64.dp),
                                        tint = pages[page].iconColor
                                    )
                                }

                                Spacer(Modifier.height(32.dp))

                                Text(
                                    pages[page].title,
                                    style = MaterialTheme.typography.headlineMedium,
                                    color = MaterialTheme.colorScheme.onSurface
                                )

                                Spacer(Modifier.height(16.dp))

                                Text(
                                    pages[page].description,
                                    style = MaterialTheme.typography.bodyLarge,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                                    textAlign = androidx.compose.ui.text.style.TextAlign.Center
                                )
                            }
                        }

                        Spacer(Modifier.height(16.dp))

                        // 页面指示器
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(horizontal = 32.dp),
                            horizontalArrangement = Arrangement.Center,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            repeat(pages.size) { index ->
                                val isSelected = pagerState.currentPage == index
                                Box(
                                    modifier = Modifier
                                        .padding(4.dp)
                                        .clip(CircleShape)
                                        .background(
                                            if (isSelected)
                                                MaterialTheme.colorScheme.primary
                                            else
                                                MaterialTheme.colorScheme.outline.copy(alpha = 0.3f)
                                        )
                                        .size(
                                            width = if (isSelected) 24.dp else 8.dp,
                                            height = 8.dp
                                        )
                                )
                            }
                        }

                        Spacer(Modifier.height(24.dp))

                        // 底部：操作按钮
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(horizontal = 32.dp, vertical = 16.dp),
                            horizontalArrangement = Arrangement.spacedBy(12.dp)
                        ) {
                            // 上一步按钮
                            AnimatedVisibility(
                                visible = pagerState.currentPage > 0,
                                enter = fadeIn() + expandHorizontally(),
                                exit = fadeOut() + shrinkHorizontally()
                            ) {
                                OutlinedButton(
                                    onClick = {
                                        scope.launch {
                                            pagerState.animateScrollToPage(pagerState.currentPage - 1)
                                        }
                                    },
                                    modifier = Modifier.weight(1f)
                                ) {
                                    Icon(
                                        Icons.Filled.ArrowBack,
                                        contentDescription = null,
                                        modifier = Modifier.size(18.dp)
                                    )
                                    Spacer(Modifier.width(8.dp))
                                    Text("上一步")
                                }
                            }

                            // 下一步/完成按钮
                            Button(
                                onClick = {
                                    scope.launch {
                                        if (pagerState.currentPage < pages.size - 1) {
                                            pagerState.animateScrollToPage(pagerState.currentPage + 1)
                                        } else {
                                            onboardingCompleted = true
                                        }
                                    }
                                },
                                modifier = Modifier.weight(1f)
                            ) {
                                AnimatedContent(
                                    targetState = pagerState.currentPage == pages.size - 1,
                                    transitionSpec = {
                                        fadeIn(tween(300)) togetherWith fadeOut(tween(300))
                                    },
                                    label = "button_text"
                                ) { isLastPage ->
                                    Row(
                                        horizontalArrangement = Arrangement.Center,
                                        verticalAlignment = Alignment.CenterVertically
                                    ) {
                                        Text(if (isLastPage) "开始使用" else "下一步")
                                        if (!isLastPage) {
                                            Spacer(Modifier.width(8.dp))
                                            Icon(
                                                Icons.Filled.ArrowForward,
                                                contentDescription = null,
                                                modifier = Modifier.size(18.dp)
                                            )
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        // 使用提示
        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(
                containerColor = MaterialTheme.colorScheme.secondaryContainer
            )
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(12.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(
                    Icons.Filled.Info,
                    contentDescription = null,
                    tint = MaterialTheme.colorScheme.onSecondaryContainer,
                    modifier = Modifier.size(20.dp)
                )
                Text(
                    "可以左右滑动浏览引导页面",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSecondaryContainer
                )
            }
        }
    }
}
