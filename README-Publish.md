# vimo-sketches
This document describes how to publish the vimo-sketches component to the npm repository.

### Install Babel
```
npm install --save-dev @babel/core @babel/cli @babel/preset-env 
npm install -save @babel/polyfill
```

Create `babel.config.js` in `/src` and add the script with the following.

```javascript
module.exports = function (api) {
  api.cache(true);

  const presets = ['@babel/preset-env', '@babel/preset-react'];
  const plugins = ['macros'];

  return {
    presets,
    plugins,
  };
};
```

### Edit `package.json`
Add script under `scripts` with the following:

```
"build": "rm -rf dist && NODE_ENV=production babel src/lib --out-dir dist --copy-files";
```

This script will build the files under src/lib and copy to the dist folder.

Add some fields that could be a metadata for the package with the following: 
```
  "name": "@vimo-public/vimo-sketches",
  "version": "0.1.1",
  "private": false,
  "main": "dist/index.js",
  "module": "dist/index.js",
  "files": [
    "dist",
    "README.md"
  ],
  "author": "VCG",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/VCG/vimo-sketches.git"
  },
```

### Test the package
#### In the *vimo-sketches* Project
Build the package 

`npm run build`

Pack the package

`npm pack`

This will create `.tgz` file in your project's root path.


#### In the *test* Project
To test the package locally, you need to create a new React project. Please install the *vimo-sketches* package to your test project.

`npm install ../vimo-sketches/vimo-public-vimo-sketches-{VERSION}.tgz`

> You need to change the *vimo-sketches* package version number for the package update to take effect in your *test* project. 

### Publish
Login to the npm repository

`npm login`

Publish

`npm publish`

You need to change `version` in `package.json` if you have already published the package.
