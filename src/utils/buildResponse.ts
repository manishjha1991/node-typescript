export function success(result) {
  return {
    status: {
      code: 200,
      message: "Success"
    },

    result
  };
}

export function failure(error) {
  return {
    status: {
      code: 500,
      message: error.message
    }
  };
}
