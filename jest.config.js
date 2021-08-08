module.exports = {
    collectCoverage: false,
    setupFilesAfterEnv: ['<rootDir>/enzyme.js'],
    testPathIgnorePatterns: ['/node_modules/', '/src/pages/', 'node_modules/(?!(antd)/)'],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    },
    transformIgnorePatterns: [
      '/node_modules/',
      '^.+\\.module\\.(css|sass|scss)$',
    ],
    moduleNameMapper: {
        '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
         '\\.(css|less|sass|scss)$': '<rootDir>/src/App.css',
         '^pages(.*)$': '<rootDir>/src/pages/$1'
        // '\\.(gif|ttf|eot|svg)$': '<rootDir>/__mocks__/fileMock.js',
      },
    //   resolver: {
    //       "undefined"
    //   },
      
    
  };
  