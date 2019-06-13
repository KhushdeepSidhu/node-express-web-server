const express = require ( 'express' )
const path = require ( 'path' )

const publicDirPath = path.join ( __dirname, '../public' )

const app = express ()

app.use ( express.static ( publicDirPath ) )

// forecast
app.get ( '/weather', ( req, res ) => {
    res.send ( {
        location: 'Vaudreuil-dorion',
        forecast: 'Rainy weather'
    } )
} )

app.listen ( 3000, () => {
    console.log ( 'Server is up running at port 3000' )
} )