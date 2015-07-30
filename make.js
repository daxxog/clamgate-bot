/* ClamgateBot / make.js
 * echo 'make script for ClamgateBot' && node make
 * (c) 2015 David (daXXog) Volm ><> + + + <><
 * Released under Apache License, Version 2.0:
 * http://www.apache.org/licenses/LICENSE-2.0.html  
 */

var bitfactory = require('bitfactory'),
    UglifyJS = require("uglify-js"),
    stoptime = require('stoptime'),
    fs = require('fs');

var watch = stoptime(),
    header = '';

bitfactory.make({ //routes
    "": function(err, results) {
        console.log('built ClamgateBot in ' + watch.elapsed() + 'ms.');
    }
}, { //dependencies
    "*": { //wildcard
        "header": function(cb) {
            fs.readFile('clamgate-bot.h', 'utf8', function(err, data) {
                header = data;
                cb(err);
            });
        },
        "clamgate-bot.min.js": ["header", function(cb) {
            fs.writeFileSync('clamgate-bot.min.js', header + UglifyJS.minify('clamgate-bot.js').code);
            cb();
        }],
        "cli.min.js": ["header", function(cb) {
            fs.writeFileSync('cli.min.js', header + UglifyJS.minify('cli.js').code);
            cb();
        }]
    }
});