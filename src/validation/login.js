const Validator = require('validator');
const isEmpty = require('./is-empty');

export default function validateLoginInput(data) {
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Неправильный адрес эл.почты';
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email не может быть пустым';
    }

    if(!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = 'Пароль должен содержать 6 символов';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Пароль не может быть пустым';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}