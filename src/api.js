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

export function USER_POST(body, token) {
  return {
    url: URL + "/api/usuario",
    options: {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    },
  };
}
