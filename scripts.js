const filters = {
    brightness:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    contrast:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    exposure:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    saturation:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    hueRotation:{
        value:0,
        min:0,
        max:360,
        unit:"deg"
    },
    blur:{
        value:0,
        min:0,
        max:20,
        unit:"px"
    },
    opacity:{
        value:100,
        min:0,
        max:100,
        unit:"%"
    },
    grayscale:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    sepia:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    invert:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    }
}


function createFilterElement(name, unit= "%" , value, min , max){
    const div =document.createElement("div")
    div.classList.add("filter")


    const input = document.createElement("input")
    input.type="range"
    input.min= min
    input.max= max
    input.id = name
    
    const p = document.createElement("p")
    p.innerText = name

    p.appendChild(p)
    p.appendChild(input)

    return div
}

Object.keys(filters).forEach(filter =>{

    console.log(filters[filter])
})