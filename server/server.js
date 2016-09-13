import express from 'express'
import React from 'react'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config.dev.js'
import { RouterContext, match, createLocation } from 'react-router'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import configureStore from '../src/store/configureStore'
import routes from '../src/components/routes.jsx'
import bodyParser from 'body-parser'
import manifest from '../dist/ui/manifest.json'
import methodOverride from 'method-override'
import favicon from 'serve-favicon'
import morgan from 'morgan'
import api from './api'
import db from './db'

const app  = express(),
      port = process.env.PORT || 3000,
      compiler = webpack(webpackConfig);

let bundle
let style
let vendor

if(process.env.NODE_ENV === 'production') {

  app.use(express.static('./dist'))
  bundle = manifest['bundle.js']
  style = manifest['bundle.css']
  vendor = manifest['vendor.js']

} else if(process.env.NODE_ENV === 'development') {

  bundle = `${webpackConfig.output.publicPath}/bundle.js`
  app.use(morgan('dev'))
}

app.use(express.static('./node_modules'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.text())
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
app.use(methodOverride())
app.set('view engine', 'ejs')

db(() => {

  app.use('/api', api())

  app.use(favicon('favicon.ico'))

  if(process.env.NODE_ENV === 'development') {
    app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
    app.use(webpackHotMiddleware(compiler))
  }

  app.use((req, res) => {

    const initialState = {},
          store = configureStore(initialState);

    match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
      const initialComponent = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      ),
      finalState = store.getState();

      if(redirectLocation)
        res.redirect(301, redirectLocation.pathname + redirectLocation.search)
      else if(error)
        res.send(500, error.message)
      else if(renderProps == null)
        res.send(404, 'Not Found')
      else
        res.render('index.ejs', { bundle: bundle, style: style, vendor: vendor, reactOutput: initialComponent, state: finalState })
    })
  })

  app.listen(port, error => {
    if (error) {
      console.error(error)
    } else {
      console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
    }
  })
})

export default app
