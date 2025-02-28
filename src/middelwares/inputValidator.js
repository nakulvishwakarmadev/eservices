import Joi from "joi";

const userSchemeForLoginId=Joi.object({
    loginId:Joi.string().min(2).required()
})

const userSchemeForId=Joi.object({
    id: Joi.number()
    .integer()
    .required()
    .custom((value, helper) => {
      // Convert the number to a string and check the length
      if (value.toString().length < 4) {
        return helper.message('ID must have at least 4 digits');
      }
      return value;
    })
})

const validateUserId=(req,res,next)=>{
    const{error}=userSchemeForId.validate(req.body);
    if(error)
        return res.status(400).json({
    status:400,
    message:error.details[0].message,
    });
    next();
}

const validateLoginId=(req,res,next)=>{
    const{error}=userSchemeForLoginId.validate(req.body);
    if(error)
        return res.status(400).json({
    status:400,
    message:error.details[0].message,
    });
    next();
}

export { validateUserId, validateLoginId };