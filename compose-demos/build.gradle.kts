@file:OptIn(ExperimentalWasmDsl::class)

import org.gradle.api.tasks.Sync
import org.gradle.api.tasks.Exec
import org.jetbrains.kotlin.gradle.ExperimentalWasmDsl
import org.jetbrains.kotlin.gradle.targets.js.webpack.KotlinWebpackConfig

plugins {
    kotlin("multiplatform") version "2.1.10"
    id("org.jetbrains.compose") version "1.8.0"
    id("org.jetbrains.kotlin.plugin.compose") version "2.1.10"
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
        commonMain.dependencies {
            implementation(compose.runtime)
            implementation(compose.ui)
            implementation(compose.foundation)
            implementation(compose.material3)
            implementation(compose.materialIconsExtended)
            implementation(compose.components.resources)
        }
    }
}

compose.resources {
    customDirectory(
        sourceSetName = "commonMain",
        directoryProvider = layout.buildDirectory.dir("generated/composeResources"),
    )
}

val generateSubsetFont by tasks.registering(Exec::class) {
    group = "compose-demos"
    description = "Generate the Noto Sans SC subset used by Wasm demos."
    inputs.file("fonts/NotoSansSC-Regular.otf")
    inputs.file("scripts/subset-font.mjs")
    inputs.dir("src/wasmJsMain/kotlin")
    outputs.file(layout.buildDirectory.file("generated/composeResources/font/NotoSansSC-Regular.otf"))
    commandLine("node", "scripts/subset-font.mjs")
}

tasks.matching {
    it.name in setOf(
        "generateResourceAccessorsForCommonMain",
        "prepareComposeResourcesTaskForCommonMain",
        "copyNonXmlValueResourcesForCommonMain",
        "compileKotlinWasmJs",
    )
}.configureEach {
    dependsOn(generateSubsetFont)
}

// 编译完成后自动复制产物到 Vue 的 public/demos/
val webPublicDemosDir = rootProject.file("../web/public/demos")
val productionDistributionDir = layout.buildDirectory.dir("dist/wasmJs/productionExecutable")
val developmentDistributionDir = layout.buildDirectory.dir("dist/wasmJs/developmentExecutable")
val productionWebpackDir = layout.buildDirectory.dir("kotlin-webpack/wasmJs/productionExecutable")
val developmentWebpackDir = layout.buildDirectory.dir("kotlin-webpack/wasmJs/developmentExecutable")

tasks.named("wasmJsBrowserProductionWebpack") {
    doFirst { delete(productionDistributionDir, productionWebpackDir) }
}

tasks.named("wasmJsBrowserDevelopmentWebpack") {
    doFirst { delete(developmentDistributionDir, developmentWebpackDir) }
}

val copyDemosToVue by tasks.registering(Sync::class) {
    group = "compose-demos"
    description = "Sync Wasm build output to Vue public/demos/"
    outputs.upToDateWhen { false }

    from(productionDistributionDir)
    into(webPublicDemosDir)
}

tasks.named("wasmJsBrowserDistribution") {
    finalizedBy(copyDemosToVue)
}

// 开发模式也支持复制（可选）
val copyDemosToVueDev by tasks.registering(Sync::class) {
    group = "compose-demos"
    outputs.upToDateWhen { false }
    from(developmentDistributionDir)
    into(webPublicDemosDir)
}

tasks.named("wasmJsBrowserDevelopmentExecutableDistribution") {
    finalizedBy(copyDemosToVueDev)
}
