const hbs = require("hbs");
const path = require("path");

hbs.registerPartials(path.join(__dirname, "../views/partials"));

hbs.registerHelper("date", date => {
	const format = s => (s < 10 ? "0" + s : s);
	var d = new Date(date);
	return [format(d.getDate()), format(d.getMonth() + 1), d.getFullYear()].join(
		"/"
	);
});

//Equality helper

hbs.registerHelper("ifEquals", function(arg1, arg2, options) {
	return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper("toString", function(context) {
	return JSON.stringify(context);
});

//Format date
hbs.registerHelper("formatHour", function(date) {
	return `${date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : "" + date.getMinutes()}:${date.getSeconds() < 10 ? "0" + date.getSeconds() : "" + date.getSeconds()}`;
});

hbs.registerHelper("formatDate", function(date) {
	return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
});

hbs.registerHelper("formatNumber", function(number) {
	hours = Math.floor((number / (1000 * 60 * 60)) % 24);
	min = Math.floor((number / (1000 * 60)) % 60);
	sec = Math.floor((number / 1000) % 60);
	return `${hours}h ${min}min ${sec}sec`;
});

// Add hours

hbs.registerHelper("addHours", function(date) {
	return `${date.getHours(
		date.setHours(date.getHours() + 8)
	)}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : "" + date.getMinutes()}:${date.getSeconds() < 10 ? "0" + date.getSeconds() : "" + date.getSeconds()}`;
});

// Add difference in minutes

hbs.registerHelper("substractMinutes", function(date) {
	console.log(date);
	const totalMin = 480;
	let now = Date.now();
	const nowDate = new Date(now);
	const startDate = new Date("December 20, 2019 15:00:32");

	const hourDiff = nowDate - startDate;
	const diffHrs = Math.round((hourDiff % 86400000) / 3600000);
	let diffMins = Math.round(((hourDiff % 86400000) % 3600000) / 60000);
	diffMins = diffMins + diffHrs * 60;

	const calculatePercentage = (diffMins * 100) / totalMin;
	console.log(calculatePercentage);
	return calculatePercentage;
});

hbs.registerHelper("classColor", function(user) {
	if (user.workday && user.workday.break) {
		return "break";
	}
	return user.isWorking ? "working" : "notWorking";
});
