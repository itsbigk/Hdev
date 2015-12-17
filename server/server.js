import http from 'http'
import express from 'express'
import React from 'react'
import { RoutingContext, match } from 'react-router'
import { renderToString } from 'react-dom/server'
import createLocation from 'history/lib/createLocation'
import routes from '../src/config/routes.jsx'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import morgan from 'morgan'
import api from './api'
import db from './db'

const app  = express()
const port = process.env.PORT || 3000

app.server = http.createServer(app)

app.use(express.static('./public'))
app.use(express.static('./node_modules'))
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.text())
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
app.use(methodOverride())

db(() => {

  app.use('/api', api())

  app.use((req, res) => {

    let location = createLocation(req.path)

    match({routes, location}, (error, redirectLocation, renderProps) => {
      const initialComponent = renderToString(<RoutingContext {...renderProps} />)

      const HTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Node/React</title>
          <script src="react-mdl/extra/material.min.js"></script>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        </head>
        <body>
          <div id="app">` + initialComponent + `</div>
          <script src="bundle.js"></script>
        </body>
      </html>
      `

      if(redirectLocation)
        res.redirect(301, redirectLocation.pathname + redirectLocation.search)
      else if(error)
        res.send(500, error.message)
      else if(renderProps == null)
        res.send(404, 'Not Found')
      else
        res.end(HTML)
    })
  })

  app.server.listen(port)

  console.log('Server running on http://localhost:%s', port);
})

export default app
