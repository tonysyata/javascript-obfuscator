"use strict";
const escodegen = require('escodegen');
const NodeObfuscator_1 = require('./NodeObfuscator');
class LiteralObfuscator extends NodeObfuscator_1.NodeObfuscator {
    obfuscateNode(literalNode, parentNode) {
        if (parentNode.type === 'Property' && parentNode.key === literalNode) {
            return;
        }
        switch (typeof literalNode.value) {
            case 'string':
                if (literalNode['x-verbatim-property']) {
                    break;
                }
                literalNode['x-verbatim-property'] = {
                    content: this.replaceLiteralStringByArrayElement(literalNode.value),
                    precedence: escodegen.Precedence.Primary
                };
                break;
        }
    }
}
exports.LiteralObfuscator = LiteralObfuscator;