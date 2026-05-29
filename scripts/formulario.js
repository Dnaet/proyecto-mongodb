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
    
    if(nombre.value == ''){
        nombre.classList.add('alerta','is-invalid')
    }else{
        nombre.classList.remove('alerta','is-invalid')
        nombre.classList.add('correcto','is-valid')
    }
}