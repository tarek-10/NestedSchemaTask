const { CREATE_COMMENT } = require("../../module/comment/endPoints");
const { CREATE_POST, UPDATE_POST } = require("../../module/post/endPoints");
const { CREATE_REPLAY } = require("../../module/replay/endPoints");
const { GET_ALL_USERS } = require("../../module/user/endPoints");

module.exports = [GET_ALL_USERS, CREATE_POST, UPDATE_POST, CREATE_COMMENT ,CREATE_REPLAY];
