import Joi from 'joi';
import schema from '../../roles/schemas/role';

import { getRolesForUser } from '../../../lib/queries';

module.exports = () => ({
  method: 'GET',
  path: '/api/users/{id}/roles/calculate',
  config: {
    auth: {
      strategies: [ 'jwt' ],
      scope: [ 'read:roles' ]
    },
    description: 'Calculate the roles assigned to the user (including through group memberships).',
    tags: [ 'api' ],
    validate: {
      params: {
        id: Joi.string().required()
      }
    },
    response: { schema: Joi.array().items(schema).label('RoleList') }
  },
  handler: (req, reply) =>
    getRolesForUser(req.storage, req.params.id)
      .then(roles => roles.map((role) => ({
        _id: role._id,
        name: role.name,
        applicationId: role.applicationId,
        description: role.description
      })))
      .then(roles => reply(roles))
      .catch(err => reply.error(err))
});
