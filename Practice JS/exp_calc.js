const experience_calc = (date) => {
  let join_date = Date.parse(date);
  console.log();
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

console.log("Experience calculated - ", experience_calc("2021-5-27"));
