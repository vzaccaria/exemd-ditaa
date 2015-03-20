require('shelljs')


var plainCmd = (file, type) => {
  "use strict"
  return `ditaa '${file}' > /dev/null && cat '${file}.${type}'`
}


var generateSvg = () => {
  "use strict"
  throw "Svg generation not available for this plugin."
}

var generatePng = () => {
  "use strict"
  return {
    cmd: (block, file, dir, params) => {
      var fn = `${dir}/${file}`
      block.to(fn)
      return `${plainCmd(file, "png")} | base64`
    },
    output: (file, dir, output) => {
      return `\n <img class="exemd--diagram exemd--diagram__ditaa" src="data:image/png;base64,${output}" /> \n`;
    }
  }
}

var generatePdf = () => {
  "use strict"
  throw "Pdf generation not available for this plugin."
}


var _module = () => {
  "use strict";

  var getTargets = () => {
    var targets = {
      default: generateSvg(),
      svg: generateSvg(),
      pdf: generatePdf(),
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