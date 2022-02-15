const URL = "http://localhost/idfgtools/admin/wp-json";
//const URL = "https://dogsapi.origamid.dev/json";

export function TOKEN_POST(body) {
  return {
    url: URL + "/jwt-auth/v1/token",
    options: {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function USER_GET(token) {
  return {
    url: URL + "/api/usuario",
    options: {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  };
}

export function GET_USERS(token) {
  return {
    url: URL + "/wp/v2/users",
    options: {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  };
}

export function TOKEN_VALIDATE_POST(token) {
  return {
    url: URL + "/jwt-auth/v1/token/validate",
    options: {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  };
}

export function USER_POST(body) {
  return {
    url: URL + "/api/usuario",
    options: {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function PASSWORD_LOST(body) {
  return {
    url: URL + "/bdpwr/v1/reset-password",
    options: {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function PASSWORD_RESET(body) {
  return {
    url: URL + "/bdpwr/v1/set-password",
    options: {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function IPADS_GET(token) {
  return {
    url: URL + "/api/ipads",
    options: {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  };
}
