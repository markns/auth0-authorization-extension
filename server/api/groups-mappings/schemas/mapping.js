import Joi from 'joi';

export default Joi.object().keys({
  _id: Joi.string().guid(),
  groupName: Joi.string().min(1).max(50).required(),
  connectionName: Joi.string().min(1).max(50).required()
}).label('Mapping');

