# Persona Example App

Built on the shoulder of giants

 - [Mozilla Persona](https://developer.mozilla.org/en-US/docs/Persona)
 - [CouchDB](http://couchdb.apache.org/) hosted at [Cloudant](https://cloudant.com/)
 - [nano](https://github.com/dscape/nano)
 - [Express](http://expressjs.com/)
 - [Request](https://github.com/mikeal/request)
 - [jQuery](http://jquery.com/)
 - [Bootstrap](http://twitter.github.io/bootstrap/)

## Demo

Visit [mysterious-coast-9759.herokuapp.com](http://mysterious-coast-9759.herokuapp.com/) to see the app in action.
It might take some time to load as it is running on the free dyno.

If you don't want to use your own email (as it is stored in the db temporarily) check out these Identity Providers

 - [mockmyid](https://mockmyid.com/)
 - [personatestuser](http://personatestuser.org/)
 
## Other examples

Take a look at these other resources. They were the foundation and inspiration for my own project. Without them I couldn't have done it! Therefore, thank you!

 - [123done](https://github.com/mozilla/123done)
 - [node.js-persona-example](https://github.com/lloyd/node.js-persona-example)
 - [myfavoritebeer.org](https://github.com/lloyd/myfavoritebeer.org)
 - [browserid-cookbook](https://github.com/mozilla/browserid-cookbook/tree/master/node-express)

However, all of the examples were missing some features I'd like to see. These are

 - proper DB implementation
 - CSRF protection
 - Content Security Policy (CSP)
 - avoid global variables
 - use of request module (imho makes code easier to read)
 - simplicity

I tried to take the best features from the examples to create my own app.

I'm sure my example can be improved as well. So if there is anything wrong or you see room for improvements, please open an [issue](https://github.com/zeMirco/mozilla-persona-express-couchdb/issues).

## More

To read more about this topic see my post [Mozilla Persona example app with Express and Couchdb](http://mircozeiss.com/mozilla-persona-example-app-with-express-and-couchdb/)
 
## Test

Coming soon ...

## License

Copyright (C) 2013 [Mirco Zeiss](mailto: mirco.zeiss@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.