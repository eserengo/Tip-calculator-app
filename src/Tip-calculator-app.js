(function () {
  const inputBill = document.getElementById('bill');
  const inputPeople = document.getElementById('people');
  const inputCustom = document.getElementById('custom');
  const billRegEx = /^\d+(\.|\,)\d{2}$/;
  const numberRegEx = /^[0-9]{1,2}$/;

  function validateInput(regEx, length) {
    if (this.value <= 0) {
      this.parentElement.parentElement.querySelectorAll('.error, .success').forEach(item => { item.remove() });
      this.parentElement.insertAdjacentHTML('afterend', `<div class='message error'><i class='fa fa-exclamation-triangle error'></i> ${this.name} cannot be empty</div>`);
      this.classList.contains('valid') ? (this.classList.remove('valid'), this.classList.add('invalid')) : this.classList.add('invalid');
    } else if (this.value.length > length) {
      this.parentElement.parentElement.querySelectorAll('.error, .success').forEach(item => { item.remove() });
      this.parentElement.insertAdjacentHTML('afterend', `<div class='message error'><i class='fa fa-exclamation-triangle error'></i> ${this.name} must contain at most ${length} digits</div>`);
      this.classList.contains('valid') ? (this.classList.remove('valid'), this.classList.add('invalid')) : this.classList.add('invalid');
    } else if (!this.value.match(regEx)) {
      this.parentElement.parentElement.querySelectorAll('.error, .success').forEach(item => { item.remove() });
      this.parentElement.insertAdjacentHTML('afterend', `<div class='message error'><i class='fa fa-exclamation-triangle error'></i> you must enter a valid ${this.name} value</div>`);
      this.classList.contains('valid') ? (this.classList.remove('valid'), this.classList.add('invalid')) : this.classList.add('invalid');
    } else {
      this.parentElement.parentElement.querySelectorAll('.error, .success').forEach(item => { item.remove() });
      this.parentElement.insertAdjacentHTML('afterend', `<div class='message success'><i class='fa fa-check-circle success'></i> Correct</div>`);
      this.classList.contains('invalid') ? (this.classList.remove('invalid'), this.classList.add('valid')) : this.classList.add('valid');
    }
  }

  function resetForm() {
    document.querySelector('.form').reset();
    document.querySelectorAll('.error, .success').forEach(item => { item.remove() });
    document.querySelectorAll('.valid').forEach(item => { item.classList.remove('valid') });
    document.querySelectorAll('.invalid').forEach(item => { item.classList.remove('invalid')});
  }

  function displayResult() {
    if (inputBill.classList.contains('invalid') || inputPeople.classList.contains('invalid')) {
      return null;
    } else {
      const tip = ((inputBill.value / inputPeople.value) * this.value / 100);
      document.getElementById('tip').textContent = tip.toFixed(2);
      document.getElementById('total').textContent = ((inputBill.value / inputPeople.value) + Number(tip)).toFixed(2);
    }
  }

  function displayCustom() {
    (function validate() {
      if (inputCustom.value <= 0) {
        inputCustom.parentElement.parentElement.querySelectorAll('.error, .success').forEach(item => { item.remove() });
        inputCustom.parentElement.insertAdjacentHTML('afterend', `<div class='message error'><i class='fa fa-exclamation-triangle error'></i> ${inputCustom.name} cannot be empty</div>`);
        inputCustom.classList.contains('valid') ? (inputCustom.classList.remove('valid'), inputCustom.classList.add('invalid')) : inputCustom.classList.add('invalid');
      } else if (inputCustom.value.length > 2) {
        inputCustom.parentElement.parentElement.querySelectorAll('.error, .success').forEach(item => { item.remove() });
        inputCustom.parentElement.insertAdjacentHTML('afterend', `<div class='message error'><i class='fa fa-exclamation-triangle error'></i> ${inputCustom.name} must contain at most 2 digits</div>`);
        inputCustom.classList.contains('valid') ? (inputCustom.classList.remove('valid'), inputCustom.classList.add('invalid')) : inputCustom.classList.add('invalid');
      } else {
        inputCustom.parentElement.parentElement.querySelectorAll('.error, .success').forEach(item => { item.remove() });
        inputCustom.parentElement.insertAdjacentHTML('afterend', `<div class='message success'><i class='fa fa-check-circle success'></i> Correct</div>`);
        inputCustom.classList.contains('invalid') ? (inputCustom.classList.remove('invalid'), inputCustom.classList.add('valid')) : inputCustom.classList.add('valid');
      }
    })();
      (function result() {
      if (inputBill.classList.contains('invalid')) {
        return null;
      } else if (inputPeople.classList.contains('invalid')) {
        return null;
      } else if (inputCustom.classList.contains('invalid')) {
        return null;
      } else {
        const tip = ((inputBill.value / inputPeople.value) * inputCustom.value / 100);
        document.getElementById('tip').textContent = tip.toFixed(2);
        document.getElementById('total').textContent = ((inputBill.value / inputPeople.value) + Number(tip)).toFixed(2);
      }
    })();
  }

  inputBill.addEventListener('change', validateInput.bind(inputBill ,billRegEx, 12));
  inputPeople.addEventListener('change', validateInput.bind(inputPeople, numberRegEx, 2));
  inputCustom.addEventListener('change', displayCustom);
  document.getElementById('btn-reset').addEventListener('click', resetForm);
  document.getElementById('btn-5').addEventListener('click', displayResult.bind(document.getElementById('btn-5')));
  document.getElementById('btn-10').addEventListener('click', displayResult.bind(document.getElementById('btn-10')));
  document.getElementById('btn-15').addEventListener('click', displayResult.bind(document.getElementById('btn-15')));
  document.getElementById('btn-25').addEventListener('click', displayResult.bind(document.getElementById('btn-25')));
})();