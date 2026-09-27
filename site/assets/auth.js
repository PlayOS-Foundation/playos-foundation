/* PlayOSUniverse auth stub — frontend only.
 *
 * What this does:
 *   - client-side validation (email format, password >= 10 chars on signup,
 *     confirm-password match)
 *   - inline field errors with aria-invalid / aria-describedby
 *   - password visibility toggles
 *   - social buttons and submit show the honest "accounts are not live yet"
 *     state
 *
 * What this deliberately does NOT do:
 *   - no network requests, no fetch/XHR
 *   - no storage (no cookies, no localStorage, no password caching)
 *   - no fake success state
 *
 * Backend-ready contract (Part XV / Part XVI): forms carry the OIDC client id
 * "playos-web" (authorization code + PKCE public client) and use the exact
 * field names `email` and `password`. Wiring the identity backbone later
 * is a URL change, not a form change.
 */
(function () {
  'use strict';

  var OIDC_CLIENT_ID = 'playos-web';
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var MIN_PASSWORD_LENGTH = 10;

  var STATUS_NOT_LIVE = 'PlayOSUniverse accounts are not live yet — this will connect to the identity backend when it ships.';
  var STATUS_SOCIAL_PREFIX = 'Sign in with ';
  var STATUS_SOCIAL_SUFFIX = ' is not live yet — it will redirect through the PlayOSUniverse identity provider when it ships.';

  function fieldError(input, message) {
    var field = input.closest('.field');
    var errorEl = field ? field.querySelector('.field-error') : null;
    input.classList.toggle('invalid', !!message);
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
    if (errorEl) {
      errorEl.textContent = message || '';
      if (message) {
        input.setAttribute('aria-describedby', errorEl.id);
      } else {
        input.removeAttribute('aria-describedby');
      }
    }
    return !message;
  }

  function showStatus(form, message, kind) {
    var el = form.querySelector('.auth-status');
    if (!el) { return; }
    el.textContent = message;
    el.className = 'auth-status auth-status-' + (kind || 'info');
    el.hidden = false;
  }

  function hideStatus(form) {
    var el = form.querySelector('.auth-status');
    if (el) { el.hidden = true; }
  }

  function validateEmail(form, emailInput) {
    var value = emailInput.value.trim();
    if (!value) {
      return fieldError(emailInput, 'Enter your email address.');
    }
    if (!EMAIL_RE.test(value)) {
      return fieldError(emailInput, 'Enter a valid email address, like you@example.com.');
    }
    return fieldError(emailInput, '');
  }

  function validatePassword(form, passwordInput, requireLength) {
    var value = passwordInput.value;
    if (!value) {
      return fieldError(passwordInput, 'Enter a password.');
    }
    if (requireLength && value.length < MIN_PASSWORD_LENGTH) {
      return fieldError(passwordInput, 'Use at least ' + MIN_PASSWORD_LENGTH + ' characters.');
    }
    return fieldError(passwordInput, '');
  }

  function validateSignup(form) {
    var email = form.querySelector('[name="email"]');
    var password = form.querySelector('[name="password"]');
    var confirm = form.querySelector('[name="password_confirm"]');
    var ok = validateEmail(form, email);
    ok = validatePassword(form, password, true) && ok;
    if (confirm) {
      if (!confirm.value) {
        ok = fieldError(confirm, 'Confirm your password.') && ok;
      } else if (confirm.value !== password.value) {
        ok = fieldError(confirm, 'Passwords do not match.') && ok;
      } else {
        ok = fieldError(confirm, '') && ok;
      }
    }
    return ok;
  }

  function validateSignin(form) {
    var email = form.querySelector('[name="email"]');
    var password = form.querySelector('[name="password"]');
    var ok = validateEmail(form, email);
    ok = validatePassword(form, password, false) && ok;
    return ok;
  }

  /* The single documented submit stub. The future backend wiring replaces the
     body of the valid branch with a redirect to the `playos-web` OIDC endpoints. */
  function submitAuth(form) {
    var mode = form.getAttribute('data-auth-form') || 'signin';
    var valid = (mode === 'signup') ? validateSignup(form) : validateSignin(form);

    if (!valid) { return false; }

    showStatus(form, STATUS_NOT_LIVE, 'info');
    return false;
  }

  window.submitAuth = submitAuth;

  /* Forms: novalidate so our inline errors show; submit goes through the stub. */
  Array.prototype.forEach.call(document.querySelectorAll('form[data-auth-form]'), function (form) {
    form.setAttribute('novalidate', 'novalidate');
    form.setAttribute('data-oidc-client', OIDC_CLIENT_ID);
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      submitAuth(form);
    });

    /* Clear a field's error as soon as the visitor edits it. */
    Array.prototype.forEach.call(form.querySelectorAll('input'), function (input) {
      input.addEventListener('input', function () {
        fieldError(input, '');
        hideStatus(form);
      });
    });
  });

  /* Social buttons: same honest not-live state, no redirect. */
  Array.prototype.forEach.call(document.querySelectorAll('button[data-social]'), function (btn) {
    btn.addEventListener('click', function () {
      var provider = btn.getAttribute('data-social');
      var form = document.querySelector('form[data-auth-form]');
      if (form) {
        showStatus(form, STATUS_SOCIAL_PREFIX + provider + STATUS_SOCIAL_SUFFIX, 'info');
      }
    });
  });

  /* Password visibility toggles. */
  Array.prototype.forEach.call(document.querySelectorAll('.toggle-password'), function (btn) {
    btn.addEventListener('click', function () {
      var targetId = btn.getAttribute('aria-controls');
      var input = document.getElementById(targetId);
      if (!input) { return; }
      var show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      btn.setAttribute('aria-pressed', show ? 'true' : 'false');
      btn.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
    });
  });
})();
