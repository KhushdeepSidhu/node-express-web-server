const getForecast = async ( address ) => {

    const data = await fetch ( `http://localhost:3000/weather?address=${address}` )
    const dataJSON = await data.json()

    return dataJSON

}



const weatherForm = document.querySelector ( 'form' )
const searchElement = document.querySelector ( 'input' )
const locationMessage = document.querySelector ( '#message-one' )
const forecastMessage = document.querySelector ( '#message-two' )

weatherForm.addEventListener ( 'submit', ( event ) => {
    event.preventDefault()
    const location = searchElement.value
    locationMessage.textContent = 'Loading...'
    forecastMessage.textContent = ''

    getForecast( location ).then ( ( data ) => {

        if ( data.error ) {
            locationMessage.textContent = data.error
        } else {
            locationMessage.textContent = data.location
            forecastMessage.textContent = data.forecast
    
            searchElement.value = ''
        }
    
    } ).catch ( ( error ) => {
        console.log ( `Error: ${error}` )
    } )
} )

