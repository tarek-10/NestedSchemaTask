const role = require("../../enum/role");
const adminPolicy = require("./adminPolicy");
const userPolicy = require("./userPolicy");

const opts = {
  [role.ADMIN]: {
    can: adminPolicy,
  },
  [role.USER]: {
    can: userPolicy,
  },
};
module.exports = opts;
