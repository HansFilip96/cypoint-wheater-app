import { getDegreeParameter } from "./getDegreeParameter";

export async function getMaxMinTemperature(dateOfInterest) {
  // GET JSON data from SMHI
  const data = await fetch(
    "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/18.06967/lat/59.32267/data.json"
  );
  const toJson = await data.json();

  let maxTemp = -99;
  let minTemp = 99;

  toJson.timeSeries.forEach((timeSerie) => {
    // Is this a timeSeries for today?
    if (timeSerie.validTime.substr(0, 10) === dateOfInterest) {
      const currentDegreesParameter = getDegreeParameter(timeSerie.parameters);
      const currentDegrees = currentDegreesParameter.values[0];

      if (currentDegrees > maxTemp) {
        maxTemp = currentDegrees;
      }

      if (currentDegrees < minTemp) {
        minTemp = currentDegrees;
      }
    }
  });

  return { maxTemp, minTemp };
}
