/* eslint-disable no-console */
async function backendFetch(path, options = {}) {
  const { method, body, hasBearer = true } = options;
  let Authorization;

  if (hasBearer) {
    Authorization = `Bearer ${localStorage.getItem('token')}`;
  }

  const headers = {
    Authorization,
    ...(body && { 'Content-Type': 'application/json' }),
  };

  const fetchOptions = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}${path}`,
      fetchOptions,
    );

    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default backendFetch;
