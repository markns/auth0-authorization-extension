import Hapi from 'hapi';
import Good from 'good';
import Inert from 'inert';
import Relish from 'relish';
import Blipp from 'blipp';
import jwt from 'hapi-auth-jwt2';
import GoodConsole from 'good-console';
import HapiSwagger from 'hapi-swagger';

import config from './lib/config';
import logger from './lib/logger';
import plugins from './plugins';

export default (cb) => {
  const goodPlugin = {
    register: Good,
    options: {
      ops: {
        interval: 30000
      },
      reporters: {
        console: [

        ]
      }
    }
  };

  const hapiSwaggerPlugin = {
    register: HapiSwagger,
    options: {
      info: {
        title: 'Auth0 Authorization API'
      },
      schemes: [ 'https', 'https' ],
      security: [
        {
          auth0_jwk: []
        }
      ],
      securityDefinitions: {
        auth0_jwk: {
          'x-google-jwks_uri': 'https://gridarrow.auth0.com/.well-known/jwks.json',
          type: 'oauth2',
          'x-google-issuer': 'https://gridarrow.auth0.com/',
          flow: 'implicit',
          authorizationUrl: ''
        }
      },

      documentationPage: false,
      swaggerUI: false
    }
  };

  if (process.env.NODE_ENV !== 'test') {
    goodPlugin.options.reporters.console.push(
      new GoodConsole({ color: !!config('LOG_COLOR') })
    );
    goodPlugin.options.reporters.console.push('stdout');
  }

  const relishPlugin = Relish({ });

  const server = new Hapi.Server();
  server.connection({
    host: 'localhost',
    port: config('PORT'),
    routes: {
      cors: true,
      validate: {
        failAction: relishPlugin.failAction
      }
    }
  });
  server.register([ goodPlugin, Inert, Blipp, jwt, hapiSwaggerPlugin, ...plugins ], (err) => {
    if (err) {
      return cb(err, null);
    }

    // Use the server logger.
    logger.debug = (...args) => {
      server.log([ 'debug' ], args.join(' '));
    };
    logger.info = (...args) => {
      server.log([ 'info' ], args.join(' '));
    };
    logger.error = (...args) => {
      server.log([ 'error' ], args.join(' '));
    };

    return cb(null, server);
  });

  server.ext('onPreResponse', (request, reply) => {
    if (request.response && request.response.isBoom && request.response.output) {
      server.log([ 'error' ], `Request: ${request.method.toUpperCase()} ${request.url.path}`);
      server.log([ 'error' ], `Response: ${JSON.stringify(request.response, null, 2)}`);
    }

    return reply.continue();
  });

  return server;
};
