// Binaryen 下载变通方案：跳过 SSL 验证
// 仅在网络环境无法访问 GitHub 时临时使用

import javax.net.ssl.*
import java.security.cert.X509Certificate

gradle.taskGraph.whenReady {
    // 仅为 kotlinBinaryenSetup 任务配置
    if (allTasks.any { it.name == "kotlinBinaryenSetup" }) {
        val trustAllCerts = arrayOf<TrustManager>(object : X509TrustManager {
            override fun getAcceptedIssuers(): Array<X509Certificate>? = null
            override fun checkClientTrusted(certs: Array<X509Certificate>, authType: String) {}
            override fun checkServerTrusted(certs: Array<X509Certificate>, authType: String) {}
        })

        try {
            val sc = SSLContext.getInstance("SSL")
            sc.init(null, trustAllCerts, java.security.SecureRandom())
            HttpsURLConnection.setDefaultSSLSocketFactory(sc.socketFactory)
            HttpsURLConnection.setDefaultHostnameVerifier { _, _ -> true }
            println("WARNING: SSL verification disabled for Binaryen download")
        } catch (e: Exception) {
            println("Failed to configure SSL workaround: ${e.message}")
        }
    }
}
