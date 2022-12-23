import { Router } from "express";
import adapt from "../adapter/express-adapter";
import { UserFactory } from "../factories/authFactiry";

const router = Router()

export default (router: Router) => {
    router.post('/signin', adapt(UserFactory()))
}