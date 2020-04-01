console.log('it works') /*checked to see js is inserted correctly*/

function getForm() {
    return document.getElementByClassName("contact");
  }

$(document).ready(function() {  /*ready() method is used to make a function available after the document is loaded*/
  $('.submit').click(function(event) { 
  console.log('Clicked button')/*checked to see the send button works well- the function  */
 
 /*Get values for the three fields*/
  var subject = $('.subject').val()
  var email=$('.email').val()
  var message=$('.message').val()
  var statusElm =$('.status')/*User can't see the console log > display it for user with var statusElm*/
  statusElm.empty() /*empty the form in case of multiple validations*/
   
    /*Check if values validate*/  
  if(email.length >5 && email.includes('@') && email.includes('.')) { /*All three conditions need to be true before continuing*/
   statusElm.append('<div> Email is valid </div>')  /*append will add new html inside that selector*/
 } else {
   event.preventDefault()/*everytime something makes the form invalid this function will prevent it to submit */
   statusElm.append('<div> Email is not valid </div>')
 }

 if(subject.length >= 2) {
    statusElm.append('<div> Subject is valid </div>')
 } else {
   event.preventDefault()
   statusElm.append('<div> Subect is not valid </div>')
 }

 if(message.length >=10) {
   statusElm.append('<div> Message is valid </div>')
   }else {
     event.preventDefault()
     statusElm.append('<div> Message is not valid </div>')
   }
}) 
})





