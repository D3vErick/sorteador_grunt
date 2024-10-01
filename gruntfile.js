const { options } = require("less");

module.exports = function(grunt) { //Arquivo de configuração do Grunt.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: { //Essa parte será executada apenas em nossa maquina,
                files: {   //para fins de desenvolvimento.
                    'dev/styles/main.css': 'src/styles/main.less'
                }
            },
            production: { //Essa parte será executada apenas no serviço de
                options: {//hospedagem, como a Vercel por exemplo.
                    compress: true, 
                },
                files: {
                    'dist/styles/main.min.css': 'src/styles/main.less' 
                }
            }
        },
        watch: {
            less: {
                files: ['src/styles/**/*.less'], //Asterisco duplo é para referenciar qualquer pasta existente.
                tasks: ['less:development']//Asterisco único é para referenciar qualquer arquivo existente.
            },
            html: {
                files: ['src/index.html'],
                tasks: ['replace:dev']
            }
        },
        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: '../src/scripts/main.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'dev/'
                    }
                ]
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.min.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: './scripts/main.min.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['prebuild/index.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },
        htmlmin: { //Minificando o html
            dist: {
                options: {
                    removeComments: true, //remove os comentários.
                    collapseWhitespace: true //remove as linhas vazias.
                },
                files: {
                    'prebuild/index.html': 'src/index.html'
                } //"destino.txt"            "Origem.txt": 
            }
        },
        clean: ['prebuild'], //Apaga a pasta temporária "prebuild".
        uglify: {
            target: {
                files: {
                    'dist/scripts/main.min.js': 'src/scripts/main.js'
                }
            }
        }
    })


    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');



    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'clean', 'uglify']);

}