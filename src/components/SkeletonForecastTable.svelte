<script>
    import { Skeleton } from "$lib/components/ui/skeleton";
    import * as Table from "$lib/components/ui/table";
</script>

<Table.Root class="text-center">
    <Table.Caption>Forecast for the next days</Table.Caption>
    <Table.Header>
        <Table.Row class="text-center">
            <Table.Head class="text-center">Day</Table.Head>
            <Table.Head class="text-center">Weather</Table.Head>
            <Table.Head class="text-center">Temperature</Table.Head>
            <Table.Head class="text-center">Feels like</Table.Head>
            <Table.Head class="text-center">Pressure</Table.Head>
            <Table.Head class="text-center">Humidity</Table.Head>
        </Table.Row>
    </Table.Header>

    <Table.Body class="text-center">
        {#each { length: 15 } as _, i}
            <Table.Row class="Row">
                <Table.Cell class="text-start">
                    <div class="flex flex-col gap-2">
                        <Skeleton class="w-20 h-4" />
                        <Skeleton class="w-14 h-4" />
                    </div>
                </Table.Cell>
                <Table.Cell class="">
                    <div class="flex">
                        <Skeleton class="size-5 mr-4 rounded-full" />
                        <Skeleton class="w-24 h-4" />
                    </div>
                </Table.Cell>
                <Table.Cell class="text-center">
                    <Skeleton class="w-12 m-auto h-4" />
                </Table.Cell>
                <Table.Cell><Skeleton class="w-10 m-auto h-4" /></Table.Cell>
                <Table.Cell><Skeleton class="w-10 m-auto h-4" /></Table.Cell>
                <Table.Cell><Skeleton class="w-10 m-auto h-4" /></Table.Cell>
            </Table.Row>
        {/each}
    </Table.Body>
</Table.Root>
