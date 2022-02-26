const path=require('path')
const express=require('express')
const hbs=require('hbs')
const forecast=require('./utils/forecast')
const geocode=require('./utils/geocode')
const request=require('postman-request')

const port=process.env.PORT || 3000

const PublicDirectoryPath=path.join(__dirname,'../public')
const ViewPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

const app=express()
app.set('view engine','hbs')
app.set('views',ViewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(PublicDirectoryPath))
app.get('',(req,res)=>{
    res.render('index',{
        names:'jasveen',
        title:'Weather'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        names:'jasveen',
        title:'Help',
        helpmsg:'Please contact the owner on jasveenkaur5453@gmail.com for further assistance'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        names:'jasveen',
        title:'About'
    })
 })

app.get('/weather',(req,res)=>
{
    if(!req.query.address)
    {
        return res.send({
            error:'Please provide a search location!'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>
    {
    if(error){
    return res.send({error})
     }
     forecast(latitude,longitude,(error,ForecastData)=>
    {
      if(error){
        return res.send({error})
    }
    res.send({
    forecast:ForecastData,
    location,
    address:req.query.address 
    })
})
})
})


app.get('/help/*/',(req,res)=>{
   res.render('404',{
     names:'jasveen',
     title: '404 page',
    errorMsg: "Sorry! This help page is not found"
})
})
app.get('*',(req,res)=>
{
    res.render('404',{
        names:'jasveen',
        title:'404 page',
        errorMsg: "Sorry! Page does not exist"})
    })

app.listen(port,()=>{
    console.log('server is up at port 3000')
})