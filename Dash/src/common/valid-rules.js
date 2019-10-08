const validate = {
  validLength(value, [min]) {
    if (value.length < min) {
      return false;
    }
    return true;
  },
  isTruth(value, [opp]) {
    return value && opp;
  },
  sameOldPassword(value, [oldPw, isRevert]) {
    let valid = true;
    if (value === oldPw) {
      valid = false
    }
    if (isRevert) {
      valid = !valid;
    }
    return valid
  }
};

export const VALID_RULES = [
  {
    id: "validLength",
    msg: "custom_invalid_length",
    validate: validate.validLength
  },
  {
    id: "checkSameNewPassword",
    msg: "",
    validate: validate.sameOldPassword
  },
  {
    id: "isTruth",
    msg: "",
    validate: validate.isTruth
  }
];
