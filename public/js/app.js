// import fetch from "node-fetch";
// const fetch=require('node-fetch')
console.log('Client side javascript file is loaded!')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//             console.log(data)
//         })

// })

// fetch('http://localhost:3000/weather?address=!').then((response)=>{
// response.json().then((data)=>
// {
//     if(data.error)
//     {console.log(data.error)}
    
//     else 
// {console.log(data)}
// })
// })

const weatherform=document.querySelector('form')
const search=document.querySelector('input')
const msg1=document.querySelector('#msg-1')
const msg2=document.querySelector('#msg-2')


msg2.textContent=''

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location=search.value
    
    msg1.textContent='Loading the results. Please wait :)'
    msg2.textContent=''

    fetch('http://localhost:3000/weather?address='+ location ).then((response)=>{
      response.json().then((data)=>
     {
    if(data.error){
    msg1.textContent='balabajajja'+ data.error
    msg2.textContent=''}
    
    else {
       msg1.textContent=data.location
       msg2.textContent=data.forecast
    }

      })
      })
    // console.log('testing!' + location)
})