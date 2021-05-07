
/**
  * Get a string with parameters like 'my name is {{name}}' and replace 
  * variables inside {{}} with a value from an object like {name: 'Tom Cruise'}
  * @param str The string with variables
  * @param res An object that contain the variable values
  * @returns {string} The parsed string like: 'my name is Tom Cruise '
  */
function replaceVariables(str, variables) {
  if (str) {
    return str.replace(/{{(.+?)}}/g, (_, g1) => variables[g1] || g1);
  }
  return null;
}


module.exports = { replaceVariables };
