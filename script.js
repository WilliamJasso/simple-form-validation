const form = document.getElementById("form");
const nombre = document.getElementById("nombre");
const edad = document.getElementById("edad");
const email = document.getElementById("email");
const password = document.getElementById("contraseña");
const password2 = document.getElementById("contraseña2");
const telefono = document.getElementById("numero telefonico");

// Verificar si la entrada está vacía después de eliminar los espacios en blanco
function checkEmpty(input) {
  if (input.value.trim() === "") {
    showError(input, `Por favor, ingresa tu ${getFieldName(input)}`);
  } else {
    showSuccess(input);
  }
}

// Mostrar un mensaje de error
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// Mostrar un mensaje de correcto
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

//Validar que el numero de telefono tenga 10 digitos y no contenga letras
function checkPhoneNumber(input) {
  // Eliminar todos los caracteres que no son números
  const phoneNumber = input.value.replace(/\D/g, ""); 
  if (isNaN(phoneNumber) || phoneNumber.length !== 10) {
    showError(input, `Tu ${getFieldName(input)} debe tener 10 dígitos`);
  } else {
    showSuccess(input);
  }
}

// Validar si el email es valido
function checkEmail(input) {
  const re =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Tu email no es valido");
  }
}

// Validar la longitud del nombre y que solo contenga letras
function checkLength(input, min, max) {
  const nameRegex = /^[a-zA-Z\s]+$/;
  if (input.value.length < min) {
    showError(
      input,
      `Tu ${getFieldName(input)} debe ser de al menos ${min} caracteres`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `Tu ${getFieldName(input)} debe ser menor a  ${max} caracteres`
    );
  } else if (!nameRegex.test(input.value)) {
    // Verificar si contiene solo letras y espacios
    showError(input, `Tu ${getFieldName(input)} solo puede contener letras y espacios`);
  } else {
    showSuccess(input);
  }
}


// Validar la longitud de la contraseña, letras y simbolos, y que coincidan
function checkPassword(input1, input2, min, max) {
  const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/;
  if (input1.value.length < min) {
    showError(
      input1,
      `Tu ${getFieldName(input1)} debe tener al menos ${min} caracteres`
    );
  } else if (input1.value.length > max) {
    showError(
      input1,
      `Tu ${getFieldName(input1)} debe tener menos de ${max} caracteres`
    );
  } else if (!passwordRegex.test(input1.value)) {
    showError(
      input1,
      `Tu ${getFieldName(input1)} solo puede contener letras, números y símbolos`
    );
  } else {
    showSuccess(input1);
  }

  if (input2.value.length < min) {
    showError(
      input2,
      `Tu ${getFieldName(input2)} debe tener al menos ${min} caracteres`
    );
  } else if (input2.value.length > max) {
    showError(
      input2,
      `Tu ${getFieldName(input2)} debe tener menos de ${max} caracteres`
    );
  } else if (!passwordRegex.test(input2.value)) {
    showError(
      input2,
      `Tu ${getFieldName(input2)} solo puede contener letras, números y símbolos`
    );
  } else if (input1.value !== input2.value) {
    showError(input2, "Las contraseñas son diferentes");
  } else {
    showSuccess(input2);
  }
}


// Validar la edad que solo esté en el rango de 18 y 60 años
function checkAge(input) {
  const age = input.value.trim(); // Obtener la entrada y eliminar los espacios en blanco
  if (isNaN(age) || age < 18 || age > 60) {
    showError(input, `Tu edad debe estar entre 18 y 60 años`);
  } else {
    showSuccess(input);
  }
}


// Obtener el nombre del campo
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Oyentes de eventos


form.addEventListener("submit", function (event) {
  event.preventDefault();
  checkAge(edad);
  checkPhoneNumber(telefono);
  checkEmail(email);
  checkLength(nombre, 5, 50);
  checkPassword(password, password2, 8, 20)
});
