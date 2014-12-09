#!/usr/bin/env node
// Generated by LiveScript 1.3.1
(function(){
  var Promise, exec, uid, _module;
  Promise = require('bluebird');
  exec = require('shelljs').exec;
  uid = require('uid');
  _module = function(){
    var process, iface;
    process = function(block, opts){
      return new Promise(function(resolve, preject){
        var params, tempFile, cmd;
        params == null && (params = opts.params);
        if (opts.targetMode !== "pdf") {
          tempFile = opts.tmpdir + "/" + uid(7);
          block.to(tempFile);
          cmd = "ditaa " + tempFile + " > /dev/null && cat " + tempFile + ".png | base64";
          return exec(cmd, {
            async: true,
            silent: true
          }, function(code, output){
            output = '\n <img src="data:image/png;base64,' + output + '" /> \n';
            if (!code) {
              return resolve(output);
            } else {
              return resolve("```{ditaa " + params + "}" + block + "```");
            }
          });
        } else {
          return resolve("```{ditaa " + params + "}" + block + "```");
        }
      });
    };
    iface = {
      process: process
    };
    return iface;
  };
  module.exports = _module();
}).call(this);
