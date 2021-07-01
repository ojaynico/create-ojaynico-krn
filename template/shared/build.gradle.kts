plugins {
    kotlin("js") version "1.5.20"
}

group = "org.example"
version = "1.0.1"

repositories {
    mavenCentral()
    jcenter()
}

dependencies {
    implementation("org.jetbrains.kotlin-wrappers:kotlin-react:17.0.2-pre.213-kotlin-1.5.20")
    implementation("org.jetbrains.kotlin-wrappers:kotlin-extensions:1.0.1-pre.213-kotlin-1.5.20")
    implementation("com.github.ojaynico:ojaynico-kotlin-react-native:1.1.4")
}

kotlin {
    js {
        IR
        nodejs()
        useCommonJs()
        binaries.executable()
    }
}

// Delete package.json in build directory to prevent jest-haste-map: Haste module naming collision error
task("deletePackages") {
    doLast {
        delete(fileTree("build").matching {
            exclude("**/node_modules")
            include("**/package.json")
        })
    }
}

// Copy Resources from resources directory into build directory
task("copyResources") {
    doLast {
        copy {
            from("src/main/resources")
            into("build/js/packages/shared/kotlin/resources")
        }
    }
}

// Copy resources from resources during assemble task
tasks {
    assemble {
        finalizedBy("copyResources")
        finalizedBy("deletePackages")
    }
}
