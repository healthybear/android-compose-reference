// Gradle 初始化脚本：配置依赖仓库镜像
// 解决中国大陆网络访问 GitHub/Maven Central 不稳定的问题

allprojects {
    buildscript {
        repositories {
            all {
                if (this is MavenArtifactRepository) {
                    when (url.toString()) {
                        "https://repo.maven.apache.org/maven2/",
                        "https://repo1.maven.org/maven2/" -> {
                            remove(this)
                            println("Replaced Maven Central with Aliyun mirror")
                        }
                    }
                }
            }
            maven { url = uri("https://maven.aliyun.com/repository/public/") }
            maven { url = uri("https://maven.aliyun.com/repository/google/") }
            maven { url = uri("https://maven.aliyun.com/repository/gradle-plugin/") }
            mavenCentral()
            google()
        }
    }

    repositories {
        all {
            if (this is MavenArtifactRepository) {
                when (url.toString()) {
                    "https://repo.maven.apache.org/maven2/",
                    "https://repo1.maven.org/maven2/" -> {
                        remove(this)
                        println("Replaced Maven Central with Aliyun mirror")
                    }
                }
            }
        }
        maven { url = uri("https://maven.aliyun.com/repository/public/") }
        maven { url = uri("https://maven.aliyun.com/repository/google/") }
        mavenCentral()
        google()
    }
}
