# create-ojaynico-krn

How to use this cli tool to generate a new Kotlin React Native application?

**Using npm:**

`npm install -g @ojaynico/create-ojaynico-krn`

**Using yarn**

`yarn global add @ojaynico/create-ojaynico-krn`

**Afterwards you will be able to consume it in via:**

`create-ojaynico-krn ProjectName`


## Or as a project specific dependency:

`npx @ojaynico/create-ojaynico-krn ProjectName`

`yarn @ojaynico/create-ojaynico-krn ProjectName`

### After creating a new project, use the following steps to run the application.

1. cd ProjectName
2. Install dependencies using `yarn install` OR `npm install`
3. Assemble your kotlin module using `yarn run gradleAssemble` OR `npm run gradleAssemble`
   
   **NOTE**: The above two commands will run when gradle is installed on your system.
   
   If it fails you can run the following commands inside shared directory.
   
   `cd shared`
   
   `./gradlew assemble` OR `gradlew assemble` on Windows
4. Bundle the React Native application by running `yarn run start` OR `npm run start`
5. Run app on android or ios using `yarn/npm run android` OR `yarn/npm run ios`

**NOTE**: 
- Choose either npm or yarn to run your scripts.
- Make Sure your environment is set up for React Native development according to their documentation.
- In case of any missing modules from kotlin, the commands 'yarn run gradleAssemble' OR 'npm run gradleAssemble' might fix them.

**Example projects can be found in the links below:**

https://github.com/ojaynico/KotlinReactNativeApp

https://github.com/ojaynico/KotlinReactNativeNavigation

https://github.com/ojaynico/KotlinReactNativeLoginSignup
