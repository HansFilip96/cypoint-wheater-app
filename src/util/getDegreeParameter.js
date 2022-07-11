// Helper function:
export function getDegreeParameter(inputParameters) {
  // Find the "degrees" parameter amongs all the other weather parameters for this date.
  for (let index in inputParameters) {
    const parameter = inputParameters[index];
    if (parameter.name === "t") {
      return parameter;
    }
  }
}
