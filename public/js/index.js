function editDelete(worker) {
	document.getElementById(
		"edit"
	).innerHTML = `<div class="d-flex flex-column justify-content-end align-items-center">
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
	</div>`;
}

const checkWorkerProgress = workdays => {
	console.log(workdays.startTime);

	const startTime = formatDate(workdays.startTime);
	console.log(startTime);

	document.getElementById("progress-bar").innerHTML = `
	<div class="progress">
  <div class="float-left">
    <h5>Start time ${startTime}</h5>
  </div>
  <div class="float-right">
    <h5>End time ${endTime}</h5>
  </div>
  <div class="progress-bar bg-success" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0"
    aria-valuemax="100"></div>
</div>
`;
};

const formatDate = date => {
	return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
};
const formatHour = date => {
	return `${date.getHours()}:${
		date.getMinutes() < 10 ? "0" + date.getMinutes() : "" + date.getMinutes()
	}:${
		date.getSeconds() < 10 ? "0" + date.getSeconds() : "" + date.getSeconds()
	}`;
};

const formatNumber = number => {
	hours = Math.floor((number / (1000 * 60 * 60)) % 24);
	min = Math.floor((number / (1000 * 60)) % 60);
	sec = Math.floor((number / 1000) % 60);
	return `${hours}h ${min}min ${sec}sec`;
};

// //Format date
// hbs.registerHelper("formatHour", function(date) {
// 	return `${date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : "" + date.getMinutes()}:${date.getSeconds() < 10 ? "0" + date.getSeconds() : "" + date.getSeconds()}`;
// });

// hbs.registerHelper("formatDate", function(date) {
// 	r;
// });

// hbs.registerHelper("formatNumber", function(number) {});
