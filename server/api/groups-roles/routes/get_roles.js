import Joi from 'joi';
import schema from '../../roles/schemas/role';

module.exports = (server) => ({
  method: 'GET',
  path: '/api/groups/{id}/roles',
  config: {
    auth: {
      strategies: [ 'jwt' ],
      scope: [ 'read:groups' ]
    },
    description: 'Get the roles for a group.',
    tags: [ 'api' ],
    pre: [
      server.handlers.managementClient
    ],
    validate: {
      params: {
        id: Joi.string().guid().required()
      }
    },
    response: { schema: Joi.array().items(schema).label('RoleList') }
  },
  handler: (req, reply) =>
    req.storage.getGroup(req.params.id)
      .then(group => group.roles || [])
      .then(roleIds => req.storage.getRoles()
        .then(roles => roles.filter(role => roleIds.indexOf(role._id) > -1)) // eslint-disable-line no-underscore-dangle
      )
      .then(roles => reply(roles))
      .catch(err => reply.error(err))
});
