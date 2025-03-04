/* eslint-disable no-console */
async function backendFetch(path, options = {}) {
  function isJsonString(str) {
    try {
      JSON.parse(str);
    } catch {
      return false;
    }

    return true;
  }

  const { method, body, hasBearer = true } = options;
  let Authorization;

  if (hasBearer) {
    Authorization = `Bearer ${localStorage.getItem('token')}`;
  }

  const headers = { Authorization };

  if (body && isJsonString(body)) {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}${path}`, {
      headers,
      method,
      body,
    });

    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default backendFetch;
