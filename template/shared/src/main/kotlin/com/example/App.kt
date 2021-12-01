package com.example

import ojaynico.kotlin.react.*
import ojaynico.kotlin.react.native.AppRegistry
import react.*

@JsExport
class App : RComponent<Props, State>() {
    override fun RBuilder.render() {
        statusBar {
            barStyle = "dark-content"
        }
        safeAreaView {
            scrollView {
                attrs.contentInsetAdjustmentBehavior = "automatic"
                attrs.asDynamic().style = styles.scrollView
                child(Header)
                view {
                    attrs.style = styles.body
                    view {
                        attrs.style = styles.sectionContainer
                        text("Step One") {
                            attrs.style = styles.sectionTitle
                        }
                        text("Edit App.kt to change this screen, run 'yarn run gradleAssemble' OR 'npm run gradleAssemble' and then come back to see your edits.") {
                            attrs.style = styles.sectionDescription
                        }
                    }
                    view {
                        attrs.style = styles.sectionContainer
                        text("See Your Changes") {
                            attrs.style = styles.sectionTitle
                        }
                        text("Double tap R on your keyboard to reload your app's code.") {
                            attrs.style = styles.sectionDescription
                        }
                    }
                    view {
                        attrs.style = styles.sectionContainer
                        text("Debug") {
                            attrs.style = styles.sectionTitle
                        }
                        text("Press Cmd or Ctrl + M or Shake your device to open the React Native debug menu.") {
                            attrs.style = styles.sectionDescription
                        }
                    }
                    view {
                        attrs.style = styles.sectionContainer
                        text("Learn More") {
                            attrs.style = styles.sectionTitle
                        }
                        text("Read the docs to discover what to do next:") {
                            attrs.style = styles.sectionDescription
                        }
                    }
                    view {
                        attrs.style = styles.container
                        links.forEach { link ->
                            view {
                                attrs.style = styles.separator
                            }
                            touchableOpacity {
                                attrs.style = styles.linkContainer
                                text(link.title) {
                                    attrs.style = styles.link
                                }
                                text(link.description) {
                                    attrs.style = styles.description
                                }
                            }
                        }
                    }
                }
            }
        }
    }

}

val Header = fc<Props> {
    imageBackground {
        attrs.source = kotlinext.js.require("./resources/logo.png")
        attrs.style = styles.background
        attrs.imageStyle = styles.logo

        text("Welcome to React and Kotlin") {
            attrs.style = styles.text
        }
    }

}

fun main() {
    AppRegistry.registerComponent("{ProjectName}") { App::class.js }
}
