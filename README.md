## Link poster browser extension
Adds "Post link" item into context menu for links to posts link's href
to pre-configured url (the only option on plugin options page).

Extension uses icon badges and title to provide some feedback to user.

The extension is compatible with Firefox 45+.
However, for testing purposes (to let temporary extension to use `storage` API), fake ID should be added to the `manifest.json`, e.g.:
```
  "applications": {
    "gecko": {
      "id": "link-poster@example.com"
    }
  },
```
`applications` key generates warning when installing in Chrome, so it is better to remove it in production.

### Build
Extension was initially scaffolded using yeoman `chrome-extension` generator, all initial Grunt targets work just fine.

#### Web-Ext (Firefox)
Install `web-ext` tool:
`npm install --global web-ext`

Go to the extension root directory:
`cd chrome-link-poster/dist`

Check manifest and other files:
`web-ext lint`

Temporarily install extension (or reload):
`web-ext run`

Generate zip:
`web-ext build`

Sign and generate XPI (See the [sign reference guide](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/web-ext_command_reference#web-ext_sign)):
`web-ext sign --api-key=$AMO_JWT_ISSUER --api-secret=$AMO_JWT_SECRET`



### Testing
There is very basic express-based test server, which can handle POST requests to `/ok` and `/error` locations.
It responds with 200 and writes raw request body to console or just responds with status 500.

    node test-server.js
