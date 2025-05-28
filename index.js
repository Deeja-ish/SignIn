const scriptURL = "https://script.google.com/macros/s/AKfycbwMOzfKpPquAa2yw8KEymGCZjlTA0R8yIbyt6yzKKU2ir-g_6E9fGmIMRXa1Nqiil9jpA/exec"
const form = document.forms['submit-to-google-sheet']
const successMessage = document.getElementById("message");

form.addEventListener('submit', e => {
  e.preventDefault()

  successMessage.innerHTML = 'Submitting....'

  fetch(scriptURL , { 
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
    successMessage.innerHTML = "Thank you for Signing up! We will keep you updated.";
    successMessage.style.color = 'green'
    form.reset();
    setTimeout(function(){
      successMessage.innerHTML = "";
      successMessage.style.color = "";
    }, 5000)
  })
})

