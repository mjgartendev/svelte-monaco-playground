(self["webpackJsonp"] = self["webpackJsonp"] || []).push([[4],{

/***/ "./node_modules/monaco-editor/esm/vs/language/typescript/languageFeatures.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/language/typescript/languageFeatures.js ***!
  \***********************************************************************************/
/*! exports provided: Adapter, DiagnostcsAdapter, SuggestAdapter, SignatureHelpAdapter, QuickInfoAdapter, OccurrencesAdapter, DefinitionAdapter, ReferenceAdapter, OutlineAdapter, Kind, FormatHelper, FormatAdapter, FormatOnTypeAdapter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Adapter\", function() { return Adapter; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DiagnostcsAdapter\", function() { return DiagnostcsAdapter; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SuggestAdapter\", function() { return SuggestAdapter; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SignatureHelpAdapter\", function() { return SignatureHelpAdapter; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"QuickInfoAdapter\", function() { return QuickInfoAdapter; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"OccurrencesAdapter\", function() { return OccurrencesAdapter; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DefinitionAdapter\", function() { return DefinitionAdapter; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ReferenceAdapter\", function() { return ReferenceAdapter; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"OutlineAdapter\", function() { return OutlineAdapter; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Kind\", function() { return Kind; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FormatHelper\", function() { return FormatHelper; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FormatAdapter\", function() { return FormatAdapter; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FormatOnTypeAdapter\", function() { return FormatOnTypeAdapter; });\n/*---------------------------------------------------------------------------------------------\n *  Copyright (c) Microsoft Corporation. All rights reserved.\n *  Licensed under the MIT License. See License.txt in the project root for license information.\n *--------------------------------------------------------------------------------------------*/\n\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    }\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nvar Uri = monaco.Uri;\nvar Promise = monaco.Promise;\n//#region utils copied from typescript to prevent loading the entire typescriptServices ---\nvar IndentStyle;\n(function (IndentStyle) {\n    IndentStyle[IndentStyle[\"None\"] = 0] = \"None\";\n    IndentStyle[IndentStyle[\"Block\"] = 1] = \"Block\";\n    IndentStyle[IndentStyle[\"Smart\"] = 2] = \"Smart\";\n})(IndentStyle || (IndentStyle = {}));\nfunction flattenDiagnosticMessageText(messageText, newLine) {\n    if (typeof messageText === \"string\") {\n        return messageText;\n    }\n    else {\n        var diagnosticChain = messageText;\n        var result = \"\";\n        var indent = 0;\n        while (diagnosticChain) {\n            if (indent) {\n                result += newLine;\n                for (var i = 0; i < indent; i++) {\n                    result += \"  \";\n                }\n            }\n            result += diagnosticChain.messageText;\n            indent++;\n            diagnosticChain = diagnosticChain.next;\n        }\n        return result;\n    }\n}\nfunction displayPartsToString(displayParts) {\n    if (displayParts) {\n        return displayParts.map(function (displayPart) { return displayPart.text; }).join(\"\");\n    }\n    return \"\";\n}\n//#endregion\nvar Adapter = /** @class */ (function () {\n    function Adapter(_worker) {\n        this._worker = _worker;\n    }\n    Adapter.prototype._positionToOffset = function (uri, position) {\n        var model = monaco.editor.getModel(uri);\n        return model.getOffsetAt(position);\n    };\n    Adapter.prototype._offsetToPosition = function (uri, offset) {\n        var model = monaco.editor.getModel(uri);\n        return model.getPositionAt(offset);\n    };\n    Adapter.prototype._textSpanToRange = function (uri, span) {\n        var p1 = this._offsetToPosition(uri, span.start);\n        var p2 = this._offsetToPosition(uri, span.start + span.length);\n        var startLineNumber = p1.lineNumber, startColumn = p1.column;\n        var endLineNumber = p2.lineNumber, endColumn = p2.column;\n        return { startLineNumber: startLineNumber, startColumn: startColumn, endLineNumber: endLineNumber, endColumn: endColumn };\n    };\n    return Adapter;\n}());\n\n// --- diagnostics --- ---\nvar DiagnostcsAdapter = /** @class */ (function (_super) {\n    __extends(DiagnostcsAdapter, _super);\n    function DiagnostcsAdapter(_defaults, _selector, worker) {\n        var _this = _super.call(this, worker) || this;\n        _this._defaults = _defaults;\n        _this._selector = _selector;\n        _this._disposables = [];\n        _this._listener = Object.create(null);\n        var onModelAdd = function (model) {\n            if (model.getModeId() !== _selector) {\n                return;\n            }\n            var handle;\n            var changeSubscription = model.onDidChangeContent(function () {\n                clearTimeout(handle);\n                handle = setTimeout(function () { return _this._doValidate(model.uri); }, 500);\n            });\n            _this._listener[model.uri.toString()] = {\n                dispose: function () {\n                    changeSubscription.dispose();\n                    clearTimeout(handle);\n                }\n            };\n            _this._doValidate(model.uri);\n        };\n        var onModelRemoved = function (model) {\n            monaco.editor.setModelMarkers(model, _this._selector, []);\n            var key = model.uri.toString();\n            if (_this._listener[key]) {\n                _this._listener[key].dispose();\n                delete _this._listener[key];\n            }\n        };\n        _this._disposables.push(monaco.editor.onDidCreateModel(onModelAdd));\n        _this._disposables.push(monaco.editor.onWillDisposeModel(onModelRemoved));\n        _this._disposables.push(monaco.editor.onDidChangeModelLanguage(function (event) {\n            onModelRemoved(event.model);\n            onModelAdd(event.model);\n        }));\n        _this._disposables.push({\n            dispose: function () {\n                for (var _i = 0, _a = monaco.editor.getModels(); _i < _a.length; _i++) {\n                    var model = _a[_i];\n                    onModelRemoved(model);\n                }\n            }\n        });\n        _this._disposables.push(_this._defaults.onDidChange(function () {\n            // redo diagnostics when options change\n            for (var _i = 0, _a = monaco.editor.getModels(); _i < _a.length; _i++) {\n                var model = _a[_i];\n                onModelRemoved(model);\n                onModelAdd(model);\n            }\n        }));\n        monaco.editor.getModels().forEach(onModelAdd);\n        return _this;\n    }\n    DiagnostcsAdapter.prototype.dispose = function () {\n        this._disposables.forEach(function (d) { return d && d.dispose(); });\n        this._disposables = [];\n    };\n    DiagnostcsAdapter.prototype._doValidate = function (resource) {\n        var _this = this;\n        this._worker(resource).then(function (worker) {\n            if (!monaco.editor.getModel(resource)) {\n                // model was disposed in the meantime\n                return null;\n            }\n            var promises = [];\n            var _a = _this._defaults.getDiagnosticsOptions(), noSyntaxValidation = _a.noSyntaxValidation, noSemanticValidation = _a.noSemanticValidation;\n            if (!noSyntaxValidation) {\n                promises.push(worker.getSyntacticDiagnostics(resource.toString()));\n            }\n            if (!noSemanticValidation) {\n                promises.push(worker.getSemanticDiagnostics(resource.toString()));\n            }\n            return Promise.join(promises);\n        }).then(function (diagnostics) {\n            if (!diagnostics || !monaco.editor.getModel(resource)) {\n                // model was disposed in the meantime\n                return null;\n            }\n            var markers = diagnostics\n                .reduce(function (p, c) { return c.concat(p); }, [])\n                .map(function (d) { return _this._convertDiagnostics(resource, d); });\n            monaco.editor.setModelMarkers(monaco.editor.getModel(resource), _this._selector, markers);\n        }).done(undefined, function (err) {\n            console.error(err);\n        });\n    };\n    DiagnostcsAdapter.prototype._convertDiagnostics = function (resource, diag) {\n        var _a = this._offsetToPosition(resource, diag.start), startLineNumber = _a.lineNumber, startColumn = _a.column;\n        var _b = this._offsetToPosition(resource, diag.start + diag.length), endLineNumber = _b.lineNumber, endColumn = _b.column;\n        return {\n            severity: monaco.MarkerSeverity.Error,\n            startLineNumber: startLineNumber,\n            startColumn: startColumn,\n            endLineNumber: endLineNumber,\n            endColumn: endColumn,\n            message: flattenDiagnosticMessageText(diag.messageText, '\\n')\n        };\n    };\n    return DiagnostcsAdapter;\n}(Adapter));\n\nvar SuggestAdapter = /** @class */ (function (_super) {\n    __extends(SuggestAdapter, _super);\n    function SuggestAdapter() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    Object.defineProperty(SuggestAdapter.prototype, \"triggerCharacters\", {\n        get: function () {\n            return ['.'];\n        },\n        enumerable: true,\n        configurable: true\n    });\n    SuggestAdapter.prototype.provideCompletionItems = function (model, position, token) {\n        var wordInfo = model.getWordUntilPosition(position);\n        var resource = model.uri;\n        var offset = this._positionToOffset(resource, position);\n        return wireCancellationToken(token, this._worker(resource).then(function (worker) {\n            return worker.getCompletionsAtPosition(resource.toString(), offset);\n        }).then(function (info) {\n            if (!info) {\n                return;\n            }\n            var suggestions = info.entries.map(function (entry) {\n                return {\n                    uri: resource,\n                    position: position,\n                    label: entry.name,\n                    sortText: entry.sortText,\n                    kind: SuggestAdapter.convertKind(entry.kind)\n                };\n            });\n            return suggestions;\n        }));\n    };\n    SuggestAdapter.prototype.resolveCompletionItem = function (item, token) {\n        var _this = this;\n        var myItem = item;\n        var resource = myItem.uri;\n        var position = myItem.position;\n        return wireCancellationToken(token, this._worker(resource).then(function (worker) {\n            return worker.getCompletionEntryDetails(resource.toString(), _this._positionToOffset(resource, position), myItem.label);\n        }).then(function (details) {\n            if (!details) {\n                return myItem;\n            }\n            return {\n                uri: resource,\n                position: position,\n                label: details.name,\n                kind: SuggestAdapter.convertKind(details.kind),\n                detail: displayPartsToString(details.displayParts),\n                documentation: displayPartsToString(details.documentation)\n            };\n        }));\n    };\n    SuggestAdapter.convertKind = function (kind) {\n        switch (kind) {\n            case Kind.primitiveType:\n            case Kind.keyword:\n                return monaco.languages.CompletionItemKind.Keyword;\n            case Kind.variable:\n            case Kind.localVariable:\n                return monaco.languages.CompletionItemKind.Variable;\n            case Kind.memberVariable:\n            case Kind.memberGetAccessor:\n            case Kind.memberSetAccessor:\n                return monaco.languages.CompletionItemKind.Field;\n            case Kind.function:\n            case Kind.memberFunction:\n            case Kind.constructSignature:\n            case Kind.callSignature:\n            case Kind.indexSignature:\n                return monaco.languages.CompletionItemKind.Function;\n            case Kind.enum:\n                return monaco.languages.CompletionItemKind.Enum;\n            case Kind.module:\n                return monaco.languages.CompletionItemKind.Module;\n            case Kind.class:\n                return monaco.languages.CompletionItemKind.Class;\n            case Kind.interface:\n                return monaco.languages.CompletionItemKind.Interface;\n            case Kind.warning:\n                return monaco.languages.CompletionItemKind.File;\n        }\n        return monaco.languages.CompletionItemKind.Property;\n    };\n    return SuggestAdapter;\n}(Adapter));\n\nvar SignatureHelpAdapter = /** @class */ (function (_super) {\n    __extends(SignatureHelpAdapter, _super);\n    function SignatureHelpAdapter() {\n        var _this = _super !== null && _super.apply(this, arguments) || this;\n        _this.signatureHelpTriggerCharacters = ['(', ','];\n        return _this;\n    }\n    SignatureHelpAdapter.prototype.provideSignatureHelp = function (model, position, token) {\n        var _this = this;\n        var resource = model.uri;\n        return wireCancellationToken(token, this._worker(resource).then(function (worker) { return worker.getSignatureHelpItems(resource.toString(), _this._positionToOffset(resource, position)); }).then(function (info) {\n            if (!info) {\n                return;\n            }\n            var ret = {\n                activeSignature: info.selectedItemIndex,\n                activeParameter: info.argumentIndex,\n                signatures: []\n            };\n            info.items.forEach(function (item) {\n                var signature = {\n                    label: '',\n                    documentation: null,\n                    parameters: []\n                };\n                signature.label += displayPartsToString(item.prefixDisplayParts);\n                item.parameters.forEach(function (p, i, a) {\n                    var label = displayPartsToString(p.displayParts);\n                    var parameter = {\n                        label: label,\n                        documentation: displayPartsToString(p.documentation)\n                    };\n                    signature.label += label;\n                    signature.parameters.push(parameter);\n                    if (i < a.length - 1) {\n                        signature.label += displayPartsToString(item.separatorDisplayParts);\n                    }\n                });\n                signature.label += displayPartsToString(item.suffixDisplayParts);\n                ret.signatures.push(signature);\n            });\n            return ret;\n        }));\n    };\n    return SignatureHelpAdapter;\n}(Adapter));\n\n// --- hover ------\nvar QuickInfoAdapter = /** @class */ (function (_super) {\n    __extends(QuickInfoAdapter, _super);\n    function QuickInfoAdapter() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    QuickInfoAdapter.prototype.provideHover = function (model, position, token) {\n        var _this = this;\n        var resource = model.uri;\n        return wireCancellationToken(token, this._worker(resource).then(function (worker) {\n            return worker.getQuickInfoAtPosition(resource.toString(), _this._positionToOffset(resource, position));\n        }).then(function (info) {\n            if (!info) {\n                return;\n            }\n            var documentation = displayPartsToString(info.documentation);\n            var tags = info.tags ? info.tags.map(function (tag) {\n                var label = \"*@\" + tag.name + \"*\";\n                if (!tag.text) {\n                    return label;\n                }\n                return label + (tag.text.match(/\\r\\n|\\n/g) ? ' \\n' + tag.text : \" - \" + tag.text);\n            })\n                .join('  \\n\\n') : '';\n            var contents = displayPartsToString(info.displayParts);\n            return {\n                range: _this._textSpanToRange(resource, info.textSpan),\n                contents: [{\n                        value: '```js\\n' + contents + '\\n```\\n'\n                    }, {\n                        value: documentation + (tags ? '\\n\\n' + tags : '')\n                    }]\n            };\n        }));\n    };\n    return QuickInfoAdapter;\n}(Adapter));\n\n// --- occurrences ------\nvar OccurrencesAdapter = /** @class */ (function (_super) {\n    __extends(OccurrencesAdapter, _super);\n    function OccurrencesAdapter() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    OccurrencesAdapter.prototype.provideDocumentHighlights = function (model, position, token) {\n        var _this = this;\n        var resource = model.uri;\n        return wireCancellationToken(token, this._worker(resource).then(function (worker) {\n            return worker.getOccurrencesAtPosition(resource.toString(), _this._positionToOffset(resource, position));\n        }).then(function (entries) {\n            if (!entries) {\n                return;\n            }\n            return entries.map(function (entry) {\n                return {\n                    range: _this._textSpanToRange(resource, entry.textSpan),\n                    kind: entry.isWriteAccess ? monaco.languages.DocumentHighlightKind.Write : monaco.languages.DocumentHighlightKind.Text\n                };\n            });\n        }));\n    };\n    return OccurrencesAdapter;\n}(Adapter));\n\n// --- definition ------\nvar DefinitionAdapter = /** @class */ (function (_super) {\n    __extends(DefinitionAdapter, _super);\n    function DefinitionAdapter() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    DefinitionAdapter.prototype.provideDefinition = function (model, position, token) {\n        var _this = this;\n        var resource = model.uri;\n        return wireCancellationToken(token, this._worker(resource).then(function (worker) {\n            return worker.getDefinitionAtPosition(resource.toString(), _this._positionToOffset(resource, position));\n        }).then(function (entries) {\n            if (!entries) {\n                return;\n            }\n            var result = [];\n            for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {\n                var entry = entries_1[_i];\n                var uri = Uri.parse(entry.fileName);\n                if (monaco.editor.getModel(uri)) {\n                    result.push({\n                        uri: uri,\n                        range: _this._textSpanToRange(uri, entry.textSpan)\n                    });\n                }\n            }\n            return result;\n        }));\n    };\n    return DefinitionAdapter;\n}(Adapter));\n\n// --- references ------\nvar ReferenceAdapter = /** @class */ (function (_super) {\n    __extends(ReferenceAdapter, _super);\n    function ReferenceAdapter() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    ReferenceAdapter.prototype.provideReferences = function (model, position, context, token) {\n        var _this = this;\n        var resource = model.uri;\n        return wireCancellationToken(token, this._worker(resource).then(function (worker) {\n            return worker.getReferencesAtPosition(resource.toString(), _this._positionToOffset(resource, position));\n        }).then(function (entries) {\n            if (!entries) {\n                return;\n            }\n            var result = [];\n            for (var _i = 0, entries_2 = entries; _i < entries_2.length; _i++) {\n                var entry = entries_2[_i];\n                var uri = Uri.parse(entry.fileName);\n                if (monaco.editor.getModel(uri)) {\n                    result.push({\n                        uri: uri,\n                        range: _this._textSpanToRange(uri, entry.textSpan)\n                    });\n                }\n            }\n            return result;\n        }));\n    };\n    return ReferenceAdapter;\n}(Adapter));\n\n// --- outline ------\nvar OutlineAdapter = /** @class */ (function (_super) {\n    __extends(OutlineAdapter, _super);\n    function OutlineAdapter() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    OutlineAdapter.prototype.provideDocumentSymbols = function (model, token) {\n        var _this = this;\n        var resource = model.uri;\n        return wireCancellationToken(token, this._worker(resource).then(function (worker) { return worker.getNavigationBarItems(resource.toString()); }).then(function (items) {\n            if (!items) {\n                return;\n            }\n            var convert = function (bucket, item, containerLabel) {\n                var result = {\n                    name: item.text,\n                    detail: '',\n                    kind: (outlineTypeTable[item.kind] || monaco.languages.SymbolKind.Variable),\n                    range: _this._textSpanToRange(resource, item.spans[0]),\n                    selectionRange: _this._textSpanToRange(resource, item.spans[0]),\n                    containerName: containerLabel\n                };\n                if (item.childItems && item.childItems.length > 0) {\n                    for (var _i = 0, _a = item.childItems; _i < _a.length; _i++) {\n                        var child = _a[_i];\n                        convert(bucket, child, result.name);\n                    }\n                }\n                bucket.push(result);\n            };\n            var result = [];\n            items.forEach(function (item) { return convert(result, item); });\n            return result;\n        }));\n    };\n    return OutlineAdapter;\n}(Adapter));\n\nvar Kind = /** @class */ (function () {\n    function Kind() {\n    }\n    Kind.unknown = '';\n    Kind.keyword = 'keyword';\n    Kind.script = 'script';\n    Kind.module = 'module';\n    Kind.class = 'class';\n    Kind.interface = 'interface';\n    Kind.type = 'type';\n    Kind.enum = 'enum';\n    Kind.variable = 'var';\n    Kind.localVariable = 'local var';\n    Kind.function = 'function';\n    Kind.localFunction = 'local function';\n    Kind.memberFunction = 'method';\n    Kind.memberGetAccessor = 'getter';\n    Kind.memberSetAccessor = 'setter';\n    Kind.memberVariable = 'property';\n    Kind.constructorImplementation = 'constructor';\n    Kind.callSignature = 'call';\n    Kind.indexSignature = 'index';\n    Kind.constructSignature = 'construct';\n    Kind.parameter = 'parameter';\n    Kind.typeParameter = 'type parameter';\n    Kind.primitiveType = 'primitive type';\n    Kind.label = 'label';\n    Kind.alias = 'alias';\n    Kind.const = 'const';\n    Kind.let = 'let';\n    Kind.warning = 'warning';\n    return Kind;\n}());\n\nvar outlineTypeTable = Object.create(null);\noutlineTypeTable[Kind.module] = monaco.languages.SymbolKind.Module;\noutlineTypeTable[Kind.class] = monaco.languages.SymbolKind.Class;\noutlineTypeTable[Kind.enum] = monaco.languages.SymbolKind.Enum;\noutlineTypeTable[Kind.interface] = monaco.languages.SymbolKind.Interface;\noutlineTypeTable[Kind.memberFunction] = monaco.languages.SymbolKind.Method;\noutlineTypeTable[Kind.memberVariable] = monaco.languages.SymbolKind.Property;\noutlineTypeTable[Kind.memberGetAccessor] = monaco.languages.SymbolKind.Property;\noutlineTypeTable[Kind.memberSetAccessor] = monaco.languages.SymbolKind.Property;\noutlineTypeTable[Kind.variable] = monaco.languages.SymbolKind.Variable;\noutlineTypeTable[Kind.const] = monaco.languages.SymbolKind.Variable;\noutlineTypeTable[Kind.localVariable] = monaco.languages.SymbolKind.Variable;\noutlineTypeTable[Kind.variable] = monaco.languages.SymbolKind.Variable;\noutlineTypeTable[Kind.function] = monaco.languages.SymbolKind.Function;\noutlineTypeTable[Kind.localFunction] = monaco.languages.SymbolKind.Function;\n// --- formatting ----\nvar FormatHelper = /** @class */ (function (_super) {\n    __extends(FormatHelper, _super);\n    function FormatHelper() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    FormatHelper._convertOptions = function (options) {\n        return {\n            ConvertTabsToSpaces: options.insertSpaces,\n            TabSize: options.tabSize,\n            IndentSize: options.tabSize,\n            IndentStyle: IndentStyle.Smart,\n            NewLineCharacter: '\\n',\n            InsertSpaceAfterCommaDelimiter: true,\n            InsertSpaceAfterSemicolonInForStatements: true,\n            InsertSpaceBeforeAndAfterBinaryOperators: true,\n            InsertSpaceAfterKeywordsInControlFlowStatements: true,\n            InsertSpaceAfterFunctionKeywordForAnonymousFunctions: true,\n            InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: false,\n            InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: false,\n            InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: false,\n            PlaceOpenBraceOnNewLineForControlBlocks: false,\n            PlaceOpenBraceOnNewLineForFunctions: false\n        };\n    };\n    FormatHelper.prototype._convertTextChanges = function (uri, change) {\n        return {\n            text: change.newText,\n            range: this._textSpanToRange(uri, change.span)\n        };\n    };\n    return FormatHelper;\n}(Adapter));\n\nvar FormatAdapter = /** @class */ (function (_super) {\n    __extends(FormatAdapter, _super);\n    function FormatAdapter() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    FormatAdapter.prototype.provideDocumentRangeFormattingEdits = function (model, range, options, token) {\n        var _this = this;\n        var resource = model.uri;\n        return wireCancellationToken(token, this._worker(resource).then(function (worker) {\n            return worker.getFormattingEditsForRange(resource.toString(), _this._positionToOffset(resource, { lineNumber: range.startLineNumber, column: range.startColumn }), _this._positionToOffset(resource, { lineNumber: range.endLineNumber, column: range.endColumn }), FormatHelper._convertOptions(options));\n        }).then(function (edits) {\n            if (edits) {\n                return edits.map(function (edit) { return _this._convertTextChanges(resource, edit); });\n            }\n        }));\n    };\n    return FormatAdapter;\n}(FormatHelper));\n\nvar FormatOnTypeAdapter = /** @class */ (function (_super) {\n    __extends(FormatOnTypeAdapter, _super);\n    function FormatOnTypeAdapter() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    Object.defineProperty(FormatOnTypeAdapter.prototype, \"autoFormatTriggerCharacters\", {\n        get: function () {\n            return [';', '}', '\\n'];\n        },\n        enumerable: true,\n        configurable: true\n    });\n    FormatOnTypeAdapter.prototype.provideOnTypeFormattingEdits = function (model, position, ch, options, token) {\n        var _this = this;\n        var resource = model.uri;\n        return wireCancellationToken(token, this._worker(resource).then(function (worker) {\n            return worker.getFormattingEditsAfterKeystroke(resource.toString(), _this._positionToOffset(resource, position), ch, FormatHelper._convertOptions(options));\n        }).then(function (edits) {\n            if (edits) {\n                return edits.map(function (edit) { return _this._convertTextChanges(resource, edit); });\n            }\n        }));\n    };\n    return FormatOnTypeAdapter;\n}(FormatHelper));\n\n/**\n * Hook a cancellation token to a WinJS Promise\n */\nfunction wireCancellationToken(token, promise) {\n    token.onCancellationRequested(function () { return promise.cancel(); });\n    return promise;\n}\n\n\n//# sourceURL=webpack:///./node_modules/monaco-editor/esm/vs/language/typescript/languageFeatures.js?");

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/language/typescript/tsMode.js":
/*!*************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/language/typescript/tsMode.js ***!
  \*************************************************************************/
/*! exports provided: setupTypeScript, setupJavaScript, getJavaScriptWorker, getTypeScriptWorker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setupTypeScript\", function() { return setupTypeScript; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setupJavaScript\", function() { return setupJavaScript; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getJavaScriptWorker\", function() { return getJavaScriptWorker; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getTypeScriptWorker\", function() { return getTypeScriptWorker; });\n/* harmony import */ var _workerManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./workerManager.js */ \"./node_modules/monaco-editor/esm/vs/language/typescript/workerManager.js\");\n/* harmony import */ var _languageFeatures_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./languageFeatures.js */ \"./node_modules/monaco-editor/esm/vs/language/typescript/languageFeatures.js\");\n/*---------------------------------------------------------------------------------------------\n *  Copyright (c) Microsoft Corporation. All rights reserved.\n *  Licensed under the MIT License. See License.txt in the project root for license information.\n *--------------------------------------------------------------------------------------------*/\n\n\n\nvar javaScriptWorker;\nvar typeScriptWorker;\nfunction setupTypeScript(defaults) {\n    typeScriptWorker = setupMode(defaults, 'typescript');\n}\nfunction setupJavaScript(defaults) {\n    javaScriptWorker = setupMode(defaults, 'javascript');\n}\nfunction getJavaScriptWorker() {\n    return new monaco.Promise(function (resolve, reject) {\n        if (!javaScriptWorker) {\n            return reject(\"JavaScript not registered!\");\n        }\n        resolve(javaScriptWorker);\n    });\n}\nfunction getTypeScriptWorker() {\n    return new monaco.Promise(function (resolve, reject) {\n        if (!typeScriptWorker) {\n            return reject(\"TypeScript not registered!\");\n        }\n        resolve(typeScriptWorker);\n    });\n}\nfunction setupMode(defaults, modeId) {\n    var client = new _workerManager_js__WEBPACK_IMPORTED_MODULE_0__[\"WorkerManager\"](modeId, defaults);\n    var worker = function (first) {\n        var more = [];\n        for (var _i = 1; _i < arguments.length; _i++) {\n            more[_i - 1] = arguments[_i];\n        }\n        return client.getLanguageServiceWorker.apply(client, [first].concat(more));\n    };\n    monaco.languages.registerCompletionItemProvider(modeId, new _languageFeatures_js__WEBPACK_IMPORTED_MODULE_1__[\"SuggestAdapter\"](worker));\n    monaco.languages.registerSignatureHelpProvider(modeId, new _languageFeatures_js__WEBPACK_IMPORTED_MODULE_1__[\"SignatureHelpAdapter\"](worker));\n    monaco.languages.registerHoverProvider(modeId, new _languageFeatures_js__WEBPACK_IMPORTED_MODULE_1__[\"QuickInfoAdapter\"](worker));\n    monaco.languages.registerDocumentHighlightProvider(modeId, new _languageFeatures_js__WEBPACK_IMPORTED_MODULE_1__[\"OccurrencesAdapter\"](worker));\n    monaco.languages.registerDefinitionProvider(modeId, new _languageFeatures_js__WEBPACK_IMPORTED_MODULE_1__[\"DefinitionAdapter\"](worker));\n    monaco.languages.registerReferenceProvider(modeId, new _languageFeatures_js__WEBPACK_IMPORTED_MODULE_1__[\"ReferenceAdapter\"](worker));\n    monaco.languages.registerDocumentSymbolProvider(modeId, new _languageFeatures_js__WEBPACK_IMPORTED_MODULE_1__[\"OutlineAdapter\"](worker));\n    monaco.languages.registerDocumentRangeFormattingEditProvider(modeId, new _languageFeatures_js__WEBPACK_IMPORTED_MODULE_1__[\"FormatAdapter\"](worker));\n    monaco.languages.registerOnTypeFormattingEditProvider(modeId, new _languageFeatures_js__WEBPACK_IMPORTED_MODULE_1__[\"FormatOnTypeAdapter\"](worker));\n    new _languageFeatures_js__WEBPACK_IMPORTED_MODULE_1__[\"DiagnostcsAdapter\"](defaults, modeId, worker);\n    return worker;\n}\n\n\n//# sourceURL=webpack:///./node_modules/monaco-editor/esm/vs/language/typescript/tsMode.js?");

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/language/typescript/workerManager.js":
/*!********************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/language/typescript/workerManager.js ***!
  \********************************************************************************/
/*! exports provided: WorkerManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WorkerManager\", function() { return WorkerManager; });\n/*---------------------------------------------------------------------------------------------\n *  Copyright (c) Microsoft Corporation. All rights reserved.\n *  Licensed under the MIT License. See License.txt in the project root for license information.\n *--------------------------------------------------------------------------------------------*/\n\nvar Promise = monaco.Promise;\nvar WorkerManager = /** @class */ (function () {\n    function WorkerManager(modeId, defaults) {\n        var _this = this;\n        this._modeId = modeId;\n        this._defaults = defaults;\n        this._worker = null;\n        this._idleCheckInterval = setInterval(function () { return _this._checkIfIdle(); }, 30 * 1000);\n        this._lastUsedTime = 0;\n        this._configChangeListener = this._defaults.onDidChange(function () { return _this._stopWorker(); });\n    }\n    WorkerManager.prototype._stopWorker = function () {\n        if (this._worker) {\n            this._worker.dispose();\n            this._worker = null;\n        }\n        this._client = null;\n    };\n    WorkerManager.prototype.dispose = function () {\n        clearInterval(this._idleCheckInterval);\n        this._configChangeListener.dispose();\n        this._stopWorker();\n    };\n    WorkerManager.prototype._checkIfIdle = function () {\n        if (!this._worker) {\n            return;\n        }\n        var maxIdleTime = this._defaults.getWorkerMaxIdleTime();\n        var timePassedSinceLastUsed = Date.now() - this._lastUsedTime;\n        if (maxIdleTime > 0 && timePassedSinceLastUsed > maxIdleTime) {\n            this._stopWorker();\n        }\n    };\n    WorkerManager.prototype._getClient = function () {\n        var _this = this;\n        this._lastUsedTime = Date.now();\n        if (!this._client) {\n            this._worker = monaco.editor.createWebWorker({\n                // module that exports the create() method and returns a `TypeScriptWorker` instance\n                moduleId: 'vs/language/typescript/tsWorker',\n                label: this._modeId,\n                // passed in to the create() method\n                createData: {\n                    compilerOptions: this._defaults.getCompilerOptions(),\n                    extraLibs: this._defaults.getExtraLibs()\n                }\n            });\n            var p = this._worker.getProxy();\n            if (this._defaults.getEagerModelSync()) {\n                p = p.then(function (worker) {\n                    return _this._worker.withSyncedResources(monaco.editor.getModels()\n                        .filter(function (model) { return model.getModeId() === _this._modeId; })\n                        .map(function (model) { return model.uri; }));\n                });\n            }\n            this._client = p;\n        }\n        return this._client;\n    };\n    WorkerManager.prototype.getLanguageServiceWorker = function () {\n        var _this = this;\n        var resources = [];\n        for (var _i = 0; _i < arguments.length; _i++) {\n            resources[_i] = arguments[_i];\n        }\n        var _client;\n        return toShallowCancelPromise(this._getClient().then(function (client) {\n            _client = client;\n        }).then(function (_) {\n            return _this._worker.withSyncedResources(resources);\n        }).then(function (_) { return _client; }));\n    };\n    return WorkerManager;\n}());\n\nfunction toShallowCancelPromise(p) {\n    var completeCallback;\n    var errorCallback;\n    var r = new Promise(function (c, e) {\n        completeCallback = c;\n        errorCallback = e;\n    }, function () { });\n    p.then(completeCallback, errorCallback);\n    return r;\n}\n\n\n//# sourceURL=webpack:///./node_modules/monaco-editor/esm/vs/language/typescript/workerManager.js?");

/***/ })

}]);