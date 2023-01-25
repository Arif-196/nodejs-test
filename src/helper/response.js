const success = (res, data, statusCode, message) =>
  res.send({ data, statusCode, message, success: true });
const failed = (res, err) =>
  res.send({ err, statusCode, message, success: false });

module.exports = { success, failed };
