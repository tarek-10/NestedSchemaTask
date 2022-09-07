const RBAC = require("easy-rbac");
const opts = require("./policy");
const rbac = new RBAC(opts);

module.exports = rbac;
