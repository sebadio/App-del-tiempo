class Fetch{
    async getCurrent(input){
        const key = "9bc19e404c11b8ea4f09b8055e3f3cf1"

        const respuesta = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${input}&lang=sp&appid=${key}&units=metric`
        )

        const data = await respuesta.json()
        return data
    }
}