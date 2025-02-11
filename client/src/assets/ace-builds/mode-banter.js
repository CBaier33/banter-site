ace.define("ace/mode/banter_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module){
    "use strict";

    var oop = require("ace/lib/oop");
    var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;

    var BanterHighlightRules = function() {
        this.$rules = {
            "start": [
                {
                    token: "keyword",
                    regex: "\\b(else)\\b"
                },
                {
                    token: "keyword",
                    regex: "\\b(?:(?:let|be|if|else|then|goto|instruction|print|return))\\b|@"
                },
                {
                    token: "support.type",
                    regex: "\\b(?:bool|string|int|float)\\b"
                },
                {
                    token: "string",
                    regex: '".*?"'
                },
                {
                    token: "constant.numeric",
                    regex: "\\b\\d+\\b"
                },
                {
                    token: "variable.language",
                    regex: "\\b(?:True|False)\\b"
                },
                {
                    token: "comment",
                    regex: "#.*$"
                }
            ]
        };

        this.normalizeRules();
    };

    oop.inherits(BanterHighlightRules, TextHighlightRules);
    exports.BanterHighlightRules = BanterHighlightRules;
});

ace.define("ace/mode/banter",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/banter_highlight_rules"], function(require, exports, module){
    "use strict";

    var oop = require("ace/lib/oop");
    var TextMode = require("ace/mode/text").Mode;
    var BanterHighlightRules = require("ace/mode/banter_highlight_rules").BanterHighlightRules;

    var BanterMode = function() {
        this.HighlightRules = BanterHighlightRules;
    };

    oop.inherits(BanterMode, TextMode);

    (function() {
        this.$id = "ace/mode/banter";
    }).call(BanterMode.prototype);

    exports.Mode = BanterMode;
});

