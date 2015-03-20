var chai = require('chai')
chai.use(require('chai-as-promised'))
var should = chai.should()
var {
  rm
} = require('shelljs')

/*global describe, it */

var dotFile = `
digraph {
        a -> b[label="0.2",weight="0.2"];
        a -> c[label="0.4",weight="0.4"];
        c -> b[label="0.6",weight="0.6"];
        c -> e[label="0.6",weight="0.6"];
        e -> e[label="0.1",weight="0.1"];
        e -> b[label="0.7",weight="0.7"];
    }
`

describe('#module', () => {
  "use strict"
  it('should load the module', () => {

    var mod = require('..')
    should.exist(mod)

  })
})

describe('#getTargets', () => {
  "use strict"
  it('should generate a png file', () => {

    var {
      cmd, output
    } = require('..').getTargets().png

    should.exist(cmd)
    should.exist(output)

    var cc = cmd(dotFile, "tmp", ".", "opts")
    var o = output("tmp", ".", "tst")

    cc.should.be.equal("ditaa \'./tmp\' > /dev/null && cat \'./tmp.png\' | base64")
    o.should.be.equal(`\n <img class="exemd--diagram exemd--diagram__ditaa" src="data:image/png;base64,tst" /> \n`)

    rm("-f", "./tmp")
  })
})