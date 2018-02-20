import Joi from 'joi';
import schema from '../schemas/permission';

module.exports = () => ({
  method: 'POST',
  path: '/api/permissions',
  config: {
    auth: {
      strategies: [ 'jwt' ],
      scope: [ 'create:permissions' ]
    },
    description: 'Create a new permission.',
    tags: [ 'api' ],
    validate: {
      options: {
        allowUnknown: false
      },
      payload: schema
    },
    response: { schema: schema }
  },
  handler: (req, reply) => {
    const permission = req.payload;
    return req.storage.createPermission(permission)
      .then((created) => reply(created))
      .catch(err => reply.error(err));
  }
});
