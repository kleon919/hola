const router = require("express").Router();
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        // https://swagger.io/specification/#infoObject
        info: {
            title: 'Hola API',
            version: '1.0.0',
            // description: 'Exposes a RESTful API to customers and staff members.',
            description: "This is a sample server Petstore server.\nYou can find out more about Swagger at\n[http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).\nFor this sample, you can use the api key `special-key` to test the authorization filters.\n\n# Introduction\nThis API is going to serve both the web and the mobile clients. Existed of http endpoints and websockets endpoints also. Websockets have benn implemented using Socket.io.odocumented in **OpenAPI format** and is based on\n[Petstore sample](http://petstore.swagger.io/) provided by [swagger.io](http://swagger.io) team.\nIt was **extended** to illustrate features of [generator-openapi-repo](https://github.com/Rebilly/generator-openapi-repo)\ntool and [ReDoc](https://github.com/Redocly/redoc) documentation. In addition to standard\nOpenAPI syntax we use a few [vendor extensions](https://github.com/Redocly/redoc/blob/master/docs/redoc-vendor-extensions.md).\n\n# OpenAPI Specification\nThis API is documented in **OpenAPI format** and is based on\n[Petstore sample](http://petstore.swagger.io/) provided by [swagger.io](http://swagger.io) team.\nIt was **extended** to illustrate features of [generator-openapi-repo](https://github.com/Rebilly/generator-openapi-repo)\ntool and [ReDoc](https://github.com/Redocly/redoc) documentation. In addition to standard\nOpenAPI syntax we use a few [vendor extensions](https://github.com/Redocly/redoc/blob/master/docs/redoc-vendor-extensions.md).\n\n# Cross-Origin Resource Sharing\nThis API features Cross-Origin Resource Sharing (CORS) implemented in compliance with  [W3C spec](https://www.w3.org/TR/cors/).\nAnd that allows cross-domain communication from the browser.\nAll responses have a wildcard same-origin which makes them completely public and accessible to everyone, including any code on any site.\n\n# Authentication\n\nPetstore offers two forms of authentication:\n  - API Key\n  - OAuth2\nOAuth2 - an open protocol to allow secure authorization in a simple\nand standard method from web, mobile and desktop applications.\n"


        },
        host: 'localhost:8000',
        basePath: '/',
        securityDefinitions: {
            JWT: {
                type: "http",
                in: "header",
                name: "Authorization",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        },
        security: [
            {
                JWT: []
            }
        ],
        responses: {
            "UnauthorizedError": {
                "description": "Access token is missing or invalid"
            }
        }
    },
    // Globs available
    apis: ['./routes/*.js', './routes/api/*.js'],
};

const specs = swaggerJsdoc(options);

router.use('/swagger.json', (req, res) => res.send(specs));

router.get('/',(req, res) => res.sendFile(require('path').join(__dirname, 'redoc.html')));

module.exports = router;