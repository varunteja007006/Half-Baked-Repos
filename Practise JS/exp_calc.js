/*
let ms = Date.parse("2021-5-27");
let d = Date.now();
let days = (d-ms)/(1000*60*60*24);
let years_calc = Math.round((days/365)*10)
let years = years_calc/10

// calculate exact year gap
var years;
if ( today.getMonth() > birthDate.getMonth() ||
     ( today.getMonth() == birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate()
     )
   ) {
  years = today.getFullYear() - birthDate.getFullYear();
}
else {
  years = today.getFullYear() - birthDate.getFullYear() - 1;


  // calculate exact month gap
var months;
if (today.getDate() >= birthDate.getDate()) {
  months = today.getMonth() - birthDate.getMonth();
}
else if (today.getDate() < birthDate.getDate()) {
  months = today.getMonth() - birthDate.getMonth() - 1;
}
// make month positive
months = months < 0 ? months + 12 : months;

// calculate exact day gap
var days;
var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
if (today.getDate() >= birthDate.getDate()) {
  days = today.getDate() - birthDate.getDate();
} else {
  days = today.getDate() - birthDate.getDate() + monthDays[birthDate.getMonth()];
}

 ${years} years, ${months} months and ${days} days
*/

   const experience_calc = (date) => {
     let join_date = Date.parse(date);
     console.log()
     //console.log(date);
     let today_date = Date.now();
     //console.log(today_date);
     //1 day = __ milliseconds? => (1day = 24hours) * (1hr = 60mins) * (1 min = 60secs) * (1sec = 1000 miliseconds) 
     let days = Math.round((today_date - join_date) / (1000 * 60 * 60 * 24));
     //console.log('days between join date & todays date',days);
     let years_calc = Math.round((days / 365) * 10);
     //console.log(years_calc);
     let years_exp = (years_calc + 1) / 10;
     //console.log(years_exp);
    return years_exp;
  };

  console.log('Experience calculated - ',experience_calc('2021-5-27'))