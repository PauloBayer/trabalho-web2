document.addEventListener("DOMContentLoaded", function () {
  // Função para verificar se ambos os campos têm valor
  function updateButtonState() {
    console.log("teste");
    var inputUser = document.getElementById("username").value;
    var inputPassword = document.getElementById("user-password").value;
    var btnLogin = document.getElementById("btn-login");

    // Verifica se ambos os campos não estão vazios
    if (inputUser !== "" && inputPassword !== "") {
      btnLogin.classList.remove("locked");
    } else {
      btnLogin.classList.add("locked");
    }
  }

  // Adiciona escutadores de eventos para os campos de entrada
  document
    .getElementById("username")
    .addEventListener("input", updateButtonState);
  document
    .getElementById("user-password")
    .addEventListener("input", updateButtonState);
});
