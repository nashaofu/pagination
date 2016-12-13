module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*!\n' +
                ' * <%= pkg.name %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
                ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                ' * Licensed under MIT\n' +
                ' */\n',
            },
            build: {
                src: 'js/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        concat: {
            options: {
                stripBanners: true,
                banner: '/*!\n' +
                ' * <%= pkg.name %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
                ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                ' * Licensed under MIT\n' +
                ' */\n',
            },
            default: {
                src: ['dist/<%= pkg.name %>.min.css'],
                dest: 'dist/<%= pkg.name %>.min.css',
            },
            bs: {
                src: ['dist/bs-<%= pkg.name %>.min.css'],
                dest: 'dist/bs-<%= pkg.name %>.min.css',
            },
        },
        autoprefixer: {
            options: {
                browsers: [
                    "Android 2.3",
                    "Android >= 4",
                    "Chrome >= 20",
                    "Firefox >= 24",
                    "Explorer >= 8",
                    "iOS >= 6",
                    "Opera >= 12",
                    "Safari >= 6"
                ]
            },
            target: {
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: '*.css',
                    dest: 'dist',
                    ext: '.min.css'
                }]
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: '*.css',
                    dest: 'dist',
                    ext: '.min.css'
                }]
            }
        },
        clean: {
            dist: 'dist/*'
        }
    });
    // 加载 clean 插件
    grunt.loadNpmTasks('grunt-contrib-clean');
    // 加载包含 "uglify" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // 加载 cssmin 插件
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    // 加载 autoprefixer 插件
    grunt.loadNpmTasks('grunt-autoprefixer');
    // 合并 css 文件
    grunt.loadNpmTasks('grunt-contrib-concat');
    // 默认被执行的任务列表。
    grunt.registerTask('default', ['clean', 'uglify', 'cssmin', 'autoprefixer', 'concat']);
};