import Joi from 'joi';
import schema from '../../permissions/schemas/permission';

module.exports = () => ({
  method: 'GET',
  path: '/api/permissions/{id}',
  config: {
    auth: {
      strategies: [ 'jwt' ],
      scope: [ 'read:permissions' ]
    },
    description: 'Get a single permission based on its unique identifier.',
    tags: [ 'api' ],
    validate: {
      params: {
        id: Joi.string().guid().required()
      }
    },
    response: { schema: schema }
  },
  handler: (req, reply) =>
    req.storage.getPermission(req.params.id)
      .then(permission => reply({
        _id: permission._id,
        name: permission.name,
        description: permission.description
      }))
      .catch(err => reply.error(err))
});
