
const fetchJS = new Fetch()
const uiJS = new UI()

const searchbar = document.querySelector("#cuadroDeBusqueda")
const submitButton = document.querySelector("button")
const form = document.querySelector("form")

window.onload = ()=>{
    fetchJS.getCurrent("Montevideo").then((data)=>{
        uiJS.popular(data)
    })
}

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const valorActual = searchbar.value

    fetchJS.getCurrent(valorActual).then((data)=>{
        uiJS.popular(data)
    })
})