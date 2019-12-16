function deploy(worker) {
	let html = "";
	const table = document.getElementById("control");
	const createTable = document.createElement("tr");
	const row = table.appendChild(createTable);

	axios
		.get(`/workers/${worker._id}/deploy`)

		.then(response => {
			console.log(response);
			insertProgressBar(response);
		})
		.catch(error => {
			console.log(error);
		});

	function insertProgressBar(response) {
		row.innerHTML = "";

		html += `<tr><div class="progress">
  <div class="progress-bar bg-success" role="progressbar" style="width: 100%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${worker.lastName}</div>
  </div></tr>`;
		row.innerHTML = html;
	}
}


// function uploadFiles(worker){

  

// 	axios
// 		.get(`/workers/${worker._id}/deploy`)

// 		.then(response => {
// 			console.log(response);
// 			insertUpload(response);
// 		})
// 		.catch(error => {
// 			console.log(error);
// 		});

// 	function insertUpload(response) {
// 		let html = "";
// 	const container = document.getElementById("upload");
// 	const div = document.createElement("div");

// 		html += `{
//       <div class="container-fluid">
  
//   <form action="/workers/{{worker.id}}" method="POST" enctype="multipart/form-data">
//     <div class="form-group">
//       <label for="type">Type</label>
//       <input name="type" type="text" class="form-control {{#if error.type }}is-invalid{{/if}}" id="firstName"
//         placeholder="Enter name" value="${response.lastName}">
//       {{#if error.type}}
//       <div class="invalid-feedback">
//         {{error.type.message}}
//       </div>
//       {{/if}}
//     </div>
//     <div class="form-group">
//       <label for="file">Upload file</label>
//       <input name="file" type="file" class="form-control-file {{#if error.file }}is-invalid{{/if}}" id="profilePic"
//         placeholder="Enter profilePic url" value="${ response.file }">
//       {{#if error.file}}
//       <div class="invalid-feedback">
//         {{error.file.message}}
//       </div>
//       {{/if}}
//     </div>
//     <button type="submit" class="btn btn-primary mt-5 w-100">
//       Upload
//     </button>
//   </form>
//   </div>
//     }`;
// 		container.innerHTML = html;
// 	}
// }

