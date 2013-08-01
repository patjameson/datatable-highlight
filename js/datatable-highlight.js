function datatableHighlight() {}

datatableHighlight.ATTRS = {
	highlightRows: {
		value: false,
		setter: '_highlightRows',
		validator: Y.Lang.isBoolean
	},
	highlightCols: {
		value: false,
		setter: '_highlightCols',
		validator: Y.Lang.isBoolean
	},
	highlightCells: {
		value: false,
		setter: '_highlightCells',
		validator: Y.Lang.isBoolean
	}
};


datatableHighlight.prototype = {
    _cellsHighlightedCSS: 'yui3-datatable-cells-highlighted',
    _colsHighlightedCSS: 'yui3-datatable-cols-highlighted',
    _rowsHighlightedCSS: 'yui3-datatable-rows-highlighted',
    
    //append the column id to this
    _colSelector: '.yui3-datatable-data .yui3-datatable-col-',
   
    _colNameRegex: /yui3-datatable-col-(\S*)/,
   
	_currentRowsDelegate: null,
    _currentColsDelegate: null,
    _currentCellsDelegate: null,

	_highlightRows: function (highlightingRows) {
		if (highlightingRows) {
            if (this._currentRowsDelegate) {
                this._currentRowsDelegate.detach();
            }
            
			this._currentRowsDelegate = this.delegate('hover', 
                Y.bind(this._highlightRowsOn, this), 
                Y.bind(this._highlightRowsOff, this),
            "tr");
		}
	},

	_highlightCols: function (highlightingCols) {
		if (highlightingCols) {
            if (this._currentColsDelegate) {
                this._currentColsDelegate.detach();
            }

            this._currentColsDelegate = this.delegate('hover', 
                Y.bind(this._highlightColsOn, this),
                Y.bind(this._highlightColsOff, this),
            "tr td");
		}
	},

	_highlightCells: function (highlightingCells) {
		if (highlightingCells) {
            if (this._currentCellsDelegate) {
                this._currentCellsDelegate.detach();
            }

			this._currentCellsDelegate = this.delegate('hover', 
                Y.bind(this._highlightCellsOn, this), 
                Y.bind(this._highlightCellsOff, this),
            "tr td");
		}
	},

    _highlightCellsOn: function(e) {
        e.currentTarget.addClass(this._cellsHighlightedCSS);
    },
    
    _highlightCellsOff: function(e) {
	    e.currentTarget.removeClass(this._cellsHighlightedCSS);
    },

    _highlightColsOn: function(e) {
        var colName = this._colNameRegex.exec(e.currentTarget.getAttribute('class')),
            selector = this._colSelector + colName[1];

        this.view.tableNode.all(selector).addClass(this._colsHighlightedCSS);
    },
    
    _highlightColsOff: function(e) {
        var colName = this._colNameRegex.exec(e.currentTarget.getAttribute('class')),
            selector = this._colSelector + colName[1];

        this.view.tableNode.all(selector).removeClass(this._colsHighlightedCSS);
    },
    
    _highlightRowsOn: function(e) {
        e.currentTarget.all('td').addClass(this._rowsHighlightedCSS);
    },
    
    _highlightRowsOff: function(e) {
        e.currentTarget.all('td').removeClass(this._rowsHighlightedCSS);
    }
};

Y.DataTable.Highlight = datatableHighlight;

Y.Base.mix(Y.DataTable, [Y.DataTable.Highlight]);
