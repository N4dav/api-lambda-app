exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify("hello world"),
    headers: {
      "Content-Type": "application/json",
    }
  };
};
