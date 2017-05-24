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
        reporters: ['progress', 'karma-typescript'],
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

    if (!WATCH) {
        CONFIGURATION.karmaTypescriptConfig.coverageOptions = {
            instrumentation: true,
            exclude: [
                /\.(d|spec|test|module)\.ts/,
                /\index.ts/,

            ]
        };
        CONFIGURATION.karmaTypescriptConfig.reports = {
            'text': '',
            'text-summary': '',
            'lcovonly': 'coverage'
        };
    }

    if (process.env.TRAVIS) {
        CONFIGURATION.browsers = ['Chrome_travis_ci'];
    }

    config.set(CONFIGURATION);
};