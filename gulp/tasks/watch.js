module.exports = function(
  gulp, settings, plugins, confFileMap, pathFiles, notify
) {
  return function() {

    if (settings.nowatch) {

        var watchPath = confFileMap.watchFiles;
        var watchFiles = [].concat(watchPath.css, watchPath.js, watchPath.html, watchPath.images);

        notify('Watching '+ watchFiles +' in '+ settings.sourceFolder, 'title');
        notify('Disable watching with the argument -nowatch | -nw', '');

        plugins.watch(settings.sourceFolder + watchPath.css, function() {
          gulp.run(['css']);
        });

        plugins.watch(pathFiles(settings.sourceFolder, watchPath.js), function() {
          gulp.run(['js']);
        });

        plugins.watch(pathFiles(settings.sourceFolder, confFileMap.sourceFiles.templates), function() {
          gulp.run(['template-cache']);
        });

        plugins.watch(settings.sourceFolder + watchPath.images, function() {
          gulp.run(['img']);
        });

    } else {
        notify('Watching disabled.', 'title');
    }

  };
};
