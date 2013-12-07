module.exports = function (grunt) {
	grunt.initConfig({
		sass: {
			styles: {
        options: {
          style: 'compact',
          noCache: true
        },
        files: {
          'assets/codemirror2/css/styles.css': 'assets/codemirror2/css/styles.scss'
        }
      }
		},
		
		watch: {
			sass: {
        files: ['assets/codemirror2/css/*.scss'],
        tasks: ['sass']
      }
		}
	});
	
  grunt.registerTask('default', ['watch']);
	require('load-grunt-tasks')(grunt);
};