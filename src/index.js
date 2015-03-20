require('shelljs')


var plainCmd = (file, dir, type) => {
  "use strict"
  return `ditaa '${dir}/${file}' > /dev/null && cat '${dir}/${file}.${type}'`
}


var generatePng = () => {
  "use strict"
  return {
    cmd: (block, file, dir, params) => {
      var fn = `${dir}/${file}`
      block.to(fn)
      return `${plainCmd(file, dir, "png")} | base64`
    },
    output: (file, dir, output) => {
      return `\n <img class="exemd--diagram exemd--diagram__ditaa" src="data:image/png;base64,${output}" /> \n`;
    }
  }
}



var _module = () => {
  "use strict";

  var getTargets = () => {
    var targets = {
      "default": generatePng(),
      png: generatePng()
    }
    return targets
  }

  var process = (block, opts) => {
    return opts.pluginTemplate(getTargets(), block, opts)
  }

  return {
    getTargets,
    process
  }
}

module.exports = _module()