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
        scsslint: {
            dev: {
                src: ['source/_sass/**'],
            }
        },

        /*
            JAVASCRIPT
         */
        uglify: {
            prod: {
                files: {
                    'public_prod/js/main.min.js': [
                        'components/jquery/dist/jquery.js',
                        'components/instantclick/instantclick.js',
                        'components/highlightjs/highlight.pack.js',
                        'components/picturefill/dist/picturefill.js',
                        'source/js/vtabs.js',
                        'source/js/top-nav.js'
                    ]
                }
            },
            dev: {
                files: {
                    'public_dev/js/main.min.js': [
                        'components/jquery/dist/jquery.js',
                        'components/instantclick/instantclick.js',
                        'components/highlightjs/highlight.pack.js',
                        'components/picturefill/dist/picturefill.js',
                        'source/js/vtabs.js',
                        'source/js/top-nav.js'
                    ]
                }
            }
        },

        /*
            PDF
         */
        copy: {
            cv_prod: {
                src: 'cv-pdf/cv.pdf',
                dest: 'public_prod/cv.pdf'
            },
            cv_dev: {
                src: 'cv-pdf/cv.pdf',
                dest: 'public_dev/cv.pdf'
            },
            htmlinspector_dev: {
                src: 'components/html-inspector/html-inspector.js',
                dest: 'public_dev/js/html-inspector.js'
            }
        },

        /*
            HTML
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
                }
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
            IMAGES
         */
        responsive_images: {
            source: {
                options: {
                    sizes: [
                        { name: 'small', width: 320 },
                        { name: 'small', width: 640, suffix: '@2x' },
                        { name: 'medium', width: 450 },
                        { name: 'medium', width: 900, suffix: '@2x'},
                        { name: 'large', width: 638 },
                        { name: 'large', width: 1276, suffix: '@2x' },
                        { name: 'original', width: '100%' }
                    ]
                },
                files: [{
                    expand: true,
                    src: [
                        '**/*.{jpg,gif,png}'
                    ],
                    cwd: 'source/img/original/',
                    dest: 'source/img/'
                }]
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
                files: ['source/**/*.html', 'source/**/*.html.twig', 'source/**/*.md', 'source/fonts/*', 'source/img/**'],
                tasks: ['sculpin-generate:dev'],
                options: {
                    livereload: true,
                },
            },
            sass: {
                files: ['source/_sass/**'],
                tasks: ['sass:dev', 'cssmin:dev'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['source/js/*.js'],
                tasks: ['uglify:dev'],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-composer');
    grunt.loadNpmTasks('grunt-sculpin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-devcode');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-scsslint');

    // Build tasks
    grunt.registerTask('build:dev', [
        'sculpin-generate:dev',
        'sass:dev',
        'uglify:dev',
        'cssmin:dev',
        'copy:cv_dev',
        'copy:htmlinspector_dev'
    ]);
    grunt.registerTask('build:prod', [
        'sass:prod',
        'sculpin-generate:prod',
        'devcode:prod',
        'uglify:prod',
        'cssmin:prod',
        'copy:cv_prod'
    ]);
    grunt.registerTask('build', ['build:dev']);
};
