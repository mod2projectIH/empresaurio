
/*onclick="${doDelete(worker._id)}"/*/
function editDelete(worker) {
	
	document.getElementById("edit").innerHTML = `<div class="d-flex flex-column justify-content-end align-items-center">
	<div>
	
    <button type="submit" class="w-100 btn btn-info" id="update${worker.id}">
      Edit worker ${worker.firstName} ${worker.lastName} 
    </button>
  </div>
</div>
<div class="d-flex flex-column justify-content-end align-items-center">
<form action="/workers/delete/${worker._id}" method="POST">
  <div>
    <button class="w-100 btn btn-danger" id="${worker._id}"> 
      Delete ${worker.firstName} ${worker.lastName} </button>
	</div>
	</form>
</div>`

}

// const doDelete = (id) =>{
// // console.log(typeof(id) +  "ENTRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
// 		return axios.delete(`http://localhost:3000/workers/delete/${id}`)
// 		.then(response => response.data)
// 		.catch(error=>{console.log(error.toJSON())})




// }

// const deleteById = (worker) => {

// 	let id = worker.id
// 	doDelete(id)

// }

const checkWorkerProgress = (worker) =>{
console.log(worker._id)
	document.getElementById(worker._id).innerHTML = "<tr>Hola</tr>"
	}







const insertUpload = (worker) =>{

document.getElementById("files-upload").innerHTML = `<div class="container-fluid">
  
<form action="/workers/${worker._id}/upload" method="POST" enctype="multipart/form-data">
	<div class="form-group">
		<label for="type">Type</label>
		<input name="type" type="text" class="form-control" id="firstName"
			placeholder="Enter type" value="Type">
		
		
	
	</div>
	<div class="form-group">
		<label for="type">Description</label>
		<input name="description" type="text" class="form-control" id="firstName"
			placeholdeworkerr="Enter description" value="Description">
		
		
		
	</div>
	<div class="form-group">
		<label for="file">Upload file</label>
		<input name="file" type="file" class="form-control-file " id="profilePic"
			placeholder="Upload file" value="Upload" id="file-upload">
	
		
	</div>
	<button type="submit" class="btn btn-primary mt-5 w-100">
		Upload
	</button>
</form>
</div>
`
}

// const doUploadFile = (worker) => {
// 	const formData = new formData()
// 	const imgFile = document.getElementById("file-upload")
// 	formData.append("image", imagefile.files[0])

// 	axios.post({url: `/workers/${worker._id}/uploadFiles`, formData, headers:{'Content-Type': 'multipart/form-data'})
// 	.then(worker=> req.params)



// }