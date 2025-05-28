const scriptURL = "https://script.google.com/macros/s/AKfycby9q5raiPrBFL-QnFbjyoXfe4ZRqCrTBT2OOBx_Mpmj2z580HpAsubt2lduJOtYVitddA/exec"
const form = document.forms['submit-to-google-sheet']
const successMessage = document.getElementById("message");

form.addEventListener('submit', e => {
  e.preventDefault()

  successMessage.innerHTML = 'Submitting....'

  fetch(scriptURL,{ 
    method: 'POST', 
    body: new FormData(form)
  })
    // start editting
  .then(response => {

    if(!response.ok){
      return response.text().then(text => { throw new Error(text) })
    }
    return response.json();
  })

  .then(data => {

    if(data.result === 'success'){
      successMessage.innerHTML = "Thank you for Signing up! We will keep you updated.";
      console.log('Success from App script:', data)
      form.reset();
    }
    else{
      successMessage.innerHTML = "Error: " + data.error;
      successMessage.style.color = 'red'
      console.error('Error from App Script:', data.error);
    }
    setTimeout(function() {

      successMessage.innerHTML = "";
      successMessage.style.color = "";
    }, 5000)
  })
  .catch(error =>{
    console.log('Fetch Error!', error)
    successMessage.innerHTML ='Failed to submit, Please try again'
    successMessage.style.color = 'red'
    setTimeout(function(){
      successMessage.innerHTML = "";
      successMessage.style.color = "";
    }, 5000)
  })
})

