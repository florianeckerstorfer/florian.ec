module.exports = {
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/mocks/FileMock.js',
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  setupFiles: ['<rootDir>/tests/setup.js'],
  collectCoverage: false,
  collectCoverageFrom: ['<rootDir>/src/**/*.js'],
};
