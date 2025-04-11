const toggleLink = document.getElementById("toggle-link");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const formTitle = document.getElementById("form-title");

toggleLink.addEventListener("click", (e) => {
  e.preventDefault();

  // Quiero evitar hacer un montón de branching por usar el short-hand if else (a ? b : c)
  // así que separé todo con una sola evaluación, no debería cambiar nada - Sebastián
  if (loginForm.style.display !== "none") {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
    formTitle.textContent =  "Crear Cuenta";
    toggleLink.textContent = "¿Ya tienes cuenta? Inicia sesión";
  }
  else {
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    formTitle.textContent ="Iniciar Sesión";
    toggleLink.textContent = "¿No tienes cuenta? Crear una";
  }
});
