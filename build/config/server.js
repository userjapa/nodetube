'use strict'

const bodyParser = require('body-parser'),
    cors = require('cors'),
    helmet = require('helmet'),
    compression = require('compression')

module.exports = app => {

    app.set('port', 3000)
    app.use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }))
    app.use(helmet())
    app.use(compression())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({
        extended: true
    }))

}