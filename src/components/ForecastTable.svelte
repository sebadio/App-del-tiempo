<script>
    import * as Table from "$lib/components/ui/table";
    export let data = [];
</script>

<Table.Root class="text-center">
    <Table.Caption>Forecast for the next days</Table.Caption>
    <Table.Header>
        <Table.Row>
            <Table.Head class="text-center">Day</Table.Head>
            <Table.Head class="text-center">Weather</Table.Head>
            <Table.Head class="text-center">Temperature</Table.Head>
            <Table.Head class="text-center">Feels like</Table.Head>
            <Table.Head class="text-center">Pressure</Table.Head>
            <Table.Head class="text-center">Humidity</Table.Head>
        </Table.Row>
    </Table.Header>

    <Table.Body>
        {#each data as day}
            <Table.Row class="Row">
                <Table.Cell class="text-start"
                    >{day.dt_txt[0]} <br /> {day.dt_txt[1]}</Table.Cell
                >
                <Table.Cell class="capitalize flex items-center">
                    <img
                        src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                        alt={day.weather[0].description}
                        class="w-8 h-8 mr-2"
                    />
                    {day.weather[0].description}
                </Table.Cell>
                <Table.Cell class="text-center">{day.main.temp}°C</Table.Cell>
                <Table.Cell>{day.main.feels_like}°C</Table.Cell>
                <Table.Cell>{day.main.pressure}hPa</Table.Cell>
                <Table.Cell>{day.main.humidity}%</Table.Cell>
            </Table.Row>
        {/each}
    </Table.Body>
</Table.Root>
