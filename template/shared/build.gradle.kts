plugins {
    kotlin("js") version "1.4.30"
}

group = "org.example"
version = "1.0.1"

repositories {
    mavenCentral()
    jcenter()
}

dependencies {
    implementation("org.jetbrains:kotlin-react:17.0.1-pre.144-kotlin-1.4.30")
    implementation("org.jetbrains:kotlin-extensions:1.0.1-pre.144-kotlin-1.4.30")
    implementation("com.github.ojaynico:ojaynico-kotlin-react-native:1.0.9")
}

kotlin {
    js {
        nodejs()
        useCommonJs()
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
