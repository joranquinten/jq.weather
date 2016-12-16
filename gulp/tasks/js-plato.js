module.exports = function (
  gulp, settings, confGlobal, confFileMap, pathFiles, notify
) {
  return function () {

    if (!settings.isDevelop) {
      var plato = require('plato');


      var ref = confFileMap.sourceFiles.js;

      notify('Running plato analysis: ' + pathFiles(settings.sourceFolder, ref), 'title');

      var fs = require('fs');

      var reportsDir = confFileMap.targetFolders.reports + '/plato';
      if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir);

      var options = {
        title: 'Wat zal ik doen vandaag?',
        exclude: /.*\.spec\.js/
      };

      plato.inspect(pathFiles(settings.sourceFolder, ref), reportsDir, options, function (report) {
        var overview = plato.getOverviewReport(report);
        var avg = overview.summary.average;

        if (parseFloat(avg.maintainability) <= 70) {
          var reportClass = 'error';
        } else {
          var reportClass = 'title';
        }

        notify('Analysis completed, maintainability score: ' + avg.maintainability + '.', reportClass);

        return true;
      });
    }

  };
};
