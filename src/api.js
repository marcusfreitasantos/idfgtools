// const URL = "http://localhost/idfgtools/admin/wp-json";
const URL = "https://app.idfg.com.br/materiais-backend/wp-json";
// const URL = "https://mafreitas.com.br/appmateriais/wp-json";

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
    url: URL + "/wp/v2/users?per_page=100",
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

export function USER_PUT(token, body) {
  return {
    url: URL + "/api/usuario/",
    options: {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    },
  };
}

export function EDIT_USERS(token, userid, body) {
  return {
    url: URL + "/wp/v2/users/" + userid,
    options: {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    },
  };
}

export function USER_DELETE(token, userid) {
  return {
    url: URL + "/wp/v2/users/" + userid + "?force=true&reassign=1",
    options: {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
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

export function IPAD_EDIT(token, ipadid, body) {
  return {
    url: URL + "/api/ipad/" + ipadid,
    options: {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    },
  };
}

export function IPADS_POST(token, body) {
  return {
    url: URL + "/api/ipad",
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

export function IPAD_DELETE(token, ipadid) {
  return {
    url: URL + "/api/ipad/" + ipadid + "?force=true",
    options: {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  };
}

export function UPLOAD_MEDIA(token, formdata) {
  return {
    url: URL + "/wp/v2/media",
    options: {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formdata,
    },
  };
}
