## Link poster chrome extension
Adds "Post link" item into context menu for links to posts link's href
to pre-configured url (the only option on plugin options page).

Extension uses icon badges and title to provide some feedback to user.

### Build
Extension was initially scaffolded using yeoman `chrome-extension` generator, all initial Grunt targets work just fine.

### Testing
There is very basic express-based test server, which can handle POST requests to `/ok` and `/error` locations.
It responds with 200 and writes raw request body to console or just responds with status 500.

    node test-server.js
