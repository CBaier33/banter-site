import {
  Directive,
  ElementRef,
  HIGHLIGHT_OPTIONS,
  HighlightBase,
  HighlightJS,
  afterRenderEffect,
  booleanAttribute,
  inject,
  input,
  numberAttribute,
  setClassMetadata,
  ɵɵdefineDirective
} from "./chunk-FJ6QNURF.js";
import {
  __async
} from "./chunk-NKJA5EKU.js";

// node_modules/ngx-highlightjs/fesm2022/ngx-highlightjs-line-numbers.mjs
function activateLineNumbers() {
  const w = window;
  const d = document;
  const TABLE_NAME = "hljs-ln", LINE_NAME = "hljs-ln-line", CODE_BLOCK_NAME = "hljs-ln-code", NUMBERS_BLOCK_NAME = "hljs-ln-numbers", NUMBER_LINE_NAME = "hljs-ln-n", DATA_ATTR_NAME = "data-line-number", BREAK_LINE_REGEXP = /\r\n|\r|\n/g;
  if (w.hljs) {
    w.hljs.initLineNumbersOnLoad = initLineNumbersOnLoad;
    w.hljs.lineNumbersBlock = lineNumbersBlock;
    w.hljs.lineNumbersValue = lineNumbersValue;
    addStyles();
  } else {
    w.console.error("highlight.js not detected!");
  }
  function isHljsLnCodeDescendant(domElt) {
    let curElt = domElt;
    while (curElt) {
      if (curElt.className && curElt.className.indexOf("hljs-ln-code") !== -1) {
        return true;
      }
      curElt = curElt.parentNode;
    }
    return false;
  }
  function getHljsLnTable(hljsLnDomElt) {
    let curElt = hljsLnDomElt;
    while (curElt.nodeName !== "TABLE") {
      curElt = curElt.parentNode;
    }
    return curElt;
  }
  function edgeGetSelectedCodeLines(selection) {
    const selectionText = selection.toString();
    let tdAnchor = selection.anchorNode;
    while (tdAnchor.nodeName !== "TD") {
      tdAnchor = tdAnchor.parentNode;
    }
    let tdFocus = selection.focusNode;
    while (tdFocus.nodeName !== "TD") {
      tdFocus = tdFocus.parentNode;
    }
    let firstLineNumber = parseInt(tdAnchor.dataset.lineNumber);
    let lastLineNumber = parseInt(tdFocus.dataset.lineNumber);
    if (firstLineNumber != lastLineNumber) {
      let firstLineText = tdAnchor.textContent;
      let lastLineText = tdFocus.textContent;
      if (firstLineNumber > lastLineNumber) {
        let tmp = firstLineNumber;
        firstLineNumber = lastLineNumber;
        lastLineNumber = tmp;
        tmp = firstLineText;
        firstLineText = lastLineText;
        lastLineText = tmp;
      }
      while (selectionText.indexOf(firstLineText) !== 0) {
        firstLineText = firstLineText.slice(1);
      }
      while (selectionText.lastIndexOf(lastLineText) === -1) {
        lastLineText = lastLineText.slice(0, -1);
      }
      let selectedText = firstLineText;
      const hljsLnTable = getHljsLnTable(tdAnchor);
      for (let i = firstLineNumber + 1; i < lastLineNumber; ++i) {
        const codeLineSel = format('.{0}[{1}="{2}"]', [CODE_BLOCK_NAME, DATA_ATTR_NAME, i]);
        const codeLineElt = hljsLnTable.querySelector(codeLineSel);
        selectedText += "\n" + codeLineElt.textContent;
      }
      selectedText += "\n" + lastLineText;
      return selectedText;
    } else {
      return selectionText;
    }
  }
  document.addEventListener("copy", function(e) {
    const selection = window.getSelection();
    if (isHljsLnCodeDescendant(selection.anchorNode)) {
      let selectionText;
      if (window.navigator.userAgent.indexOf("Edge") !== -1) {
        selectionText = edgeGetSelectedCodeLines(selection);
      } else {
        selectionText = selection.toString();
      }
      e.clipboardData.setData("text/plain", selectionText);
      e.preventDefault();
    }
  });
  function addStyles() {
    const css = d.createElement("style");
    css.type = "text/css";
    css.innerHTML = format(".{0}{border-collapse:collapse}.{0} td{padding:0}.{1}:before{content:attr({2})}", [TABLE_NAME, NUMBER_LINE_NAME, DATA_ATTR_NAME]);
    d.getElementsByTagName("head")[0].appendChild(css);
  }
  function initLineNumbersOnLoad(options) {
    if (d.readyState === "interactive" || d.readyState === "complete") {
      documentReady(options);
    } else {
      w.addEventListener("DOMContentLoaded", function() {
        documentReady(options);
      });
    }
  }
  function documentReady(options) {
    try {
      const blocks = d.querySelectorAll("code.hljs,code.nohighlight");
      for (const i in blocks) {
        if (blocks.hasOwnProperty(i)) {
          if (!isPluginDisabledForBlock(blocks[i])) {
            lineNumbersBlock(blocks[i], options);
          }
        }
      }
    } catch (e) {
      w.console.error("LineNumbers error: ", e);
    }
  }
  function isPluginDisabledForBlock(element) {
    return element.classList.contains("nohljsln");
  }
  function lineNumbersBlock(element, options) {
    if (typeof element !== "object") {
      return;
    }
    async(function() {
      element.innerHTML = lineNumbersInternal(element, options);
    });
  }
  function lineNumbersValue(value, options) {
    if (typeof value !== "string") {
      return;
    }
    const element = document.createElement("code");
    element.innerHTML = value;
    return lineNumbersInternal(element, options);
  }
  function lineNumbersInternal(element, options) {
    const internalOptions = mapOptions(element, options);
    duplicateMultilineNodes(element);
    return addLineNumbersBlockFor(element.innerHTML, internalOptions);
  }
  function addLineNumbersBlockFor(inputHtml, options) {
    const lines = getLines(inputHtml);
    if (lines[lines.length - 1].trim() === "") {
      lines.pop();
    }
    if (lines.length > 1 || options.singleLine) {
      let html = "";
      for (let i = 0, l = lines.length; i < l; i++) {
        html += format('<tr><td class="{0} {1}" {3}="{5}"><div class="{2}" {3}="{5}"></div></td><td class="{0} {4}" {3}="{5}">{6}</td></tr>', [LINE_NAME, NUMBERS_BLOCK_NAME, NUMBER_LINE_NAME, DATA_ATTR_NAME, CODE_BLOCK_NAME, i + options.startFrom, lines[i].length > 0 ? lines[i] : " "]);
      }
      return format('<table class="{0}">{1}</table>', [TABLE_NAME, html]);
    }
    return inputHtml;
  }
  function mapOptions(element, options) {
    options = options || {};
    return {
      singleLine: getSingleLineOption(options),
      startFrom: getStartFromOption(element, options)
    };
  }
  function getSingleLineOption(options) {
    const defaultValue = false;
    if (options.singleLine) {
      return options.singleLine;
    }
    return defaultValue;
  }
  function getStartFromOption(element, options) {
    const defaultValue = 1;
    let startFrom = defaultValue;
    if (isFinite(options.startFrom)) {
      startFrom = options.startFrom;
    }
    const value = getAttribute(element, "data-ln-start-from");
    if (value !== null) {
      startFrom = toNumber(value, defaultValue);
    }
    return startFrom;
  }
  function duplicateMultilineNodes(element) {
    const nodes = element.childNodes;
    for (const node in nodes) {
      if (nodes.hasOwnProperty(node)) {
        const child = nodes[node];
        if (getLinesCount(child.textContent) > 0) {
          if (child.childNodes.length > 0) {
            duplicateMultilineNodes(child);
          } else {
            duplicateMultilineNode(child.parentNode);
          }
        }
      }
    }
  }
  function duplicateMultilineNode(element) {
    const className = element.className;
    if (!/hljs-/.test(className)) {
      return;
    }
    const lines = getLines(element.innerHTML);
    let result = "";
    for (let i = 0; i < lines.length; i++) {
      const lineText = lines[i].length > 0 ? lines[i] : " ";
      result += format('<span class="{0}">{1}</span>\n', [className, lineText]);
    }
    element.innerHTML = result.trim();
  }
  function getLines(text) {
    if (text.length === 0) {
      return [];
    }
    return text.split(BREAK_LINE_REGEXP);
  }
  function getLinesCount(text) {
    return (text.trim().match(BREAK_LINE_REGEXP) || []).length;
  }
  function async(func) {
    w.setTimeout(func, 0);
  }
  function format(format2, args) {
    return format2.replace(/\{(\d+)\}/g, function(m, n) {
      return args[n] !== void 0 ? args[n] : m;
    });
  }
  function getAttribute(element, attrName) {
    return element.hasAttribute(attrName) ? element.getAttribute(attrName) : null;
  }
  function toNumber(str, fallback) {
    if (!str) {
      return fallback;
    }
    const number = Number(str);
    return isFinite(number) ? number : fallback;
  }
}
var HighlightLineNumbers = class _HighlightLineNumbers {
  constructor() {
    this.options = inject(HIGHLIGHT_OPTIONS)?.lineNumbersOptions;
    this._hljs = inject(HighlightJS);
    this._highlight = inject(HighlightBase);
    this._nativeElement = inject(ElementRef).nativeElement;
    this.startFrom = input(this.options?.startFrom, {
      transform: numberAttribute
    });
    this.singleLine = input(this.options?.singleLine, {
      transform: booleanAttribute
    });
    afterRenderEffect({
      write: () => {
        if (this._highlight.highlightResult()) {
          this.addLineNumbers();
        }
      }
    });
  }
  addLineNumbers() {
    this.destroyLineNumbersObserver();
    requestAnimationFrame(() => __async(this, null, function* () {
      yield this._hljs.lineNumbersBlock(this._nativeElement, {
        startFrom: this.startFrom(),
        singleLine: this.singleLine()
      });
      this._lineNumbersObs = new MutationObserver(() => {
        if (this._nativeElement.firstElementChild?.tagName.toUpperCase() === "TABLE") {
          this._nativeElement.classList.add("hljs-line-numbers");
        }
        this.destroyLineNumbersObserver();
      });
      this._lineNumbersObs.observe(this._nativeElement, {
        childList: true
      });
    }));
  }
  destroyLineNumbersObserver() {
    if (this._lineNumbersObs) {
      this._lineNumbersObs.disconnect();
      this._lineNumbersObs = null;
    }
  }
  static {
    this.\u0275fac = function HighlightLineNumbers_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _HighlightLineNumbers)();
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _HighlightLineNumbers,
      selectors: [["", "highlight", "", "lineNumbers", ""], ["", "highlightAuto", "", "lineNumbers", ""]],
      inputs: {
        startFrom: [1, "startFrom"],
        singleLine: [1, "singleLine"]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HighlightLineNumbers, [{
    type: Directive,
    args: [{
      selector: "[highlight][lineNumbers], [highlightAuto][lineNumbers]"
    }]
  }], () => [], null);
})();
export {
  HighlightLineNumbers,
  activateLineNumbers
};
