const ENV = process.env.npm_lifecycle_event;
const WATCH = ENV === 'test:watch';

module.exports = function (config) {
    const CONFIGURATION = {
        frameworks: ['jasmine', 'karma-typescript'],
        files: [{
            pattern: 'base.spec.ts'
        },
            {
                pattern: 'src/**/*.+(ts|html)'
            }
        ],
        preprocessors: {
            '**/*.ts': ['karma-typescript']
        },
        coverageReporter: {
          dir: 'coverage',
          subdir: '.',
          type: 'lcovonly'
          // Would output the results into: .'/coverage/'
        },
        karmaTypescriptConfig: {
            bundlerOptions: {
                entrypoints: /\.spec\.ts$/,
                transforms: [
                    require('karma-typescript-angular2-transform')
                ]
            },
            compilerOptions: {
                lib: ['ES2015', 'DOM']
            },
            exclude: [
                "demo"
            ]
        },
        reporters: ['progress', 'coverage'],
        browsers: ['PhantomJS_custom'],
        colors: true,
        logLevel: config.LOG_INFO,
        singleRun: !WATCH,
        autoWatch: WATCH,
        client: {
            captureConsole: true
        },
        customLaunchers: {
            'PhantomJS_custom': {
                base: 'PhantomJS',
                options: {
                    windowName: 'my-window',
                    settings: {
                        webSecurityEnabled: false
                    }
                },
                flags: ['--load-images=false'],
                debug: true
            }
        },
        phantomjsLauncher: {
            // have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
            exitOnResourceError: false
        }
    };

    config.set(CONFIGURATION);
};