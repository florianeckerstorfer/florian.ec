module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /*
            SCULPIN
         */
        'sculpin-generate': {
            options: { bin: './vendor/bin/sculpin' },
            dev: { args: { env: 'dev' } },
            prod: { args: { env: 'prod' } }
        },

        /*
            STYLESHEETS
         */
        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    sourcemap: true
                },
                files: {
                    'public_dev/css/master.css': 'source/_sass/master.scss'
                }
            },
            prod: {
                options: {
                    style: 'compressed',
                    sourcemap: false
                },
                files: {
                    'public_prod/css/master.css': 'source/_sass/master.scss'
                }
            }
        },

        /*
            JAVASCRIPT
         */
        uglify: {
            prod: {
                files: {
                    'public_prod/js/main.min.js': [
                        'components/instantclick/instantclick.js',
                        'components/highlightjs/highlight.pack.js',
                        'components/picturefill/dist/picturefill.js'
                    ]
                }
            },
            dev: {
                files: {
                    'public_dev/js/main.min.js': [
                        'components/instantclick/instantclick.js',
                        'components/highlightjs/highlight.pack.js',
                        'components/picturefill/dist/picturefill.js'
                    ]
                }
            }
        },

        cssmin: {
            dev: {
                files: {
                    'public_dev/css/master.css': ['public_dev/css/master.css']
                }
            },
            prod: {
                files: {
                    'public_prod/css/master.css': ['public_prod/css/master.css']
                }
            },
        },

        /*
            REMOVE CODE FROM PRODUCTION SITE
         */
        devcode: {
            options: {
                html: true,
                js: false,
                css: false,
                clean: true,
                dest: 'prod',
                block: {
                    open: 'devcode',
                    close: 'endcode'
                },
            },
            prod: {
                options: {
                    source: 'public_prod/',
                    dest: 'public_prod/',
                    env: 'prod'
                }
            }
        },

        /*
            DEPENDENCY MANAGEMENT
         */
        bower: {
            install: {
                options: {
                    targetDir: './components'
                }
            }
        },

        /*
            CLEAN BUILT FILES
         */
        clean: {
            dev: ['./public_dev'],
            prod: ['./public_prod']
        },

        /*
            WATCH
         */
        watch: {
            all: {
                files: ['source/**'],
                tasks: ['build:dev'],
                options: {
                    livereload: true,
                },
            },
            sass: {
                files: ['source/_sass/**'],
                tasks: ['sass:dev']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-composer');
    grunt.loadNpmTasks('grunt-sculpin');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-targethtml');
    grunt.loadNpmTasks('grunt-devcode');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Dependency management
    grunt.registerTask('install:dev', ['bower:install', 'composer:install']);
    grunt.registerTask('install:prod', ['bower:install', 'composer:install']);
    grunt.registerTask('install', ['install:dev']);
    grunt.registerTask('update:dev', ['bower:install', 'composer:update']);
    grunt.registerTask('update:prod', ['bower:install', 'composer:update:no-dev']);
    grunt.registerTask('update', ['update:dev']);

    // Build tasks
    grunt.registerTask('build:dev', ['sculpin-generate:dev', 'sass:dev', 'uglify:dev', 'cssmin:dev']);
    grunt.registerTask('build:prod', [
        'sass:prod',
        'sculpin-generate:prod',
        'devcode:prod',
        'uglify:prod',
        'cssmin:prod'
    ]);
    grunt.registerTask('build', ['build:dev']);
};
