const dto = (status, body, message) => {
  return {
    status: status,
    body: body,
    message: message,
  };
};

module.exports = { dto };
