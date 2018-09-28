module.exports = {
  transform: {
    '^.+\\.jsx?$': '<rootDir>/tests/preprocess.js',
  },
  testRegex: '/.*(__tests__\\/.*)|(.*(test|spec))\\.jsx?$',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/mocks/FileMock.js',
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  setupFiles: ['<rootDir>/tests/setup.js', '<rootDir>/tests/loadershim.js'],
  collectCoverage: false,
  collectCoverageFrom: ['<rootDir>/src/**/*.js'],
  testPathIgnorePatterns: ['node_modules', '.cache'],
  transformIgnorePatterns: ['node_modules/(?!(gatsby)/)'],
  globals: {
    __PATH_PREFIX__: '',
  },
  testURL: 'http://localhost',
};
