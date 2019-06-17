const request = require ( 'request' )

const geoCode = ( address, callback ) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent( address )}.json?access_token=pk.eyJ1Ijoia2h1c2hkZWVwLXNpZGh1IiwiYSI6ImNqdDdjMDRkZzBjN2c0M2p6YmxxM2h2ZWoifQ.zxVAqQAkx95Gw7tArSMEaw&limit=1`

    request ( {
        url,
        json: true
    }, ( error, { body } ) => {

        if ( error ) {
            callback ( 'Unable to connect to location services!', undefined )
        } else if ( body.features.length === 0 ) {
            callback ( 'Unable to find location. Try another search!', undefined )
        } else {
            const longitude = body.features[ 0 ].center [ 0 ]
            const latitude = body.features[ 0 ].center [ 1 ]
            const location = body.features[ 0 ].place_name
            
            callback ( undefined, {
                longitude,
                latitude,
                location
            } )

        }
    
    } )

}

const forecast = ( latitude, longitude, callback ) => {

    const url = `https://api.darksky.net/forecast/b461f65102fe8960c64ef744d2bc1592/${latitude},${longitude}?units=si`

    request ( {
        url,
        json: true
    }, ( error, { body } ) => {
        if ( error ) {
            callback ( 'Unable to connect to dark-sky web service!', undefined )
        } else if ( body.error ) {
            callback ( 'Unable to find location!', undefined )
        } else {
            const forecastData = `${ body.daily.data [ 0 ].summary } It is currently ${ body.currently.temperature }. There is a ${ body.currently.precipProbability } % chance of rain. Temperature high for the day is ${body.daily.data [ 0 ].temperatureHigh}. Temperature low for the day is ${body.daily.data [ 0 ].temperatureLow}`
            callback ( undefined, forecastData )
        }
    } )
}

module.exports = { geoCode, forecast }