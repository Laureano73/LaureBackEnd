import { Router } from "express";
import passport from "passport";
import  { authorization } from "../middlewares/auth.js"
import { getAllUsers, postRegister, postLogin, postLogout, postUpdate, postRestore, githubAuth, githubCallback, getCurrent, putRole, deleteUser, deleteUsers } from "../controllers/sessions.controller.js";


const sessionsRouter = Router();

sessionsRouter.get('/', getAllUsers);

sessionsRouter.post('/register',
    passport.authenticate("register", { failureRedirect: "/failregister" }), postRegister );

sessionsRouter.post('/login',
    passport.authenticate("login", { failureRedirect: "/faillogin" }), postLogin );

sessionsRouter.post('/logout', postLogout );

sessionsRouter.post('/restore-password', postRestore );

sessionsRouter.post('/update-password', postUpdate );

sessionsRouter.put('/premium/:uId', putRole );

sessionsRouter.get('/github',
    passport.authenticate("github", { scope: ["user:email"] }), githubAuth );

sessionsRouter.get('/githubcallback',
    passport.authenticate("github", { failureRedirect: "/login" }), githubCallback );

sessionsRouter.get('/current', authorization('usuario'), getCurrent );

sessionsRouter.delete('/:uId', authorization('admin'), deleteUser);

sessionsRouter.delete('/', authorization('admin'), deleteUsers);

export default sessionsRouter;