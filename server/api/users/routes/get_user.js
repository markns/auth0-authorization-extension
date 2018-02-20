import Joi from 'joi';
import schema from '../../users/schemas/user';

module.exports = (server) => ({
  method: 'GET',
  path: '/api/users/{id}',
  config: {
    auth: {
      strategies: [ 'jwt' ],
      scope: [ 'read:users' ]
    },
    description: 'Get a single user based on its unique identifier.',
    validate: {
      params: {
        id: Joi.string().required()
      }
    },
    pre: [
      server.handlers.managementClient
    ],
    response: { schema: schema }
  },
  handler: (req, reply) =>
    req.pre.auth0.users.get({ id: req.params.id })
      .then(user => reply(user))
      .catch(err => reply.error(err))
});
