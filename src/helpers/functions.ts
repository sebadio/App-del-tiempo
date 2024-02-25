const token = import.meta.env.PUBLIC_TOKEN;
const url = "https://api.openweathermap.org/data/2.5/";

async function getWeather(input: string) {
    const response = await fetch(
        `${url}weather?q=${input}&lang=en&appid=${token}&units=metric`
    );

    const data = await response.json();

    return data;
}

async function getForecast(lat: number, lon: number) {
    const response = await fetch(
        `${url}forecast?lat=${lat}&lon=${lon}&appid=${token}&units=metric`
    );

    const data = await response.json();

    console.log(data);

    return data;
}

export { getWeather, getForecast, token };
