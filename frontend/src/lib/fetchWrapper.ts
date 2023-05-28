const get = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

const post = async (url: string, body: Object) => {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};

export { get, post };
