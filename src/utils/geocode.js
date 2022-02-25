const request=require('postman-request')
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiamFzdmVlbiIsImEiOiJja3pneDE5cTkxNGt0MnBwY2U0bzN2bmJsIn0.o7HDwzSPsk0YEcAd11tu6A'
    request({url,json:true},(error,{body})=>
    {
        if(error)
        {
            callback('no internet',undefined)
        }
        else if(body.features.length===0)
        {
           callback('place not found', undefined)
        }
        else{
         callback(undefined,{
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location:body.features[0].place_name
         })
        }

    })


}

module.exports=geocode