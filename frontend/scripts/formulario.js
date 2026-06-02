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
    
    if(validarInput(nombre)){formularioValido = true}else{formularioValido=false}
    if(validarInput(rut)){formularioValido = true}else{formularioValido=false}
    if(validarInput(correo)){formularioValido = true}else{formularioValido=false}
    if(validarEmail(correo)){formularioValido = true}else{formularioValido=false}    
    if(validarInput(celular)){formularioValido = true}else{formularioValido=false}
    if(validarInput(fechaNac)){formularioValido = true}else{formularioValido=false}
    if(validarInput(nacionalidad)){formularioValido = true}else{formularioValido=false}
    if(validarInput(contrasena)){formularioValido = true}else{formularioValido=false}
    if(validarInput(repContrasena)){formularioValido = true}else{formularioValido=false}
    if(validarInput(direccion)){formularioValido = true}else{formularioValido=false}
    if(validarInput(foto)){formularioValido = true}else{formularioValido=false}

    if(formularioValido == true){
        alert('Datos ingresados correctamente, enviando datos...')
    }
}

function validarInput(elemento){
    if(elemento.value == ''){
        elemento.classList.add('alerta','is-invalid')
        return false;
    }else{
        elemento.classList.remove('alerta','is-invalid')
        elemento.classList.add('correcto','is-valid')
        return true;
    }
}

function validarEmail(elemento){
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/
    if(regexEmail.test(elemento.value)){
        elemento.classList.remove('alerta','is-invalid')
        elemento.classList.add('correcto','is-valid')
        return true;
    }else{
        elemento.classList.add('alerta','is-invalid')
        return false;
    }
}