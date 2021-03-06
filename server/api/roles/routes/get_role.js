import Joi from 'joi';
import schema from '../schemas/role';

module.exports = () => ({
  method: 'GET',
  path: '/api/roles/{id}',
  config: {
    auth: {
      strategies: [ 'jwt' ],
      scope: [ 'read:roles' ]
    },
    description: 'Get a single role based on its unique identifier.',
    tags: [ 'api' ],
    validate: {
      params: {
        id: Joi.string().guid().required()
      }
    },
    response: { schema: schema }
  },
  handler: (req, reply) =>
    req.storage.getRole(req.params.id)
      .then(role => reply({
        _id: role._id,
        name: role.name,
        description: role.description
      }))
      .catch(err => reply.error(err))
});
