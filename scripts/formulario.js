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
    let correo = document.getElementById('inputEmail')
    let celular = document.getElementById('inputCelular')
    let fechaNac = document.getElementById('inputNacimiento')
    let nacionalidad = document.getElementById('selectNacionalidad')
    let contrasena = document.getElementById('inputContrasena')
    let repContrasena = document.getElementById('inputRepetirContrasena')
    let direccion = document.getElementById('inputDireccion')
    let foto = document.getElementById('inputFoto')
    let genero = document.querySelector('input[name="radioGenero"]:checked')
    let formularioValido = true
    
    if(validarIpnut(nombre)){formularioValido = true}else{formularioValido=false}
    if(validarIpnut(rut)){formularioValido = true}else{formularioValido=false}
    if(validarIpnut(correo)){formularioValido = true}else{formularioValido=false}
    if(validarIpnut(celular)){formularioValido = true}else{formularioValido=false}
    if(validarIpnut(fechaNac)){formularioValido = true}else{formularioValido=false}
    if(validarIpnut(nacionalidad)){formularioValido = true}else{formularioValido=false}
    if(validarIpnut(contrasena)){formularioValido = true}else{formularioValido=false}
    if(validarIpnut(repContrasena)){formularioValido = true}else{formularioValido=false}
    if(validarIpnut(direccion)){formularioValido = true}else{formularioValido=false}
    if(validarIpnut(foto)){formularioValido = true}else{formularioValido=false}

    if(formularioValido){
        alert('Datos ingresados correctamente, enviando datos...')
    }
}

function validarIpnut(elemento){
    if(elemento.value == ''){
        elemento.classList.add('alerta','is-invalid')
        return false;
    }else{
        elemento.classList.remove('alerta','is-invalid')
        elemento.classList.add('correcto','is-valid')
        return true;
    }
}