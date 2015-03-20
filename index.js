"use strict";

require("shelljs");

var plainCmd = function (file, dir, type) {
  "use strict";
  return "ditaa '" + dir + "/" + file + "' > /dev/null && cat '" + dir + "/" + file + "." + type + "'";
};

var generatePng = function () {
  "use strict";
  return {
    cmd: function (block, file, dir, params) {
      var fn = "" + dir + "/" + file;
      block.to(fn);
      return "" + plainCmd(file, dir, "png") + " | base64";
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
      "default": generatePng(),
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
