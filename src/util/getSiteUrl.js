const getSiteUrl = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return 'https://florian.ec';
    case 'staging':
      return 'https://staging.florian.ec';
    default:
      return 'http://localhost:8040';
  }
};

export default getSiteUrl;
