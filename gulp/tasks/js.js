module.exports = function(
  gulp, settings, plugins, confGlobal, confFileMap, confPlugins, gulpif, reload, pathFiles, notify
) {
  return function() {

    var ref = confFileMap.sourceFiles.js;

    return gulp.src(pathFiles(settings.sourceFolder, ref))
      .pipe(plugins.plumber({ handleError: function(err) { notify(err, 'error'); } }))

      /*
       * Transform / inject contents
       */
      .pipe(gulpif((!settings.isDevelop && confGlobal.transformForAngular), plugins.ngAnnotate()))
      .pipe(gulpif(!settings.isDevelop, plugins.stripDebug()))
      .pipe(gulpif(!settings.isDevelop && confGlobal.enableUglify, plugins.uglify({ mangle: true })))
      .pipe(gulpif(confGlobal.enableGZIP, plugins.gzip(confPlugins.gzipOptions)))
      .pipe(reload({ stream: true }));
  };
};
