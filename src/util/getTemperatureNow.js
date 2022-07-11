import { getDegreeParameter } from "./getDegreeParameter";

export async function getTemperatureNow(dateOfInterest) {
  // GET JSON data from SMHI
  const data = await fetch(
    "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/18.06967/lat/59.32267/data.json"
  );
  const toJson = await data.json();

  let forecastParametersForDay;
  toJson.timeSeries.forEach((timeSerie) => {
    // Is this a timeSeries for today?
    if (timeSerie.validTime.substr(0, 10) === dateOfInterest) {
      forecastParametersForDay = timeSerie.parameters;
    }
  });

  const degreeParameterForToday = getDegreeParameter(forecastParametersForDay);

  // In the degree parameter there is only 1 degree forcast per hour... so grab cell 0
  const degreesNow = degreeParameterForToday.values[0];
  return degreesNow;
}
