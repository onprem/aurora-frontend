export const emailValidation = email => {
  const regex = /^(?=[A-Za-z0-9][A-Za-z0-9@._%+-]{5,253}$)[A-Za-z0-9._%+-]{1,64}@(?:(?=[A-Za-z0-9-]{1,63}\.)[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*\.){1,8}[A-Za-z]{2,5}$/;
  const res = regex.test(email);
  return res;
};

export const ARValidation = ar => {
  const regex = /^[a][r]-[a-z]{3}-\d{3}$/i;
  const res = regex.test(ar);
  return res;
};

export const phoneValidation = phone => {
  const regex = /^[6-9]\d{9}$/;
  const res = regex.test(phone);
  return res;
};
