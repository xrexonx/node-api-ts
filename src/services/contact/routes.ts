import { Request, Response, Router } from "express";

const contactRoutes: Router = Router()

contactRoutes.get('/contacts', (req: Request, res: Response) => {
    res.send('Contact list')
})


export default contactRoutes