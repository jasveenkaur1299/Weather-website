const request = require('postman-request')

const forecast=(a,b,callback)=>
{
    const url='http://api.weatherstack.com/current?access_key=821fa55924773cd114c30d31affa5bd3&query='+a+','+b
    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to the internet',undefined)
        }
        if(body.error)
        {
            callback('Unable to search. Please try another place',undefined)
        }
        else{
            console.log(body.current)
            callback(undefined,'It is currently '+ body.current.temperature + ' degrees celcius. It feels like ' + body.current.feelslike + ' degrees celcius and has ' + body.current.precip +' chance of precipitation. It can be described as '+ body.current.weather_descriptions[0] + '!')
        }

    })
}
module.exports=forecast