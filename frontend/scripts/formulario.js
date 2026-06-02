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
    if(validarRut(rut)){formularioValido = true}else{formularioValido=false}
    if(validarInput(correo)){formularioValido = true}else{formularioValido=false}
    if(validarEmail(correo)){formularioValido = true}else{formularioValido=false}    
    if(validarInput(celular)){formularioValido = true}else{formularioValido=false}
    if(validarInput(fechaNac)){formularioValido = true}else{formularioValido=false}
    if(validarInput(nacionalidad)){formularioValido = true}else{formularioValido=false}
    if(validarInput(contrasena)){formularioValido = true}else{formularioValido=false}
    if(validarContrasena(contrasena)){formularioValido = true}else{formularioValido=false}
    if(validarInput(repContrasena)){formularioValido = true}else{formularioValido=false}
    if(contrasena.value == repContrasena.value){formularioValido = true}else{formularioValido=false}
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

function validarContrasena(elemento){
    const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    if(regexContrasena.test(elemento.value)){
        elemento.classList.remove('alerta','is-invalid')
        elemento.classList.add('correcto','is-valid')
        return true;
    }else{
        elemento.classList.add('alerta','is-invalid')
        return false;
    }
}

function validarRut(elemento) {
    let rutCompleto = elemento.value
    rutCompleto = rutCompleto.replace(/\./g, '').replace('-', '');
    const cuerpo = rutCompleto.slice(0, -1);
    const dv = rutCompleto.slice(-1).toUpperCase();

    if (/^\d+$/.test(cuerpo)){
        elemento.classList.remove('alerta','is-invalid')
        elemento.classList.add('correcto','is-valid')
        return true;
    }else{
        elemento.classList.add('alerta','is-invalid')
        return false;
    }
    
    let suma = 0;
    let multiplo = 2;
    
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo.charAt(i)) * multiplo;
        multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }
    
    const dvEsperado = 11 - (suma % 11);
    
    if (dvEsperado === 11) {
        return dv === '0';
    } else if (dvEsperado === 10) {
        return dv === 'K';
    }

    if(dv === dvEsperado.toString()){
        elemento.classList.remove('alerta','is-invalid')
        elemento.classList.add('correcto','is-valid')
        return true;
    }else{
        elemento.classList.add('alerta','is-invalid')
        return false;
    }
}