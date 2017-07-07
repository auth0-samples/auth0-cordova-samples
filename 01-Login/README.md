# Auth0 Cordova Login

This sample demonstrates how to add authentication to a Cordova application using Auth0's Lock widget from the hosted login page.

## Getting Started

If you haven't already done so, [sign up](https://auth0.com/signup) for your free Auth0 account and create a new client in the [dashboard](https://manage.auth0.com). Find the **domain** and **client ID** from the settings area.

## Callback URL

A Callback URL is a location in your app that users will be redirected to once authentication is complete. For Cordova applications, the format of the **Callback URL** is as such:

```bash
YOUR_PACKAGE_ID://YOUR_AUTH0_DOMAIN/cordova/YOUR_PACKAGE_ID/callback
```

Where:

* `YOUR_PACKAGE_ID` is the app identifier found in `config.xml`. Ex: `com.auth0.cordova.example`.
* `YOUR_AUTH0_DOMAIN` is your Auth0 tenant domain found in your client settings. Ex: `<tenant>.auth0.com`.

Be sure to add the appropriate **Callback URL** to the **Allowed Callback URLs** box in the client settings for your client in the Auth0 dashboard.

## CORS

Set up CORS (Cross Origin Resource Sharing) in your dashboard so that Auth0 can accept your requests. Add `file://*` to the **Allowed Origins** box in your client settings.

## Set Environment Variables

If you have downloaded this sample from Auth0's Cordova tutorial, a file called `env.js` will come pre-populated with the **Client ID** and **Domain** for your client, as well as a default **Audience**. If you have cloned this sample directly from Github, rename the `env.js.example` file to `env.js` and provide those keys manually.

## Install Cordova Plugins

Several Cordova plugins are required for use with `@auth0/cordova`. Install `safariviewcontroller` and `customurlscheme` with the following commands.

```bash
cordova plugin add cordova-plugin-safariviewcontroller
```

```bash
cordova plugin add cordova-plugin-customurlscheme --variable URL_SCHEME={YOUR_PACKAGE_ID} --variable ANDROID_SCHEME={YOUR_PACKAGE_ID} --variable ANDROID_HOST={YOUR_AUTH0_DOMAIN} --variable ANDROID_PATHPREFIX=/cordova/{YOUR_PACKAGE_ID}/callback
```

The variables used when installing `cordova-plugin-customurlscheme` are the same as those used to set up the **Callback URL** in your Auth0 Dashboard.

## Set AndroidLaunchMode 

In your `config.xml` file, add this preference:
```
 <preference name="AndroidLaunchMode" value="singleTask" />
```

## Install the Dependencies and Run the App

This sample relies on several packages, including **auth0.js** and **auth0-cordova**. Install the dependencies with npm or yarn.

```bash
# installation with npm
npm install

# installation with yarn
yarn
```

The sample uses webpack. Run a command to instruct webpack to build the application bundle.

```bash
npm run build
```

Prepare Cordova for iOS and Android.

```bash
npm run prepare
```

Finally, emulate or run the application.

```bash
# emulate the app
cordova emulate ios

# run the app on a device
cordova run ios
```

> **Note:** The **auth0-cordova** package will only work when the app is being run in an emulator or on a real device. Errors will be encountered if trying to log in when testing in the browser.

## Development

Run the watcher to constantly build the application and pipe it to `/www` folder.

```bash
npm run watch
```

The JavaScript project is built from `src/index.js` to `/www/index.js`.

## Before Shipping to Production

The Content Security Policy in the sample is configured using wildcards for ease of use. For example, the value for `connect-src` is `https://*.auth0.com`. This is fine for development and testing, but be sure to change this to be your Auth0 tenant domain before putting the application into production. 

## What is Auth0?

Auth0 helps you to:

* Add authentication with [multiple authentication sources](https://docs.auth0.com/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, amont others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
* Add authentication through more traditional **[username/password databases](https://docs.auth0.com/mysql-connection-tutorial)**.
* Add support for **[linking different user accounts](https://docs.auth0.com/link-accounts)** with the same user.
* Support for generating signed [Json Web Tokens](https://docs.auth0.com/jwt) to call your APIs and **flow the user identity** securely.
* Analytics of how, when and where users are logging in.
* Pull data from other sources and add it to the user profile, through [JavaScript rules](https://docs.auth0.com/rules).

## Create a free Auth0 account

1. Go to [Auth0](https://auth0.com/signup) and click Sign Up.
2. Use Google, GitHub or Microsoft Account to login.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Auth0](auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE.txt) file for more info.
