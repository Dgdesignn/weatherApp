const APIkey = `185d4ec55c669e64052f99fb22ec1ca4&lang=pt_br`;
const UrlBase = 'https://api.openweathermap.org/data/2.5/weather?'

const article = document.querySelector('article.details')



navigator.geolocation.getCurrentPosition(function(position){
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    initialWeather(lat, long)
})

async function initialWeather(lat, long){
    let url = UrlBase+`lat=${lat}&lon=${long}&appid=${APIkey}`
    const resp = await fetch(url,{origin:"cors"})
    const data = await resp.json()
    //console.log(data) 
    creator(data.name, KelvinToCelsius(data.main.temp), data.weather[0].description)
}

//function that return city url
const url = city=>UrlBase+`q=${city}&appid=${APIkey}`

 async function weatherByCityName(city){
    
    const resp = await fetch(url(city),{origin:"cors"})
    const data = await resp.json()
    console.log(data)

    creator(data.name, KelvinToCelsius(data.main.temp), data.weather[0].description)


}

//convert kelvin to celsius
function KelvinToCelsius(deg){
    return Math.floor(deg-273.15)
}

//html element geretor
function creator(name, degg, cloud){
    article.innerHTML = ''
    let deg = `  <h1>${degg}<sup>o</sup></h1>`
    let info = `   
            <div class="info">
                <h4 class="city">${name}</h3>
                <p>10:34 - Terça feira 21, Oct '22</p>
            </div>
    `
    let details = ` 
            <div class="cloud">
                <p>icon</p>
                <span>${cloud}</span>
            </div>
    `
    article.innerHTML += deg+info+details
}


const form = document.querySelector('form')
const search = form.querySelector('input')
form.addEventListener('submit',(e)=>{
    e.preventDefault()

    weatherByCityName(search.value)

    search.placeholder = `Cidade ${search.value}`
    search.value = ''

})





