let formData = { email: '', message: '' };

const loginForm = document.querySelector('.feedback-form');
const localStorageKey = 'feedback-form-state';
const savedData = localStorage.getItem(localStorageKey);
if (savedData) {
  formData = JSON.parse(savedData);
  loginForm.elements.email.value = formData.email ?? '';
  loginForm.elements.message.value = formData.message ?? '';
}

loginForm.addEventListener('input', evt => {
  formData[evt.target.name] = evt.target.value.trim();
  localStorage.setItem(localStorageKey, JSON.stringify(formData));
});

loginForm.addEventListener('submit', event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(localStorageKey);
  formData = { email: '', message: '' };
  loginForm.reset();
});
