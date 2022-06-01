class UI{
    constructor(){
        this.conteiner = document.querySelector(".ciudades");
        this.ciudad
        
    }

    popular(data){
        if (data.cod == "404") {
            document.querySelector(".mensaje").innerHTML= "Por favor ingrese una ciudad valida"
            document.querySelector(".mensaje").style.filter = "opacity(1)"
        }
        else{
            document.querySelector(".mensaje").style.filter = "opacity(0)"
            this.conteiner.innerHTML+= 
            `<div class="city">
                <div class="country">
                    <h1>${data.name}</h1>
                    <sup>${data.sys.country}</sup>
                </div>
                <div class="temperatura">
                    <h2>${Math.floor(data.main.temp)}</h2>
                    <sup>°C</sup>
                </div>
                <div class="termica">
                    <h5>Sen. Termica</h5>
                    <div class="sensacion">
                        <h3>${Math.floor(data.main.feels_like)}</h3>
                        <sup>°C</sup>
                    </div>
                </div>
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
                <h3>${data.weather[0].description}</h3>
            </div>`;
        }
        }
        

}