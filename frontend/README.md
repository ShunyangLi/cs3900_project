# Angular frontend dev server
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.3.

## Before setting up Angular frontend dev server
1. You need to have `Node.js` and `npm` installed in your computer. It is recommended that you use the same version of `Node.js` with us, as we did not test on other versions. Our team is using `Node.js v10.16.0`.  You can click [here](https://nodejs.org/dist/v10.16.0/) to download this version.
2. Once you have your `Node.js` installed, next you have to install `Angular CLI` in your computer. You can click [here](https://github.com/angular/angular-cli) to download.

## Set up instruction
Note: This set-up requires `Node.js` and `Angular CLI` installed.
- Step 0: Assuming you are under the root directory of project, in your terminal, type
    ```bash
        $ cd frontend/
    ```
- Step 1: Then type
    ```bash
        $ npm install
    ```
- Step 2: Then type
    ```bash
        $ npm start
    ```
    It will give your a prompt like this:
    ```
        Date: 2019-11-25T00:08:37.873Z
        Hash: d4ffe10b7b439ff1fdb1
        Time: 12719ms
        chunk {main} main.js, main.js.map (main) 253 kB [initial] [rendered]
        chunk {polyfills} polyfills.js, polyfills.js.map (polyfills) 248 kB [initial] [rendered]
        chunk {runtime} runtime.js, runtime.js.map (runtime) 6.08 kB [entry] [rendered]
        chunk {styles} styles.js, styles.js.map (styles) 1.49 MB [initial] [rendered]
        chunk {vendor} vendor.js, vendor.js.map (vendor) 8.51 MB [initial] [rendered]
        ** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **
        ℹ ｢wdm｣: Compiled successfully.
    ```
- Step 3: Open a tab in your browser and navigate to `http://localhost:4200/`.

## Code documentation (comments)
There are a lot of files in Angular framework, but you don't need to understand all in order to understand our project frontend. A lot of
files are testing, configuration or external library files and you can completely ignore them. Therefore, we did not add comments
on those files. 

Here are the list of useful files where we have added comments or explanation. It contains all frontend functionalities and you may only focus on them.
- All TypeScript files in `frontend/src/app` except any file with `*.spec.ts` as suffix.
- Some JavaScript files in `frontend/src/assets`.
    - `displayMap.js`, `loginStatus.js`, `profilePage.js`, `update_hotel.js`

We did not add comments on `html` files because they are all static and can be self-explained.
