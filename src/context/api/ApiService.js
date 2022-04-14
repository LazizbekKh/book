class ApiService {
  _host = "http://128.199.140.84";
  _apiBase = this._host + "/api";
  _headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  updateForm = async (url, token, form) => {
    let headers = this._headers;
    if (token) {
      headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
    }
    return fetch(this._apiBase + url, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(form),
    }).then((res) => {
      return res.json();
    });
  };
  postData = async (url, token, form) => {
    let headers = this._headers;
    if (token) {
      headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
    }
    return fetch(this._apiBase + url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(form),
    })
      .then((res) => {
        return res.json();
      })
      .then((value) => {
        return value;
      });
  };
  getResources = async (url, token) => {
    let headers = this._headers;

    if (token) {
      headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
    }

    const res = await fetch(this._apiBase + url, { headers });

    return await res.json();
  };
  getBlob = async (url, token) => {
    let headers = this._headers;

    if (token) {
      headers = {
        Authorization: `Bearer ${token}`,
      };
    }

    const res = await fetch(this._apiBase + url, { headers });

    return await res.blob();
  };
}
export default ApiService;
