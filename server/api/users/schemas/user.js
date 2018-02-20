import Joi from 'joi';

export default Joi.object().keys({
  email: Joi.string().email().required(),
  email_verified: Joi.boolean().required(),
  user_id: Joi.string().min(1).max(500).required(),
  picture: Joi.string().min(1).max(500),
  identities: Joi.object().keys({
    user_id: Joi.string().min(1).max(500).required(),
    provider: Joi.string().required(),
    connection: Joi.string().required(),
    isSocial: Joi.boolean().required()
  }),
  updated_at: Joi.string(),
  created_at: Joi.string(),
  name: Joi.string(),
  last_ip: Joi.string(),
  last_login: Joi.string(),
  logins_count: Joi.number()
}).label('User');


// {
//    "email":"dummy.user@example.com",
//    "email_verified":true,
//    "user_id":"auth0|59091da1b3c34a15589c780d",
//    "picture":"https://s.gravatar.com/avatar/your-gravatar.png",
//    "nickname":"dummy.user",
//    "identities":[
//       {
//          "user_id":"59091da1b3c34a15589c780d",
//          "provider":"auth0",
//          "connection":"Username-Password-Authentication",
//          "isSocial":false
//       }
//    ],
//    "updated_at":"2017-06-25T07:28:54.719Z",
//    "created_at":"2017-06-08T15:30:41.237Z",
//    "name":"dummy.user@example.com",
//    "last_ip":"83.208.22.80",
//    "last_login":"2017-06-25T07:28:54.719Z",
//    "logins_count":12
// }
