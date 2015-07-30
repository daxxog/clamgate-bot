/* ClamgateBot
 * just-dice bot that calls the clamgate.com api
 * (c) 2015 David (daXXog) Volm ><> + + + <><
 * Released under Apache License, Version 2.0:
 * http://www.apache.org/licenses/LICENSE-2.0.html  
 */

/* UMD LOADER: https://github.com/umdjs/umd/blob/master/returnExports.js */
(function (root, factory) {
    if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else {
        // Browser globals (root is window)
        root.ClamgateBot = factory();
  }
}(this, function() {
    var JustBot = require('just-bot'),
        request = require('request'),
        S = require('string'),
        ClamgateBot;
    
    ClamgateBot = function(hashOpts) {
        var ENDPOINT = 'https://clamgate.com/api',
            VERSION = 'v1',
            OWNER = 1105420, //daXXog
            that = this;
        
        this.bot = new JustBot(hashOpts);
        
        this.bot.on('ready', function() {
            that.bot.msg(OWNER, 'ClamgateBot ' + VERSION + ' ready!');
        });
        
        this.bot.on('msg', function(msg) {
            if(S(msg.txt).isAlphaNumeric()) {
                request.post([ENDPOINT, VERSION, 'link', msg.txt, msg.user.toString(10)].join('/'), function(err, res, body) {
                    if(!err) {
                        that.bot.msg(msg.user, body);
                        
                        if(res.statusCode !== 200) {
                            that.help(msg.user);
                        }
                    } else {
                        that.bot.msg(OWNER, 'ClamgateBot error!');
                    }
                });
            } else {
                that.help(msg.user);
            }
        });
        
        this.bot.on('chat', function(msg) {
            if(msg.txt === '!clamgate') {
                that.bot.chat('/me create a bitcoin deposit address via https://clamgate.com; no spamming !clamgate please!');
                that.bot.chat('/me ' + that._help());
            }
        });
    };
    
    ClamgateBot.prototype._help = function() {
        return '/msg ' + this.bot.uid + ' [YOUR CLAM ADDRESS HERE]';
    };
    
    ClamgateBot.prototype.help = function(to) {
        this.bot.msg(to, this._help());
    };
    
    return ClamgateBot;
}));
