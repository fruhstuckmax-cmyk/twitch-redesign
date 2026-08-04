//authenticator .js
// Login/ Signup modal; open/close Sign in <-> Create account toggle, 
//And the stepthrough flow for 2Fa setup

document.addEventListener('DOMContentLoaded', () => {
    const modal = document. getElementById('auth-modal');
    const openBtn = document.querySelector ('[data-open-auth]');
    const closeBtn = document.querySelector (".modal-close");

    //Open / Close Modal---
    if (openBtn && modal) {
        openBtn.addEventListener('click', () => {
            modal.hidden= false;
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
                modal.hidden = true;
        });
    }

    //Close Modal on overlay click but not when clicking card itself
    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.hidden = true;
            }
        });
    }

    // ---Sign In / Create Acccount Tab toggle --

    const authTabs = document.querySelectorAll ('.auth-tab');
    const signInForm = document.querySelector('[data-form="sign-in');
    const createAccountFormE1 = document.querySelector('[data-form="create-account]');

    authTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            authTabs.forEach((t) => t.classList.remove('active'));
            tab.classList.add('active');

            const showSignUp = tab.datset.authTab === 'signup';
            signInForm.hidden =showSignUp;
            createAccountFormE1.hidden = !showSignup;
        });
    });

    //Step Througyh Logic- Sign in/ Up -> 2Fa setup -> 2FA Code ---
    const steps = document.querySelectorAll('.auth-step');

    function  showStep(stepName) {
        steps.forEach((step) => {
            step.hidden = step.dataset.step !== stepName;
        });
    }

    document.querySelectorAll('[data-next]').forEach((btn) => {
        btn.addEventListener('click', () => {
            showStep(btn.dataset.next);
        });
    });

    //Basic Validation example for the create account fields
    const createAccountForm = document.querySelector('[data-form="create-account"]');
    if (createAccountForm) {
        createAccountForm.addEventListener('submit',(event) => {
            event.preventDefault();
            const password = createAccountForm.querySelector('[name="password"]');
            const errorMsg = createAccountForm.querySelector('.field-error-message');

            if (password && password.value.length <8) {
                password.classList.add('field-error');
                if (errorMsg) errorMsg.textContent = 'Password must be at least 8 character';
                return;
            }

            password.classList.remove('field-error');
            showStep('2fa-setup');
        });
    }
    
});