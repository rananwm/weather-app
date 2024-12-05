export const showTemperature = (celsius: number, temperatureUnit: string) => {
  if (temperatureUnit === 'imperial') {
    return ((celsius * 9) / 5 + 32)?.toFixed(0);
  }
  return celsius;
};
