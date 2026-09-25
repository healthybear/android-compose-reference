package demos

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

/**
 * FormCompositionDemo 演示多组件组合使用：构建完整的表单场景。
 *
 * 本示例展示如何将 TextField、Checkbox、Button、Dialog 等组件
 * 组合成实际应用中的表单流程，包含：
 * - 输入验证（实时和提交时）
 * - 加载状态处理
 * - 成功/失败反馈
 * - 表单重置
 *
 * 学习要点：
 * - 表单状态管理：使用多个 remember 管理不同字段
 * - 验证逻辑：分离验证函数，保持代码清晰
 * - 用户体验：禁用提交按钮直到表单有效
 * - 异步处理：模拟网络请求的加载和结果反馈
 */
@Composable
fun FormCompositionDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        Text("表单组合示例", style = MaterialTheme.typography.titleMedium)

        // ── 1. 注册表单 ───────────────────────────────────────
        SectionLabel("完整注册表单")

        var username by remember { mutableStateOf("") }
        var email by remember { mutableStateOf("") }
        var password by remember { mutableStateOf("") }
        var confirmPassword by remember { mutableStateOf("") }
        var agreeTerms by remember { mutableStateOf(false) }
        var passwordVisible by remember { mutableStateOf(false) }
        var isSubmitting by remember { mutableStateOf(false) }
        var showSuccessDialog by remember { mutableStateOf(false) }
        var errorMessage by remember { mutableStateOf<String?>(null) }

        val scope = rememberCoroutineScope()

        // 验证逻辑
        val usernameError = username.isNotEmpty() && username.length < 3
        val emailError = email.isNotEmpty() && !email.contains("@")
        val passwordError = password.isNotEmpty() && password.length < 6
        val confirmPasswordError = confirmPassword.isNotEmpty() && password != confirmPassword
        val isFormValid = username.length >= 3 &&
                         email.contains("@") &&
                         password.length >= 6 &&
                         password == confirmPassword &&
                         agreeTerms

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
                // 用户名
                OutlinedTextField(
                    value = username,
                    onValueChange = { username = it },
                    label = { Text("用户名") },
                    leadingIcon = { Icon(Icons.Filled.Person, contentDescription = null) },
                    isError = usernameError,
                    supportingText = {
                        if (usernameError) {
                            Text("用户名至少 3 个字符")
                        } else {
                            Text("${username.length} / 3")
                        }
                    },
                    modifier = Modifier.fillMaxWidth(),
                    singleLine = true
                )

                // 邮箱
                OutlinedTextField(
                    value = email,
                    onValueChange = { email = it },
                    label = { Text("邮箱") },
                    leadingIcon = { Icon(Icons.Filled.Email, contentDescription = null) },
                    isError = emailError,
                    supportingText = {
                        if (emailError) {
                            Text("请输入有效的邮箱地址")
                        } else {
                            Text("用于接收验证邮件")
                        }
                    },
                    trailingIcon = {
                        if (emailError) {
                            Icon(
                                Icons.Filled.Warning,
                                contentDescription = null,
                                tint = MaterialTheme.colorScheme.error
                            )
                        }
                    },
                    modifier = Modifier.fillMaxWidth(),
                    singleLine = true
                )

                // 密码
                OutlinedTextField(
                    value = password,
                    onValueChange = { password = it },
                    label = { Text("密码") },
                    leadingIcon = { Icon(Icons.Filled.Lock, contentDescription = null) },
                    visualTransformation = if (passwordVisible)
                        VisualTransformation.None
                    else
                        PasswordVisualTransformation(),
                    isError = passwordError,
                    supportingText = {
                        if (passwordError) {
                            Text("密码至少 6 个字符")
                        } else {
                            Text("强度：${when {
                                password.length < 6 -> "弱"
                                password.length < 10 -> "中"
                                else -> "强"
                            }}")
                        }
                    },
                    trailingIcon = {
                        IconButton(onClick = { passwordVisible = !passwordVisible }) {
                            Icon(
                                if (passwordVisible) Icons.Filled.Check else Icons.Filled.AccountCircle,
                                contentDescription = if (passwordVisible) "隐藏密码" else "显示密码"
                            )
                        }
                    },
                    modifier = Modifier.fillMaxWidth(),
                    singleLine = true
                )

                // 确认密码
                OutlinedTextField(
                    value = confirmPassword,
                    onValueChange = { confirmPassword = it },
                    label = { Text("确认密码") },
                    leadingIcon = { Icon(Icons.Filled.Lock, contentDescription = null) },
                    visualTransformation = PasswordVisualTransformation(),
                    isError = confirmPasswordError,
                    supportingText = {
                        if (confirmPasswordError) {
                            Text("两次密码不一致")
                        }
                    },
                    trailingIcon = {
                        if (confirmPassword.isNotEmpty() && !confirmPasswordError) {
                            Icon(
                                Icons.Filled.Check,
                                contentDescription = null,
                                tint = MaterialTheme.colorScheme.primary
                            )
                        }
                    },
                    modifier = Modifier.fillMaxWidth(),
                    singleLine = true
                )

                // 同意条款
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Checkbox(
                        checked = agreeTerms,
                        onCheckedChange = { agreeTerms = it }
                    )
                    Text(
                        "我已阅读并同意用户协议和隐私政策",
                        style = MaterialTheme.typography.bodySmall
                    )
                }

                // 错误提示
                errorMessage?.let { message ->
                    Card(
                        colors = CardDefaults.cardColors(
                            containerColor = MaterialTheme.colorScheme.errorContainer
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
                                Icons.Filled.Warning,
                                contentDescription = null,
                                tint = MaterialTheme.colorScheme.error
                            )
                            Text(
                                message,
                                style = MaterialTheme.typography.bodySmall,
                                color = MaterialTheme.colorScheme.onErrorContainer
                            )
                        }
                    }
                }

                // 提交按钮
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Button(
                        onClick = {
                            scope.launch {
                                errorMessage = null
                                isSubmitting = true
                                delay(2000) // 模拟网络请求

                                // 模拟随机成功/失败
                                if ((0..1).random() == 0) {
                                    isSubmitting = false
                                    showSuccessDialog = true
                                } else {
                                    isSubmitting = false
                                    errorMessage = "注册失败：该用户名已被占用"
                                }
                            }
                        },
                        enabled = isFormValid && !isSubmitting,
                        modifier = Modifier.weight(1f)
                    ) {
                        if (isSubmitting) {
                            CircularProgressIndicator(
                                modifier = Modifier.size(16.dp),
                                strokeWidth = 2.dp,
                                color = MaterialTheme.colorScheme.onPrimary
                            )
                            Spacer(Modifier.width(8.dp))
                            Text("提交中…")
                        } else {
                            Text("立即注册")
                        }
                    }

                    OutlinedButton(
                        onClick = {
                            username = ""
                            email = ""
                            password = ""
                            confirmPassword = ""
                            agreeTerms = false
                            errorMessage = null
                        },
                        enabled = !isSubmitting
                    ) {
                        Text("重置")
                    }
                }

                // 表单状态提示
                Text(
                    when {
                        isSubmitting -> "正在提交表单…"
                        !isFormValid -> "请填写完整并有效的信息"
                        else -> "表单填写完成，可以提交"
                    },
                    style = MaterialTheme.typography.labelSmall,
                    color = when {
                        isSubmitting -> MaterialTheme.colorScheme.primary
                        !isFormValid -> MaterialTheme.colorScheme.outline
                        else -> MaterialTheme.colorScheme.primary
                    },
                    modifier = Modifier.fillMaxWidth()
                )
            }
        }

        // 成功对话框
        if (showSuccessDialog) {
            AlertDialog(
                onDismissRequest = { showSuccessDialog = false },
                icon = {
                    Icon(
                        Icons.Filled.Check,
                        contentDescription = null,
                        tint = MaterialTheme.colorScheme.primary,
                        modifier = Modifier.size(48.dp)
                    )
                },
                title = { Text("注册成功！") },
                text = {
                    Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                        Text("欢迎加入，$username！")
                        Text(
                            "验证邮件已发送至 $email",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                },
                confirmButton = {
                    Button(onClick = {
                        showSuccessDialog = false
                        // 重置表单
                        username = ""
                        email = ""
                        password = ""
                        confirmPassword = ""
                        agreeTerms = false
                    }) {
                        Text("完成")
                    }
                }
            )
        }
    }
}
