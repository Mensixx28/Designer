const form = document.getElementById('form')
const firstname_input = document.getElementById('firstname_input')
const email_input = document.getElementById('email_input')
const password_input = document.getElementById('password_input')
const repeatPassword_input = document.getElementById('repeatPassword_input')
const error_message = document.getElementById('error-message')

form.addEventListener('submit', (e) => {
   
   let errors =  []

   if(firstname_input){
    // if we have a firstname input then we are in the signup
    errors = getSignupFormErrors(firstname_input.value, email_input.value, password_input.value, repeatPassword_input.value)
   }
   else{
    // if we don't have a firstname_input then we are in the Login
    errors = getLoginFormErrors(email_input.value, password_input.value)
   }

   if(errors.length > 0){
    // if there are any errors
    e.preventDefault()
    error_message.innerText = errors.join(". ")
   }
})

function getSignupFormErrors(firstname, email, password, repeatPassword){
 let errors = []

 if(firstname === '' || firstname == null){
    errors.push('Firstname is required')
    firstname_input.parentElement.classList.add('incorrect')
 }
 if(email === '' || email == null){
    errors.push('Email is required')
    email_input.parentElement.classList.add('incorrect')
 }
 if(password=== '' || password == null){
    errors.push('Password is required')
    password_input.parentElement.classList.add('incorrect')
 }
 if(password !== repeatPassword){
    errors.push('Password does not match repeated password')
 }

 return errors;
}
const allInputs = [firstname_input, email_input, password_input, repeatPassword_input]

allInputs.forEach(input => {
    input.addEventListener('input', () => {
        if(input.parentElement.classList.contains('incorrect')){
            input.parentElement.classList.remove('incorrect')
            error_message.innerText = ''
        }
    })
})