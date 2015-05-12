module.exports = function(grunt) {

  // Add the grunt-mocha-test tasks.
  grunt.loadNpmTasks('grunt-mocha-test');

  var config = {
    mochaTest: {
      yaml: {
        src: 'test/read-yaml.js',
        options: {
          reporter: 'spec',
          // captureFile: 'results.txt', // Optionally capture the reporter output to a file
          // quiet: false, // Optionally suppress output to standard out (defaults to false)
          // clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
        }
      }
    }
  };

  grunt.initConfig(config);
  grunt.registerTask('default', 'mochaTest');
};
