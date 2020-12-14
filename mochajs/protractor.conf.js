require('ts-node').register();

module.exports.config = {
    framework: 'mocha',

    specs: ['spec.ts'],
    directConnect: true,
    baseUrl: 'https://movies-finder.firebaseapp.com/',
    SELENIUM_PROMISE_MANAGER: false,
    
    mochaOpts: {
        //npm run test-mocha
        timeout: 60000
    }
} 