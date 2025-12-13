// Minimal client-side login for prototype purposes only.
const SESSION_KEY = 'cvAdminSession';
const PASSWORD_KEY = 'cvAdminPassword';
const VALID_USER = { username: 'terry', password: '055912071' };

function isLoggedIn() {
  return localStorage.getItem(SESSION_KEY) === 'true';
}

function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value.trim();
  const expected = localStorage.getItem(PASSWORD_KEY) || VALID_USER.password;
  if (username === VALID_USER.username && password === expected) {
    localStorage.setItem(SESSION_KEY, 'true');
    window.location.href = './admin.html';
  } else {
    alert('帳號或密碼錯誤（Prototype 示範用，無後端驗證）。');
  }
}

function bootstrap() {
  // Initialize default password if none stored
  if (!localStorage.getItem(PASSWORD_KEY)) {
    localStorage.setItem(PASSWORD_KEY, VALID_USER.password);
  }
  if (isLoggedIn()) {
    window.location.href = './admin.html';
    return;
  }
  const form = document.getElementById('login-form');
  if (form) form.addEventListener('submit', handleLogin);
}

bootstrap();
