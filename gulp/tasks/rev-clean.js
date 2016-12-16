module.exports = function(
  gulp, settings, confGlobal, confFileMap, notify
) {
  return function() {
    if (confGlobal.enableRevisioning && !confGlobal.cleanBeforeRun) {
        // if already cleaned, no need to clean up a second time
        if (!settings.isDevelop) {
          var manifest = confFileMap.targetFolders.revManifest + confFileMap.targetFiles.revManifest;
          var manifestFile = null;

          var fs = require('fs');
          try {
            file = fs.lstatSync(manifest);
            if (file.isFile()) {
              try {
                manifestFile = require('../../'+ manifest);
              } catch (e) {
                notify('Could not open ' + manifest + ' in: ' + __dirname, 'error');
              }
            }
          } catch (e) {
            // do nothing
            notify('No manifest file found in ' + e.path, 'error');
          }

          if (manifestFile) {
            notify('Manifest opened, starting to delete files.', 'warning');
            for (var files in manifestFile) {
              if (manifestFile.hasOwnProperty(files)) {
                try {
                  notify('Deleting '+ settings.targetFolder + manifestFile[files], '');
                      fs.unlink(settings.targetFolder + manifestFile[files]);
                } catch (e) {
                  notify('Could not delete: ' + manifestFile[files], 'error');
                }
              }
            }
          }
        } else {
          notify('Production environment was already cleaned. Skipping.', 'warning');
        }
    }
  };
};
