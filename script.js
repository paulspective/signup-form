const passwordInput = document.getElementById('password');
const toggleBtn = document.getElementById('togglePassword');
const wrapper = document.getElementById('passwordWrapper');
const strengthBar = document.getElementById('strengthBar');
const strengthLabel = document.getElementById('strengthLabel');

const segments = [
  document.getElementById('seg1'),
  document.getElementById('seg2'),
  document.getElementById('seg3')
];

strengthLabel.style.display = 'none';

passwordInput.addEventListener('focus', () => {
  strengthBar.style.display = 'flex';
  strengthBar.style.opacity = '1';
  strengthBar.style.transform = 'translateY(0)';
  strengthLabel.style.display = 'block';
  toggleBtn.style.display = 'inline';
});

passwordInput.addEventListener('blur', () => {
  if (!passwordInput.value.trim()) {
    strengthBar.style.opacity = '0';
    strengthBar.style.transform = 'translateY(5px)';
    setTimeout(() => {
      strengthBar.style.display = 'none';
      strengthLabel.textContent = '';
      strengthLabel.style.display = 'none';
    }, 300);
  }
});

passwordInput.addEventListener('input', () => {
  const val = passwordInput.value.trim();
  const hasLetter = /[a-zA-Z]/.test(val);
  const hasNumber = /[0-9]/.test(val);
  const hasSymbol = /[^a-zA-Z0-9]/.test(val);
  const isProperLength = val.length >= 8 && val.length <= 12;

  segments.forEach(seg => seg.style.backgroundColor = '#e0e0e0');
  strengthLabel.textContent = '';

  if (!val) {
    strengthLabel.style.display = 'none';
    return;
  }

  strengthLabel.style.display = 'block';

  if (hasLetter && !hasNumber && !hasSymbol && !isProperLength) {
    segments[0].style.backgroundColor = '#e74c2c';
    strengthLabel.textContent = 'Weak, toss in a number';
    strengthLabel.style.color = '#e74c3c';
  } else if (hasLetter && hasNumber && !hasSymbol && !isProperLength) {
    segments[0].style.backgroundColor = '#f39c12';
    segments[1].style.backgroundColor = '#f39c12';
    strengthLabel.textContent = 'Decent, now add a symbol';
    strengthLabel.style.color = '#f39c12';
  } else if (hasLetter && hasNumber && hasSymbol && isProperLength) {
    segments.forEach(seg => seg.style.backgroundColor = '#00a000');
    strengthLabel.textContent = 'Solid, nice job!';
    strengthLabel.style.color = '#00a000';
  } else {
    segments[0].style.backgroundColor = '#e74c2c';
    strengthLabel.textContent = 'Weak, password must be 8+ characters';
    strengthLabel.style.color = '#e74c2c';
  }
});

wrapper.addEventListener('focusout', () => {
  setTimeout(() => {
    if (!wrapper.contains(document.activeElement)) {
      toggleBtn.style.display = 'none';
    }
  }, 100);
});

toggleBtn.addEventListener('mousedown', e => {
  e.preventDefault();
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';
  toggleBtn.textContent = isPassword ? 'Hide' : 'Show';
});