const scriptURL = "https://script.google.com/macros/s/AKfycbxmzxLCV44MVuo06XWGkv4olbq2lh_bWHcvvdbM78F86Oq2XyPXxU5NQuqSBKDnYj9OWw/exec"

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => {
        console.log('Success!', response)
        alert("Thank you for signing up! We will keep you updated.")
        form.reset()
      })
      .catch(error => console.error('Error!', error.message))
});