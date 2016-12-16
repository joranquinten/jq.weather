module.exports = function (
  gulp, settings, confGlobal, confFileMap, reload, pathFiles, notify
) {
  return function () {

    if (confGlobal.templateCache) {

      var templateCache = require('gulp-angular-templatecache');
      var ref = confFileMap.sourceFiles.templates;

      var options = {
        filename: confFileMap.targetFiles.templates,
        module: 'app.core',
        templateHeader: '/*eslint-disable*/ angular.module("<%= module %>"<%= standalone %>).run(["$templateCache", function($templateCache) {',
        templateFooter: '}]); /*eslint-enable*/'
      };

      notify('Generating template cache from: ' + pathFiles(settings.sourceFolder, ref), 'title');

      return gulp.src(pathFiles(settings.sourceFolder, ref))
        .pipe(templateCache(options))
        .pipe(gulp.dest( settings.sourceFolder + confFileMap.targetFolders.templates ))
        .pipe(reload({ stream: true }));
    }

  };
};
