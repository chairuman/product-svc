const safelyStringifyJSON = (data) => {
  try {
    const stringifield = JSON.stringify(data);
    return stringifield;
  } catch (error) {
    return data;
  }
};

module.exports = { safelyStringifyJSON };
