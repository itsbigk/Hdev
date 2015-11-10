import { Router } from 'express'
import User from './models/User'

export default function() {
   let api = Router()

   api.get('/', (req, res) => {
     res.json({
       version: '1.0'
     })
   })

   api.get('/users', (req, res) => {
     User.find({}, (err, users) => {
       res.json(users)
     })
   })

   

   return api
}
