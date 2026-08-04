// auth.js
// Handles the auth modal: separate Sign In / Create Account entry points,
// account storage (prototype-only, see note below), the 2FA step-through,
// and updating the nav bar once a user is logged in.

document.addEventListener('DOMContentLoaded', () => {

  const modal = document.getElementById('auth-modal');
  const openBtns = document.querySelectorAll('[data-open-auth]');
  const closeBtn = document.querySelector('.modal-close');
  const steps = document.querySelectorAll('.auth-step');
  const createAccountForm = document.querySelector('[data-form="create-account"]');

  function showStep(stepName) {
    steps.forEach((step) => {
      step.hidden = step.dataset.step !== stepName;
    });
  }

  function openModal(mode) {
    if (!modal) return;
    modal.hidden = false;
    showStep(mode === 'signup' ? 'signup' : 'signin');
  }

  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
  }

  // --- Open modal, defaulting to the form matching which button was clicked ---
  openBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      openModal(btn.dataset.openAuth);
    });
  });

  // --- Close: X button ---
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // --- Close: click the dark backdrop (not the card itself) ---
  if (modal) {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });
  }

  // --- Close: Escape key ---
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal && !modal.hidden) {
      closeModal();
    }
  });

  // --- "New here? / Already have an account?" switch links ---
  document.querySelectorAll('[data-switch-auth]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      showStep(link.dataset.switchAuth);
    });
  });

  // --- Account storage ---
  // NOTE: localStorage is plain text, visible in DevTools, and not secure.
  // This is a front-end-only prototype demonstrating the UI/UX flow, not a
  // real authentication system - worth stating this explicitly in your
  // technical rationale as a known, deliberate scope limitation.
  function getStoredUsers() {
    return JSON.parse(localStorage.getItem('twitchDemoUsers') || '{}');
  }

  function saveUser(username, password) {
    const users = getStoredUsers();
    users[username] = password;
    localStorage.setItem('twitchDemoUsers', JSON.stringify(users));
  }

  function setLoggedInUser(username) {
    localStorage.setItem('twitchDemoCurrentUser', username);
    updateNavForLoggedInUser(username);
  }

  function updateNavForLoggedInUser(username) {
    const navRight = document.querySelector('.navbar-right');
    if (!navRight) return;

    const loginBtn = navRight.querySelector('[data-open-auth="signin"]');
    const signupBtn = navRight.querySelector('[data-open-auth="signup"]');
    if (loginBtn) loginBtn.hidden = true;
    if (signupBtn) signupBtn.hidden = true;

    const pfpWrapper = document.querySelector('.navbar-pfp');
    if (pfpWrapper) pfpWrapper.hidden = false;

    let usernameEl = document.querySelector('.nav-username');
    if (!usernameEl) {
      usernameEl = document.createElement('span');
      usernameEl.className = 'nav-username';
      navRight.insertBefore(usernameEl, navRight.firstChild);
    }
    usernameEl.textContent = username;
  }
  
  // --- Profile picture upload ---
const pfpInput = document.querySelector('.pfp-upload input');
const navPfp = document.querySelector('.nav-pfp');

if (pfpInput) {
  pfpInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      navPfp.src = e.target.result;
      localStorage.setItem('twitchDemoPfp', e.target.result);
    };
    reader.readAsDataURL(file);
  });
}

const savedPfp = localStorage.getItem('twitchDemoPfp');
if (savedPfp && navPfp) navPfp.src = savedPfp;

  // Restore logged-in state on every page load, so it persists between
  // index.html and stream.html rather than resetting on navigation.
  const currentUser = localStorage.getItem('twitchDemoCurrentUser');
  if (currentUser) {
    updateNavForLoggedInUser(currentUser);
  }

  // --- Sign In ---
  const signInForm = document.querySelector('[data-form="sign-in"]');
  if (signInForm) {
    signInForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const identifier = signInForm.querySelector('[name="identifier"]').value;
      const password = signInForm.querySelector('[name="password"]').value;
      const users = getStoredUsers();

      if (users[identifier] && users[identifier] === password) {
        setLoggedInUser(identifier);
        closeModal();
      } else {
        alert('No matching account found. Try creating an account instead.');
      }
    });
  }

  // --- Create Account ---
  if (createAccountForm) {
    createAccountForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const identifier = createAccountForm.querySelector('[name="identifier"]').value;
      const password = createAccountForm.querySelector('[name="password"]').value;
      const confirmPassword = createAccountForm.querySelector('[name="password-confirm"]').value;
      const passwordField = createAccountForm.querySelector('[name="password"]');
      const errorMsg = createAccountForm.querySelector('.field-error-message');

      if (password.length < 8) {
        passwordField.classList.add('field-error');
        if (errorMsg) errorMsg.textContent = 'Password must be at least 8 characters.';
        return;
      }

      if (password !== confirmPassword) {
        passwordField.classList.add('field-error');
        if (errorMsg) errorMsg.textContent = 'Passwords do not match.';
        return;
      }

      passwordField.classList.remove('field-error');
      if (errorMsg) errorMsg.textContent = '';

      saveUser(identifier, password);
      createAccountForm.dataset.pendingUsername = identifier; // remember until 2FA finishes
      showStep('2fa-setup');
    });
  }

  // --- 2FA step navigation ---
  document.querySelectorAll('[data-next]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = btn.dataset.next;

      if (next === 'complete') {
        const username = createAccountForm ? createAccountForm.dataset.pendingUsername : null;
        if (username) {
          setLoggedInUser(username);
        }
        closeModal();
        return;
      }

      showStep(next);
    });
  });

});