
Promise = require('bluebird')
{exec}  = require('shelljs')
uid     = require('uid')

_module = ->

    process = (block, opts) ->
      new Promise (resolve, preject) ->

        if opts.target-mode != "pdf"

              temp-file = "#{opts.tmpdir}/#{uid(7)}"
              block.to(temp-file)
              cmd = "ditaa #temp-file > /dev/null && cat #temp-file.png | base64"
              exec cmd, {+async, +silent}, (code, output) ->
                output = '\n <img src="data:image/png;base64,' + output + '" /> \n'

                if not code
                    resolve(output)

                else
                    resolve("```{ditaa #params}#block```")

        else
          resolve("```{ditaa #params}#block```")

    iface = {

      process: process

    }
              
    return iface
               
module.exports = _module()






