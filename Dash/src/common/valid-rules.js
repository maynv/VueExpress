const validate = {
  validLength(value, [min]) {
    if (value.length < min) {
      return false;
    }
    return true;
  }
};

export const VALID_RULES = [
  {
    id: "validLength",
    msg: "custom_invalid_length",
    validate: validate.validLength
  }
];
