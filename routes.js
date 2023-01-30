const router = require('express').Router();
const {body} = require('express-validator');


const {register} = require('./controller/registration');
const {login } = require('./controller/login');
const {getUser} = require('./controller/getUser');
const{forgetpassword} =require('./controller/forgetpassword');
const{resetpassword} =require('./controller/resetpassword');


const{addcategory}=require('./controller/addcategory');
const{addauction}= require('./controller/addauction');
const{addbid}=require('./controller/addbid');
const{addoccasion_media}=require('./controller/addoccasion_media');



const{getcategory}=require('./controller/getcategory');
const{listbid}=require('./controller/listbid');
const{listauction}=require('./controller/listauction');
const{listoccasion_media}=require('./controller/listoccasion_media');


const{getauction}=require('./controller/getauction');
const{getbid}=require('./controller/getbid');
const{listcategory}= require('./controller/listcategory');
// const{commondetail} = require('./controller/commondetail')




const{join}=require('./controller/join')



router.post('/register', register);
//     body('fullname',"The name must be of minimum 3 characters length")
//     .notEmpty()
//     .escape()
//     .trim()
//     .isLength({ min: 3 }),
//     body('email',"Invalid email address")
//     .notEmpty()
//     .escape()
//     .trim().isEmail(),
//     body('mobileno',"the mobileno must be of 10 chatacters length").notEmpty().trim().isLength({min:10,max:10}),

//     body('password',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 })
//     // body('confirmPassword',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 })



//     // .custom(async (confirmPassword, {req}) => {
//     //     const password = req.body.password

//     //     if(password !== confirmPassword){
//     //         throw new Error('Passwords must be same')
//     //       }

//     //     })

// ]


router.post('/login',[
    body('email',"Invalid email address")
    .notEmpty()
    .escape()
    .trim().isEmail(),
    body('password',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 }),
],login);

router.get('/getuser',getUser);

router.post('/forgetpassword',forgetpassword);
router.post('/resetpassword',resetpassword);

router.post('/addcategory',addcategory,[
    body('name',"The name must be of minimum 3 characters length")
    .notEmpty()
    .escape()
    .trim(),
    body('type').notEmpty().trim(),

]);

router.post('/getcategory',getcategory);


router.post('/listcatergory',listcategory)
router.post('/listauction',listauction);
router.post('/listbid',listbid);
router.post('/listoccasion_media',listoccasion_media);


router.post('/getauction',getauction);
router.post('/getbid',getbid);





router.post('/addauction',addauction);
router.post('/addbid',addbid)
router.post('/addoccasion_media',addoccasion_media)
router.post('/join', join)

// router.post('/commondetail',commondetail)





module.exports = router;