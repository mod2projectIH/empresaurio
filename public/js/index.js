
function deploy(worker) {
let rows = []
let html = ""
const table = document.getElementById("control")
const createTable = document.createElement("tr")
const row = table.appendChild(createTable)

axios.get(`/workers/${worker._id}/deploy`)

.then(response => {

  console.log(response)
  insertProgressBar(response)

}).catch(error=>{
  console.log(error)
})

function insertProgressBar(response){

  row.innerHTML = ""
  
  
  html += `<tr><div class="progress">
  <div class="progress-bar bg-success" role="progressbar" style="width: 100%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${worker.lastName}</div>
  </div></tr>`
  row.innerHTML = html

}

	
}

