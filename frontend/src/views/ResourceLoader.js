export default {
  async getResource(path, method, data, headers) {
    try {
      method = !method ? "GET" : method;

      const options = {
        method: method,
        headers: {
          "Content-type": "application/json",
        },
      };
      if (data) {
        options.body = JSON.stringify(data);
      }

      if (headers) Object.assign(options.headers, headers);

      const response = await fetch(`http://127.0.0.1:8088/${path}`, options);
      if (response.status != 200) {
        const err = await response.json();
        throw new Error(err.message);
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  },
};
