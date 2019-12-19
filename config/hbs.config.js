const hbs = require('hbs');
const path = require('path');

hbs.registerPartials(path.join(__dirname, '../views/partials'));

hbs.registerHelper('date', (date) => {
  const format = (s) => (s < 10) ? '0' + s : s
  var d = new Date(date)
  return [format(d.getDate()), format(d.getMonth() + 1), d.getFullYear()].join('/')
})

//Equality helper

hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});


hbs.registerHelper('toString', function(context) {
  return JSON.stringify(context);
});

//Format date
hbs.registerHelper('formatHour', function(date){
  return `${date.getHours()}:${date.getMinutes() < 10 ? '0'+ date.getMinutes(): '' + date.getMinutes()}:${date.getSeconds() < 10 ? '0'+ date.getSeconds(): '' + date.getSeconds()}`
})

hbs.registerHelper('formatDate', function(date){
  return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
})

hbs.registerHelper('formatNumber', function(number){
  hours = Math.floor((number / (1000 * 60 * 60))%24)
    min = Math.floor((number / (1000 * 60))%60)
    sec = Math.floor((number / 1000)%60)
  return `${hours}h ${min}min ${sec}sec`
})