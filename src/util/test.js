// Helper function:
function getDegreeParameter(inputParameters) {
  // Find the "degrees" parameter amongs all the other weather parameters for this date.
  for (let index in inputParameters) {
    const parameter = inputParameters[index];
    if (parameter.name === "t") {
      return parameter;
    }
  }
}

async function getTemperatureNow(dateOfInterest) {
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

// Helper function to add days to a date
Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

async function getMaxMinTemperature(dateOfInterest) {
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
      // For debugging:
      // console.log(currentDegreesParameter);
    }
  });

  return { maxTemp, minTemp };
}
