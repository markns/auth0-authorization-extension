import Joi from 'joi';

export default Joi.object().keys({
  _id: Joi.string().guid(),
  name: Joi.string().min(1).max(50).required(),
  description: Joi.string().min(1).max(500).required(),
  mappings: Joi.array().items(Joi.object().keys({
    _id: Joi.string().guid(),
    groupName: Joi.string().min(1).max(50).required(),
    connectionName: Joi.string().min(1).max(50).required()
  })).default([ ]),
  members: Joi.array().items(Joi.string()).default([ ]),
  nested: Joi.array().items(Joi.string().guid()).default([ ]),
  roles: Joi.array().items(Joi.string().guid()).default([ ])
}).label('Group');
