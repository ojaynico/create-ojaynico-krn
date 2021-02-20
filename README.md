# create-ojaynico-krn

How to use this cli tool to generate a new Kotlin React Native application?

**Using npm:**

`npm install -g create-ojaynico-krn`

**Using yarn**

`yarn global add create-ojaynico-krn`

**Afterwards you will be able to consume it in via:**

`create-ojaynico-krn ProjectName`


## Or as a project specific dependency:

`npx create-ojaynico-krn ProjectName`

`yarn create-ojaynico-krn ProjectName`

### After creating a new project, use the following steps to run the application.

1. cd ProjectName
2. Install dependencies using `yarn install` OR `npm install`
3. Assemble your kotlin module using `yarn run gradleAssemble` OR `npm run gradleAssemble`
4. Bundle the React Native application by running `yarn run start` OR `npm run start`
4. Run app on android or ios using `yarn/npm run android` OR `yarn/npm run ios`

**NOTE**: 
- Choose either npm or yarn to run your scripts.
- Make Sure your environment is set up for React Native development according to their documentation.
- In case of any missing modules from kotlin, the commands 'yarn run gradleAssemble' OR 'npm run gradleAssemble' might fix them.
