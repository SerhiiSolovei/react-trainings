export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const validatePassword = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{6,}$/g;

export const lowerCaseLetters = /[a-z]/g;

export const upperCaseLetters = /[A-Z]/g;

export const numbers = /[0-9]/g;
