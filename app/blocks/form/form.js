/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
/* eslint-disable no-control-regex */
import $ from 'jquery';
import 'parsleyjs';

const Parsley = window.Parsley;

Parsley.addMessages('en', {
  defaultMessage: 'This value seems to be invalid.',
  type: {
    email: 'Please enter valid E-mail adress',
    url: 'Please enter valid url.',
    number: 'This value should be a valid number.',
    integer: 'This value should be a valid integer.',
    digits: 'This value should be digits.',
    alphanum: 'This value should be alphanumeric.',
  },
  notblank: 'This value should not be blank.',
  required: 'This value is required.',
  pattern: 'This value seems to be invalid.',
  min: 'This value should be greater than or equal to %s.',
  max: 'This value should be lower than or equal to %s.',
  range: 'This value should be between %s and %s.',
  minlength: 'This value is too short. It should have %s characters or more.',
  maxlength: 'This value is too long. It should have %s characters or fewer.',
  length: 'This value length is invalid. It should be between %s and %s characters long.',
  mincheck: 'You must select at least %s choices.',
  maxcheck: 'You must select %s choices or fewer.',
  check: 'You must select between %s and %s choices.',
  equalto: 'Values should be the same.',
});

Parsley.setLocale('en');

Parsley.addValidator(
    'mailphone',
    (value, refOrValue) => {
      const expForMail = /^((([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))$/;
      const expForPhone = /^\+[0-9]?[0-9](\s|\S)\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      if (!value) {
        return true; // Builtin validators all accept empty strings, except `required` of course
      }
      let result;
      if (value.indexOf('@') > 0) {
        result = expForMail.test(value);
      } else {
        result = expForPhone.test(value);
      }
      return result;
    }, 256)
  .addMessage('en', 'mailphone', 'Enter the correct email or phone in the format +x xxx xxx xxxx');

$('[data-validated-form]').parsley({
  trigger: 'submit',
  errorClass: 'is-error',
  successClass: 'is-valid',
  excluded: 'input[type=button], input[type=submit], input[type=reset], input[type=hidden], [disabled]',
  classHandler(el) {
    return $(el.element).closest('.inputbox');
  },
  errorsContainer(el) {
    return $(el.element).closest('.inputbox').find('.inputbox__error');
  },
});
/* eslint-enable no-control-regex */
/* eslint-enable no-useless-escape */
/* eslint-enable no-unused-vars */
