import org.jetbrains.kotlin.gradle.targets.js.webpack.KotlinWebpackConfig

plugins {
    kotlin("multiplatform") version "2.1.0"
    id("org.jetbrains.compose") version "1.7.3"
    id("org.jetbrains.kotlin.plugin.compose") version "2.1.0"
}

kotlin {
    wasmJs {
        moduleName = "compose-demos"
        browser {
            commonWebpackConfig {
                outputFileName = "compose-demos.js"
                devServer = (devServer ?: KotlinWebpackConfig.DevServer()).apply {
                    static = (static ?: mutableListOf()).apply {
                        add(project.rootDir.path)
                    }
                }
            }
        }
        binaries.executable()
    }

    sourceSets {
        val wasmJsMain by getting {
            dependencies {
                implementation(compose.runtime)
                implementation(compose.ui)
                implementation(compose.foundation)
                implementation(compose.material3)
                implementation(compose.components.resources)
            }
        }
    }
}

// 编译完成后自动复制产物到 Vue 的 public/demos/
val webPublicDemosDir = rootProject.file("../web/public/demos")

val copyDemosToVue by tasks.registering(Copy::class) {
    group = "compose-demos"
    description = "Copy Wasm build output to Vue public/demos/"

    from(layout.buildDirectory.dir("dist/wasmJs/productionExecutable"))
    into(webPublicDemosDir)
}

tasks.named("wasmJsBrowserDistribution") {
    finalizedBy(copyDemosToVue)
}

// 开发模式也支持复制（可选）
val copyDemosToVueDev by tasks.registering(Copy::class) {
    group = "compose-demos"
    from(layout.buildDirectory.dir("dist/wasmJs/developmentExecutable"))
    into(webPublicDemosDir)
}

tasks.named("wasmJsBrowserDevelopmentExecutableDistribution") {
    finalizedBy(copyDemosToVueDev)
}
