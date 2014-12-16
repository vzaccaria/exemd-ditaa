
Promise = require('bluebird')
{exec}  = require('shelljs')
uid     = require('uid')




_module = ->

    process = (block, opts) ->

      default-is-png = { 

         cmd: (block, tmp-file, tmp-dir) -> 
            block.to("#tmp-dir/#tmp-file")
            return "ditaa #tmp-dir/#tmp-file > /dev/null && cat #tmp-dir/#tmp-file.png | base64"
            
         output: (tmp-file, tmp-dir, output) -> '\n <img class="exemd--diagram exemd--diagram__ditaa" src="data:image/png;base64,' + output + '" /> \n' 
         }

      targets = {
        default: default-is-png
        png: default-is-png
      }

      opts.plugin-template(targets, block, opts)

    iface = {
      process: process
    }
              
    return iface
               
module.exports = _module()






