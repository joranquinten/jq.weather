module.exports = function(
  gulp, settings, confPlugins, browserSync, confLocal, notify
) {
  return function() {

    if (!settings.noserve) {

      if (settings.isDevelop) {
        var baseDir = settings.sourceFolder;
      } else {
        var baseDir = settings.targetFolder;
      }

      notify('Serving from '+ baseDir +'.', 'title');
      notify('Disable serving with the argument -noserve | -ns.', '');

      var serverUrl, browserList;
      serverUrl = confPlugins.browserSync.proxy;
      browserList = confPlugins.browserSync.browsers;

      // Overwrite with local settings is applicable
      if (confLocal.server) serverUrl = confLocal.server;
      if (confLocal.browsers) browserList = confLocal.browsers;

      // Settings to use a static server:
      browserSync.init({
          server: {
            baseDir: baseDir,
            https: false,
            routes: {
                '/bower_components' : './bower_components',
                '/mock' : './mock'
            }
          }, browser: browserList });

    } else {

      notify('Serving is disabled.', 'title');

    }

  };
};
