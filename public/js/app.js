// Definindo o ano atual no footer da aplicação

const year = document.querySelector("#current-year");
year.innerHTML = new Date().getFullYear();

// Script do form de email
const form = document.getElementById('email-form');
const nameInput = document.getElementById('name');
const nameError = document.getElementById('name-error');
const emailInput = document.getElementById('email');
const emailError = document.getElementById('email-error');
const messageInput = document.getElementById('message');
const messageError = document.getElementById('message-error');

function checkName() {
  const nameValue = nameInput.value.trim();
  if (nameValue.length < 3 || nameValue.length > 200) {
    formatMessage(true, nameInput, nameError, 'O Campo Nome é obrigatório e precisa ter entre 3 e 200 Caracteres');
    return false;
  }else{
    formatMessage(false, nameInput, nameError,'');
    return nameValue;
  }
}

function checkEmail() {
  const emailValue = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailValue || !emailRegex.test(emailValue)) {
    formatMessage(true, emailInput, emailError, 'O Campo Email é obrigatório e precisa ser válido');
    return false;
  }else{
    formatMessage(false, emailInput, emailError,'');
    return emailValue;
  }
}

function checkMessage() {
  const messageValue = messageInput.value.trim();
  if (!messageValue || messageValue.length > 1000) {
    formatMessage(true, messageInput, messageError, 'O Campo Mensagem é obrigatório e precisa ter no máximo 1000 Caracteres');
    return false;
  }else{
    formatMessage(false, messageInput, messageError,'');
    return messageValue;
  }
}

function formatMessage(isError, input, errorContainer, message) {
  if (isError) {
    input.classList.add('input-error');
    errorContainer.removeAttribute('hidden');
    errorContainer.innerHTML = message;
  }else{
    input.classList.remove('input-error');
    errorContainer.setAttribute('hidden' ,'');
    errorContainer.innerHTML = '';
  }
}

form.addEventListener('submit', async function(event) {

  event.preventDefault(); // prevent reload

  // Validate fields
  const nameValue = checkName();
  const emailValue = checkEmail();
  const messageValue = checkMessage();

  if(nameValue && emailValue && messageValue) {
    var formData = new FormData(this);
    formData.append('service_id', '');
    formData.append('template_id', '');
    formData.append('user_id', '');
  
    // Show loading icon
    const loadingMessage = document.querySelector('#contact-button-text');
    const loadingIcon = document.querySelector('.loading-icon');
    loadingMessage.setAttribute('disabled' ,'');
    loadingMessage.innerHTML = 'Enviando...';
    loadingIcon.removeAttribute('hidden');
      
    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send-form', {
        method: 'POST',
        body: formData
      });

      // Remove loading message
      loadingMessage.removeAttribute('disabled');
      loadingMessage.innerHTML = 'Enviar Mensagem';
      loadingIcon.setAttribute('hidden' ,'');

      if (response.ok) {
        showToast('Sua mensagem foi enviada com sucesso!', 'success');
        this.reset();
      } else {
        showToast('Eita! Ocorreu um erro no envio', 'error');
      }
    } catch (error) {
      console.log(error)
      loadingMessage.removeAttribute('disabled');
      loadingMessage.innerHTML = 'Enviar Mensagem';
      loadingIcon.setAttribute('hidden' ,'');
      showToast(`Oops: ${error}`, 'error');
    }
   
  }else{
    return;
  }
});

function showToast(message, model) {
  var toast = document.createElement("div");
  toast.classList.add("toast");
  model === "success" ? toast.style.background = "#53a540" : toast.style.background = "red";
  toast.innerText = message;

  document.body.appendChild(toast);

  setTimeout(function() {
    toast.remove();
  }, 4000);
}

nameInput.addEventListener('blur', () => checkName());
emailInput.addEventListener('blur', () => checkEmail());
messageInput.addEventListener('blur', () => checkMessage());