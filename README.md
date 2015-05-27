# streamstats web service descriptions

> Describes the REST endpoint for StreamStats Web Services.  It is an angular application that uses angular-ui-mobile

> Build environment: Visual Studio 2013 with TypeScript 1.4


## Project setup

##### required software
[node.js](http://nodejs.org)  
[github for windows](https://windows.github.com/)   
[cmder](http://gooseberrycreative.com/cmder/)   

#### 1.  Install global dependencies
This will install the following packages globally

```bash
npm install -g bower
npm install -g gulp
npm install -g tsd
```

#### 2.  Update/add packages
This will install the required dependencies to the project

Inside of your project folder (after git fork and clone):
```bash
npm install
bower install
tsd install
```

------

## Building a release

#### 1.  Create dist build
This will concatenate and minify all css and js files, trim and clean project and copy to "/dist"

```bash
gulp
```

Optionally to view distribution build in a lightweight webserver use:
```bash
gulp watch
```

#### 2.  Tag distribution release with new version

##### Step 1.
Bump the version.  Run only one of the below commands.  This creates a local commit with the package.json, bower.json and tsd.json updated to the new version number

 ```bash
gulp patch     # makes v0.1.0 → v0.1.1
gulp feature   # makes v0.1.1 → v0.2.0
gulp release   # makes v0.2.1 → v1.0.0
 ```

##### Step 2.   
 Push the commit that contains the json files with bumped versions to your personal github repo 
 
 ```bash
 git push origin master
 ```

##### Step 3.   
 Create and merge pull request with version incremented (github.com)

##### Step 4.  
Get latest version from upstream (all this should be is a commit for the pull request in Step 3.) 

 ```bash
 git pull USGS-WiM master
 ```

##### Step 5.   
Run "gulp push" to push the commit with the release tags up to the upstream (WiM) repository.

```bash
gulp push
```