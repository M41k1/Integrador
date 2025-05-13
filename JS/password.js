const passwordInput = document.getElementById("register-password");
    const togglePassword = document.getElementById("toggle-password");

    const ruleLength = document.getElementById("rule-length");
    const ruleUppercase = document.getElementById("rule-uppercase");
    const ruleNumber = document.getElementById("rule-number");
    const ruleSpecial = document.getElementById("rule-special");

    passwordInput.addEventListener("input", () => {
      const password = passwordInput.value;

      ruleLength.textContent = (password.length >= 8 ? "🟢" : "🔴") + " Mínimo 8 caracteres";
      ruleUppercase.textContent = (/[A-Z]/.test(password) ? "🟢" : "🔴") + " Al menos una mayúscula";
      ruleNumber.textContent = (/\d/.test(password) ? "🟢" : "🔴") + " Al menos un número";
      ruleSpecial.textContent = (/[!@#$%^&*(),.?":{}|<>]/.test(password) ? "🟢" : "🔴") + " Al menos un carácter especial (!@#$...)";
    });

    togglePassword.addEventListener("click", () => {
      const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);
      togglePassword.textContent = type === "password" ? "👁️" : "🙈";
    });

    document.getElementById("register-form").addEventListener("submit", function (e) {
      const password = passwordInput.value;
      const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

      if (!regex.test(password)) {
        e.preventDefault();
        alert("La contraseña no cumple con los requisitos.");
      }
    });