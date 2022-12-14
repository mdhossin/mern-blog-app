export const validRegister = (user) => {
  const { name, email, password, cf_password } = user;

  const errors = [];

  if (!name?.trim()) {
    errors.push("Please add your name.");
  } else if (name.length > 20) {
    errors.push("Your name is up to 20 charactor long.");
  }

  if (!email?.trim()) {
    errors.push("Please add your email.");
  } else if (!validateEmail(email)) {
    errors.push("Email format is incorrect.");
  }

  const message = checkPassword(password, cf_password);
  if (message) errors.push(message);

  return {
    errMsg: errors,
    errLength: errors.length,
  };
};

function validateEmail(account) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(account).toLowerCase());
}

export const checkPassword = (password, cf_password) => {
  if (password.length < 6) {
    return "Password must be at least 6 chars.";
  } else if (password !== cf_password) {
    return "Confirm password did not match.";
  }
};

export const isEmpty = (value) => {
  if (!value) return true;
  return false;
};

export const isEmail = (account) => {
  // eslint-disable-next-line
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(account);
};

export const isLength = (password) => {
  if (password.length < 6) return true;
  return false;
};

export const isMatch = (password, cf_password) => {
  if (password === cf_password) return true;
  return false;
};

// Shallow equality
export const shallowEqual = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }

  return true;
};
