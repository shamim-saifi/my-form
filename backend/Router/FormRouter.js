import Express from "express";
import { isAuthUser } from "../Middleware/AuthForUser.js";
import { CreateForm, DeleteMyform, GetMyForm, GetSingleFrm, updateForm } from "../controller/FormController.js";

const router = Express.Router();

router.post('/newform', isAuthUser, CreateForm) 
router.get('/getmyform', isAuthUser, GetMyForm)
router.get('/getsingleform/:id', isAuthUser, GetSingleFrm)
router.put('/updatemyform/:id', isAuthUser, updateForm)
router.delete('/deletemyform/:id', isAuthUser, DeleteMyform)

export default router