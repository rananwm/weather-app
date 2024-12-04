export function getWindDirection(degrees) {
    if (isNaN(degrees) || degrees < 0 || degrees >= 360) {
        return "Invalid";
    }

    const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];

    // Determine the index based on the degree value
    const index = Math.round(degrees / 22.5) % 16;

    return directions[index];
}