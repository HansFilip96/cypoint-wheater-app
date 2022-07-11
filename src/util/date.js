// Helper function to add days to a date
Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

export function dateIsWithinTenDays(date) {
  const dateDifference = date - new Date();
  const daysBetween = Math.ceil(dateDifference / (1000 * 3600 * 24));
  return daysBetween < 10;
}

export function dateIsAfterToday(date) {
  const dateDifference = date - new Date();
  const daysBetween = Math.ceil(dateDifference / (1000 * 3600 * 24));
  return daysBetween > 0;
}
