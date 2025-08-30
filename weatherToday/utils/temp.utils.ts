import _ from "lodash";

/**
 * Converts a temperature in Kelvin to Celsius
 * @param {number} temp - The temperature in Kelvin to convert
 * @returns {number} The temperature in Celsius
 */
export const kelvinToCelsius = (temp: number): number => {
  return _.round(temp - 273.15, 2);
};

/**
 * Converts a temperature in Kelvin to Fahrenheit
 * @param {number} temp - The temperature in Kelvin to convert
 * @returns {number} The temperature in Fahrenheit
 */
export const kelvinToFahrenheit = (temp: number): number => {
  return _.round(((temp - 273.15) * 9) / 5 + 32);
};

/**
 * Converts a temperature in Celsius to Fahrenheit
 * @param {number} temp - The temperature in Celsius to convert
 * @returns {number} The temperature in Fahrenheit
 */
export const celsiusToFahrenheit = (temp: number): number => {
  return _.round((temp * 9) / 5 + 32);
};

/**
 * Converts a temperature in Fahrenheit to Celsius
 * @param {number} temp - The temperature in Fahrenheit to convert
 * @returns {number} The temperature in Celsius
 */
export const fahrenheitToCelsius = (temp: number): number => {
  return _.round(((temp - 32) * 5) / 9);
};

/**
 * Converts a temperature in Kelvin to the desired unit
 * @param {number | undefined} temp - The temperature in Kelvin to convert
 * @param {string} unit - The desired unit of temperature ("celsius" or "fahrenheit")
 * @returns {number | string} The temperature in the desired unit, if temperature is undefined then will return 'N/A'
 */
export const tempConverter = (
  temp: number | undefined,
  unit: string
): number | string => {
  if (!temp || !unit) {
    return "N/A";
  }
  switch (unit) {
    case "celsius":
      return kelvinToCelsius(temp);
    case "fahrenheit":
      return kelvinToFahrenheit(temp);
    default:
      return temp;
  }
};
