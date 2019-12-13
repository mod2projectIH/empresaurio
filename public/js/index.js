function like(event) {
  const button = event.target

  axios.get(`/worker/${worker.id}`)
    .then(response => {
      const details = button.querySelector(".details")

      details.innerText = "<h1> Hello </h1>"
    })
    .catch(console.error)
}