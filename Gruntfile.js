module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        'sculpin-generate': {
            options: { bin: './vendor/bin/sculpin' },
            dev: { args: { env: 'dev' } },
            prod: { args: { env: 'prod' } }
        },
        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    sourcemap: true
                },
                files: {
                    'source/css/master.css': 'source/_sass/master.scss'
                }
            },
            prod: {
                options: {
                    style: 'compressed',
                    sourcemap: false
                },
                files: {
                    'source/css/master.css': 'source/_sass/master.scss'
                }
            }
        },
        bower: {
            install: {
                options: {
                    targetDir: './components'
                }
            }
        },
        clean: {
            dev: ['./public_dev'],
            prod: ['./public_prod']
        },
        watch: {
            scripts: {
                files: ['source/**'],
                tasks: ['sass:dev', 'sculpin-generate:dev'],
                options: {},
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-composer');
    grunt.loadNpmTasks('grunt-sculpin');

    // Dependency management
    grunt.registerTask('install:dev', ['bower:install', 'composer:install']);
    grunt.registerTask('install:prod', ['bower:install', 'composer:install']);
    grunt.registerTask('install', ['install:dev']);
    grunt.registerTask('update:dev', ['bower:install', 'composer:update']);
    grunt.registerTask('update:prod', ['bower:install', 'composer:update:no-dev']);
    grunt.registerTask('update', ['update:dev']);

    // Build tasks
    grunt.registerTask('build:dev', ['sass:dev', 'sculpin-generate:dev']);
    grunt.registerTask('build:prod', ['sass:prod', 'sculpin-generate:prod']);
    grunt.registerTask('build', ['build:dev']);
};
