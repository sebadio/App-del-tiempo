<script>
    import { onMount } from "svelte";
    import { getForecast, getWeather } from "@helpers/functions";

    import { Skeleton } from "$lib/components/ui/skeleton";

    import ForecastTable from "./ForecastTable.svelte";
    import SkeletonForecastTable from "./SkeletonForecastTable.svelte";

    let loading = true;
    let city = "";
    let a_weather = {};
    let forecast = {};

    onMount(async () => {
        const params = new URLSearchParams(location.search);
        city = params.get("city") || "";
        const data = await getWeather(city);
        console.log(data);

        const { main, name, weather } = data;
        const { description, icon, id, main: type } = weather[0];

        const { temp, feels_like, temp_min, temp_max, pressure, humidity } =
            main;

        document.title = `${name}`;
        a_weather = {
            description,
            icon,
            id,
            main: type,
            temp,
            feels_like,
            temp_min,
            temp_max,
            pressure,
            humidity,
            name,
        };

        const { lat, lon } = data.coord;

        forecast = await getForecast(lat, lon);
        console.log(forecast);

        const { list } = forecast;
        forecast = list.map((day) => {
            const date = new Date(day.dt_txt);
            return {
                ...day,
                dt_txt: [date.toLocaleDateString(), date.toLocaleTimeString()],
            };
        });
        console.log(forecast);

        loading = false;
    });
</script>

<section class="font-mono font-bold w-100%">
    {#if loading}
        <Skeleton class="h-10 w-72 max-w-[100% - 2rem]" />
        <header class="flex items-center space-x-2 mt-2">
            <Skeleton class="size-10 rounded-full max-w-[100% - 2rem]" />
            <Skeleton class="h-6 w-44 max-w-[100% - 2rem]" />
        </header>

        <body class="flex flex-col gap-2 mt-2 mb-8">
            <p class="flex gap-2">
                Temperature: <Skeleton class="h-6 w-24 max-w-[100% - 2rem]" />
            </p>
            <p class="flex gap-2">
                Feels like: <Skeleton class="h-6 w-24 max-w-[100% - 2rem]" />
            </p>
        </body>

        <SkeletonForecastTable />
    {:else}
        <h1 class="text-5xl">{a_weather.name}</h1>
        <header class="flex items-center space-x-2">
            <img
                src={`http://openweathermap.org/img/wn/${a_weather.icon}.png`}
                alt={a_weather.description}
            />
            <h2 class="capitalize">{a_weather.description}</h2>
        </header>

        <body class="flex flex-col mb-8">
            <p>
                Temperature: <span class="font-thin">{a_weather.temp}°C</span>
            </p>
            <p>
                Feels like: <span class="font-thin"
                    >{a_weather.feels_like}°C</span
                >
            </p>
        </body>

        <ForecastTable data={forecast} />
    {/if}
</section>
