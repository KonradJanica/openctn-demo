(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BoardSmall = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tile = require("./tile");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BoardSmall = exports.BoardSmall = function () {
    function BoardSmall() {
        _classCallCheck(this, BoardSmall);

        this.tiles = [];
        for (var i = 0; i < BoardSmall.AmountTiles; ++i) {
            this.tiles.push(new _tile.Tile(null));
        }
        this.positionTiles();
    }

    _createClass(BoardSmall, [{
        key: "positionTiles",
        value: function positionTiles() {
            var _this = this;

            var yPos = 0;
            var rowEnd = 0;
            var i = 0;
            [[_tile.Tile.Width, 3], [_tile.Tile.Width / 2, 4], [0, 5], [_tile.Tile.Width / 2, 4], [_tile.Tile.Width, 3]].forEach(function (val) {
                var xPos = val[0];
                rowEnd += val[1];
                for (; i < rowEnd; ++i) {
                    _this.tiles[i].xPos = xPos;
                    _this.tiles[i].yPos = yPos;
                    xPos += _tile.Tile.Width;
                }
                yPos += _tile.Tile.Height;
            });
        }
    }, {
        key: "render",
        value: function render() {
            return this.tiles.map(function (val, i) {
                return "<div style=\"position:absolute;top:" + val.yPos + "px;left:" + val.xPos + "px;\">\n        " + i + "\n      </div>";
            }).join("");
        }
    }]);

    return BoardSmall;
}();

BoardSmall.AmountTiles = 19;

},{"./tile":3}],2:[function(require,module,exports){
'use strict';

var _boardSmall = require('./board-small');

var board = new _boardSmall.BoardSmall();
document.body.innerHTML = board.render();

},{"./board-small":1}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TileType = exports.TileType = undefined;
(function (TileType) {
    TileType[TileType["DESERT"] = 0] = "DESERT";
    TileType[TileType["GRAIN"] = 1] = "GRAIN";
    TileType[TileType["LUMBER"] = 2] = "LUMBER";
    TileType[TileType["WOOL"] = 3] = "WOOL";
    TileType[TileType["ORE"] = 4] = "ORE";
    TileType[TileType["BRICK"] = 5] = "BRICK";
})(TileType || (exports.TileType = TileType = {}));

var Tile = exports.Tile = function Tile(tileParams) {
    // this.tileType = tileParams.tileType;
    // this.landList = tileParams.landList; 

    _classCallCheck(this, Tile);
};

Tile.Height = 50;
Tile.Width = 50;
;

},{}]},{},[2]);
