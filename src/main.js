import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';

const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles(options) {
    return copy(options.templateDirectory, options.targetDirectory, {
        clobber: false,
    });
}

export async function createProject(options) {
    var regexSpecialCharacters = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    var regexStartsWithUppercase = /^[A-Z]/;

    if (regexSpecialCharacters.test(options.name)) {
        console.log('%s Project name cannot contain special characters!', chalk.red.bold('FAILED'));
        return false;
    }

    if (!regexStartsWithUppercase.test(options.name)) {
        console.log('%s Project name should start with capital letter!', chalk.red.bold('FAILED'));
        return false;
    }

    options.targetDirectory = './' + options.name;

    if (/\s/.test(options.targetDirectory)) {
        console.log('%s Project name cannot contain white spaces!', chalk.red.bold('FAILED'));
        return false;
    }

    if (!fs.existsSync(options.targetDirectory)) {
        fs.mkdirSync(options.targetDirectory);
    } else {
        console.log('%s Project ' + options.name + ' exists! User another project name.', chalk.red.bold('FAILED'));
        return false;
    }

    options = {
        ...options,
        targetDirectory: options.targetDirectory || process.cwd(),
    };

    const templateDir = path.join(
        __dirname,
        '../template'
    );
    options.templateDirectory = templateDir;

    try {
        await access(templateDir, fs.constants.R_OK);
    } catch (err) {
        console.error('%s Invalid template name', chalk.red.bold('ERROR'));
        process.exit(1);
    }

    console.log('%s Copying project files', chalk.green.bold('DONE'));
    await copyTemplateFiles(options);

    const needleProjectName = /{ProjectName}/g;
    const needlePackageName = /kotlinreactnativestarter/g;

    // Replace project name in App.kt
    try {
        var appKotlinName = fs.readFileSync(options.targetDirectory + '/shared/src/main/kotlin/com/example/App.kt', 'utf-8');
        var resultKotlinName = appKotlinName.replace(needleProjectName, options.name);
        fs.writeFileSync(options.targetDirectory + '/shared/src/main/kotlin/com/example/App.kt', resultKotlinName, 'utf8');
    } catch (e) {
        console.log(e);
    }

    // Replace Project Name in package.json
    try {
        var dataPackage = fs.readFileSync(options.targetDirectory + '/package.json', 'utf-8');
        var resultPackage = dataPackage.replace(needleProjectName, options.name);
        fs.writeFileSync(options.targetDirectory + '/package.json', resultPackage, 'utf8');
    } catch (e) {
        console.log(e)
    }

    // Replace Project Name in app.json
    try {
        var dataApp = fs.readFileSync(options.targetDirectory + '/app.json', 'utf-8');
        var resultApp = dataApp.replace(needleProjectName, options.name);
        fs.writeFileSync(options.targetDirectory + '/app.json', resultApp, 'utf8');
    } catch (e) {
        console.log(e)
    }

    // Replace Project Name in android/settings.gradle
    try {
        var dataSettingsGradle = fs.readFileSync(options.targetDirectory + '/android/settings.gradle', 'utf-8');
        var resultSettingsGradle = dataSettingsGradle.replace(needleProjectName, options.name);
        fs.writeFileSync(options.targetDirectory + '/android/settings.gradle', resultSettingsGradle, 'utf8');
    } catch (e) {
        console.log(e)
    }

    // Replace Project Name in android/app/src/main/res/values/strings.xml
    try {
        var dataStrings = fs.readFileSync(options.targetDirectory + '/android/app/src/main/res/values/strings.xml', 'utf-8');
        var resultStrings = dataStrings.replace(needleProjectName, options.name);
        fs.writeFileSync(options.targetDirectory + '/android/app/src/main/res/values/strings.xml', resultStrings, 'utf8');
    } catch (e) {
        console.log(e)
    }

    // Replace Package and Project Name in android/app/src/main/java/com/kotlinreactnativestarter/MainActivity.java
    try {
        var dataMainActivity = fs.readFileSync(options.targetDirectory + '/android/app/src/main/java/com/kotlinreactnativestarter/MainActivity.java', 'utf-8');
        var resultMainActivity = dataMainActivity.replace(needleProjectName, options.name);
        resultMainActivity = resultMainActivity.replace(needlePackageName, options.name.toLowerCase());
        fs.writeFileSync(options.targetDirectory + '/android/app/src/main/java/com/kotlinreactnativestarter/MainActivity.java', resultMainActivity, 'utf8');
    } catch (e) {
        console.log(e)
    }

    // Replace Package Name in android/app/build.gradle
    try {
        var dataBuildGradle = fs.readFileSync(options.targetDirectory + '/android/app/build.gradle', 'utf-8');
        var resultBuildGradle = dataBuildGradle.replace(needlePackageName, options.name.toLowerCase());
        fs.writeFileSync(options.targetDirectory + '/android/app/build.gradle', resultBuildGradle, 'utf8');
    } catch (e) {
        console.log(e)
    }

    // Replace Package Name in android/app/src/main/AndroidManifest.xml
    try {
        var dataManifest = fs.readFileSync(options.targetDirectory + '/android/app/src/main/AndroidManifest.xml', 'utf-8');
        var resultManifest = dataManifest.replace(needlePackageName, options.name.toLowerCase());
        fs.writeFileSync(options.targetDirectory + '/android/app/src/main/AndroidManifest.xml', resultManifest, 'utf8');
    } catch (e) {
        console.log(e)
    }

    // Replace Package Name in android/app/src/main/java/com/kotlinreactnativestarter/MainApplication.java
    try {
        var dataMainApplication = fs.readFileSync(options.targetDirectory + '/android/app/src/main/java/com/kotlinreactnativestarter/MainApplication.java', 'utf-8');
        var resultMainApplication = dataMainApplication.replace(needlePackageName, options.name.toLowerCase());
        fs.writeFileSync(options.targetDirectory + '/android/app/src/main/java/com/kotlinreactnativestarter/MainApplication.java', resultMainApplication, 'utf8');
    } catch (e) {
        console.log(e)
    }

    // Rename android package directory
    try {
        fs.renameSync(options.targetDirectory + '/android/app/src/main/java/com/kotlinreactnativestarter', options.targetDirectory + '/android/app/src/main/java/com/' + options.name.toLowerCase());
    } catch (e) {
      console.log(e)
    }

    // Rename ios project name
    try {
        var dataFile = fs.readFileSync(options.targetDirectory + '/ios/KotlinReactNativeStarter-tvOSTests/Info.plist', 'utf-8');
        var resultString = dataFile.replace(needleProjectName, options.name);
        fs.writeFileSync(options.targetDirectory + '/ios/KotlinReactNativeStarter-tvOSTests/Info.plist', resultString, 'utf8');

        dataFile = fs.readFileSync(options.targetDirectory + '/ios/KotlinReactNativeStarter-tvOS/Info.plist', 'utf-8');
        resultString = dataFile.replace(needleProjectName, options.name);
        fs.writeFileSync(options.targetDirectory + '/ios/KotlinReactNativeStarter-tvOS/Info.plist', resultString, 'utf8');

        dataFile = fs.readFileSync(options.targetDirectory + '/ios/KotlinReactNativeStarter.xcodeproj/xcshareddata/xcschemes/KotlinReactNativeStarter-tvOS.xcscheme', 'utf-8');
        resultString = dataFile.replace(needleProjectName, options.name);
        fs.writeFileSync(options.targetDirectory + '/ios/KotlinReactNativeStarter.xcodeproj/xcshareddata/xcschemes/KotlinReactNativeStarter-tvOS.xcscheme', resultString, 'utf8');

        dataFile = fs.readFileSync(options.targetDirectory + '/ios/KotlinReactNativeStarter.xcodeproj/project.pbxproj', 'utf-8');
        resultString = dataFile.replace(needleProjectName, options.name);
        fs.writeFileSync(options.targetDirectory + '/ios/KotlinReactNativeStarter.xcodeproj/project.pbxproj', resultString, 'utf8');

        dataFile = fs.readFileSync(options.targetDirectory + '/ios/KotlinReactNativeStarter.xcworkspace/contents.xcworkspacedata', 'utf-8');
        resultString = dataFile.replace(needleProjectName, options.name);
        fs.writeFileSync(options.targetDirectory + '/ios/KotlinReactNativeStarter.xcworkspace/contents.xcworkspacedata', resultString, 'utf8');

        dataFile = fs.readFileSync(options.targetDirectory + '/ios/KotlinReactNativeStarterTests/KotlinReactNativeStarterTests.m', 'utf-8');
        resultString = dataFile.replace(needleProjectName, options.name);
        fs.writeFileSync(options.targetDirectory + '/ios/KotlinReactNativeStarterTests/KotlinReactNativeStarterTests.m', resultString, 'utf8');

        dataFile = fs.readFileSync(options.targetDirectory + '/ios/Podfile', 'utf-8');
        resultString = dataFile.replace(needleProjectName, options.name);
        fs.writeFileSync(options.targetDirectory + '/ios/Podfile', resultString, 'utf8');

    } catch (e) {
        console.log(e)
    }

    // Rename ios directories
    try {
        fs.renameSync(options.targetDirectory + '/ios/KotlinReactNativeStarter', options.targetDirectory + '/ios/' + options.name);

        fs.renameSync(options.targetDirectory + '/ios/KotlinReactNativeStarter.xcodeproj/xcshareddata/xcschemes/KotlinReactNativeStarter.xcscheme', options.targetDirectory + '/ios/KotlinReactNativeStarter.xcodeproj/xcshareddata/xcschemes/' + options.name + '.xcscheme');
        fs.renameSync(options.targetDirectory + '/ios/KotlinReactNativeStarter.xcodeproj/xcshareddata/xcschemes/KotlinReactNativeStarter-tvOS.xcscheme', options.targetDirectory + '/ios/KotlinReactNativeStarter.xcodeproj/xcshareddata/xcschemes/' + options.name + '-tvOS.xcscheme');
        fs.renameSync(options.targetDirectory + '/ios/KotlinReactNativeStarter.xcodeproj', options.targetDirectory + '/ios/' + options.name + '.xcodeproj');

        fs.renameSync(options.targetDirectory + '/ios/KotlinReactNativeStarter.xcworkspace', options.targetDirectory + '/ios/' + options.name + '.xcworkspace');
        fs.renameSync(options.targetDirectory + '/ios/KotlinReactNativeStarter-tvOS', options.targetDirectory + '/ios/' + options.name + '-tvOS');
        fs.renameSync(options.targetDirectory + '/ios/KotlinReactNativeStarter-tvOSTests', options.targetDirectory + '/ios/' + options.name + '-tvOSTests');

        fs.renameSync(options.targetDirectory + '/ios/KotlinReactNativeStarterTests/KotlinReactNativeStarterTests.m', options.targetDirectory + '/ios/KotlinReactNativeStarterTests/' + options.name + 'Tests.m');
        fs.renameSync(options.targetDirectory + '/ios/KotlinReactNativeStarterTests', options.targetDirectory + '/ios/' + options.name + 'Tests');
    } catch (e) {
        console.log(e)
    }

    console.log('%s Project ready', chalk.green.bold('DONE'));

    console.log("How to run your application?");
    console.log("1. cd " + options.name);
    console.log("2. Install dependencies using 'yarn install' OR 'npm install'");
    console.log("3. Assemble your kotlin module using 'yarn run gradleAssemble' OR 'npm run gradleAssemble'");
    console.log("4. Bundle the react native application by running 'yarn run start' OR 'npm run start'");
    console.log("4. Run app on android or ios using 'yarn/npm run android' OR 'yarn/npm run ios'");
    console.log("NOTE: Choose either npm or yarn to run your scripts.");
    console.log("Make Sure your environment is set up for React Native development according to their documentation.");
    console.log("In case of any missing modules from kotlin, the commands 'yarn run gradleAssemble' OR 'npm run gradleAssemble' might fix them.")
    return true;
}
