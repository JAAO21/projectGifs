import { API } from "./settings";

const getApi = async ({ type, path, data, token }) => {
  const url = `${API}/${path}`;
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
  switch (type) {
    case "post":
      if (token) {
        return await fetch(url, {
          method: "POST",
          headers,
          body: JSON.stringify(data),
        }).then(async (res) => {
          const body = await res.json();
          return { ...body, httpStatus: res.status };
        });
      }
      return await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then(async (res) => {
        const body = await res.json();
        return { ...body, httpStatus: res.status };
      });

    case "get":
      return await fetch(url, {
        method: "GET",
        headers,
      }).then(async (res) => {
        const body = await res.json();
        return { ...body, httpStatus: res.status };
      });

    case "put":
      return await fetch(url, {
        method: "PUT",
        headers,
        body: JSON.stringify(data),
      }).then(async (res) => {
        const body = await res.json();
        return { ...body, httpStatus: res.status };
      });
    default:
      break;
  }
};
export default getApi;
