export default {
  queryStringToJSON: (str) => {
    const query = str.replace('?', '');
    const pairs = query.split('&');
    const result = {};
    pairs.forEach((pair) => {
      const pairParts = pair.split('=');
      const name = pairParts[0];
      const value = pairParts[1];
      if (name.length) {
        if (result[name] !== undefined) {
          if (!result[name].push) {
            result[name] = [result[name]];
          }
          result[name].push(value || '');
        } else {
          result[name] = value || '';
        }
      }
    });
    return (result);
  },
};
