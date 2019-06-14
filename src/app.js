const express = require ( 'express' )
const path = require ( 'path' )
const hbs = require ( 'hbs' )

// Define paths
const publicDirPath = path.join ( __dirname, '../public' )
const viewsPath = path.join ( __dirname, '../templates/views' )
const partialsPath = path.join ( __dirname, '../templates/partials' )

const app = express ()

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
    res.send ( `You have provided ${req.query.address} as the address.` )
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

app.listen ( 3000, () => {
    console.log ( 'Server is up running at port 3000' )
} )