import Express from "express";
import { Contact, CreateNewUser, LoginUser, LogoutUser, UserProfile } from "../controller/UserController.js";
import { isAuthUser } from "../Middleware/AuthForUser.js";

const userrouter = Express.Router();

userrouter.post('/newuser', CreateNewUser)
userrouter.post('/login', LoginUser)
userrouter.get('/logout', LogoutUser)
userrouter.post('/contact', Contact)

userrouter.get('/me', isAuthUser, UserProfile) 


export default userrouter;