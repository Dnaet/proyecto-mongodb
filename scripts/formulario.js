alert('Cargando scripts externos...')

console.log('Cargando scripts externos...')
console.log(document)

window.onload = function(){
    let nombre = document.getElementById('inputNombre')
    console.log(nombre.value)
}

function validarFormulario(){
    let nombre = document.getElementById('inputNombre')
    let rut = document.getElementById('inputRut')
    
    alert(nombre.value + '\n' + rut.value)
}