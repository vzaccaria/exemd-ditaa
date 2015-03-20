"use strict";

require("shelljs");

var plainCmd = function (file, type) {
  "use strict";
  return "ditaa '" + file + "' > /dev/null && cat '" + file + "." + type + "'";
};

var generatePng = function () {
  "use strict";
  return {
    cmd: function (block, file, dir, params) {
      var fn = "" + dir + "/" + file;
      block.to(fn);
      return "" + plainCmd(file, "png") + " | base64";
    },
    output: function (file, dir, output) {
      return "\n <img class=\"exemd--diagram exemd--diagram__ditaa\" src=\"data:image/png;base64," + output + "\" /> \n";
    }
  };
};

var _module = function () {
  "use strict";

  var getTargets = function () {
    var targets = {
      png: generatePng()
    };
    return targets;
  };

  var process = function (block, opts) {
    return opts.pluginTemplate(getTargets(), block, opts);
  };

  return {
    getTargets: getTargets,
    process: process
  };
};

module.exports = _module();
