;'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    require('time-grunt')(grunt);

    grunt.initConfig({
        sass: {
            options: {
                style: 'expended'
            },
            app: {
                files: [{
                    expand: true,
                    cwd: '',
                    src: 'index.scss',
                    dest: '',
                    ext: '.css'
                }]
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 5 version']
            },
            app: {
                files: [{
                    expand: true,
                    cwd: '',
                    src: 'index.css',
                    dest: ''
                }]
            }
        },
        connect: {
            options: {
                port: 9000,
                hostname: 'localhost',
                base: './',
                livereload: 35729
            },
            app: {
                options: {
                    target: './index.html'
                }
            }
        },
        watch: {
            options: {
                livereload: '<%= connect.options.livereload %>'
            },
            sass: {
                files: ['**/*.scss'],
                tasks: ['sass:app']
            },
            css: {
                files: ['index.css'],
                tasks: ['newer:autoprefixer:app']
            },
            html: {
                files: ['index.html']
            },
            js: {
                files: ['index.js']
            }
        },



    });

    grunt.registerTask('app', 'grunt:app', function() {
        grunt.task.run([
            'connect',
            'watch'
        ]);
    });

};