const express = require ( 'express' )
const path = require ( 'path' )
const hbs = require ( 'hbs' )
const utils = require ( './utils' )

// Define paths
const publicDirPath = path.join ( __dirname, '../public' )
const viewsPath = path.join ( __dirname, '../templates/views' )
const partialsPath = path.join ( __dirname, '../templates/partials' )

const app = express ()

// configure port to make the application on heroku also
const port = process.env.PORT || 3000

// Setup static directory to serve
app.use ( express.static ( publicDirPath ) )

// Customize views path
app.set ( 'views', viewsPath )

// Register partials
hbs.registerPartials ( partialsPath )

// Handlebars configuration
app.set ( 'view engine', 'hbs' )

// Render root page 
app.get ( '', ( req, res ) => {
    res.render ( 'index', {
        title: 'Weather',
        name: 'Khushdeep Sidhu'
    } )
} )

// Render about page
app.get ( '/about', ( req, res ) => {
    res.render ( 'about', {
        title: 'About me',
        name: 'Khushdeep Sidhu'        
    } )
} )

// Render help page
app.get ( '/help', ( req, res ) => {
    res.render ( 'help', {
        title: 'Help',
        message: 'This is my help page.',
        name: 'Khushdeep Sidhu'
    } )
} )

// forecast
app.get ( '/weather', ( req, res ) => {
    
    if ( !req.query.address ) {
        return res.send ( {
            error: 'Please provide a valid address!'
        } )
    }

    utils.geoCode ( req.query.address, ( error, { latitude, longitude, location } = {} ) => {
        
        if ( error ) {
            return res.send ( { error } )
        }

        utils.forecast ( latitude, longitude, ( error, forecastData ) => {
            if ( error ) {
                return res.send ( { error } )
            }

            return res.send ( {
                location,
                address: req.query.address,
                forecast: forecastData
            } )
        } )

    } )
    
} )

// 404 not found page help
app.get ( '/help/*', ( req, res ) => {
    res.render ( '404', {
        title: 'Weather',
        errorMessage: 'Help article not found.',
        name: 'Khushdeep Sidhu'
    } )
} )

// 404 not found page generic
app.get ( '*', ( req, res ) => {
    res.render ( '404', {
        title: 'Weather',
        errorMessage: 'Page not found.',
        name: 'Khushdeep Sidhu'
    } )
} )

app.listen ( port, () => {
    console.log ( `Server is up running at port ${port}` )
} )