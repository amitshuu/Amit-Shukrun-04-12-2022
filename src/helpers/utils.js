export const temperatureConverter = (value, unit) => {
  return unit === 'fahrenheit' ? value : (value - 32) / (1.8).toFixed();
};
