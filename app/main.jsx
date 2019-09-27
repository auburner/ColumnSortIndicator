import React from 'react';
import ReactDOM from 'react-dom';

import { Grid, GridColumn, GridCellProps, GridCell, GridEditCell, GridToolbar, GridDetailRow, GridNoRecords, GridColumnMenuSort, GridColumnMenuFilter } from '@progress/kendo-react-grid'
import '@progress/kendo-react-intl'
import '@progress/kendo-react-dateinputs'
import '@progress/kendo-react-animation'
import { process } from '@progress/kendo-data-query'
import '@progress/kendo-react-popup'
import '@progress/kendo-react-inputs'
import '@progress/kendo-react-buttons'
import '@progress/kendo-react-dropdowns'
import { GridPDFExport, PDFExport, savePDF } from '@progress/kendo-react-pdf'
import '@progress/kendo-react-excel-export'
import '@progress/kendo-drawing'
import '@progress/kendo-react-dialogs'
import '@progress/kendo-react-layout'

const products = [{
    "ProductID" : 1,
    "ProductName" : "Chai",
    "UnitPrice" : 18.0000,
    "Discontinued" : false
}];

class ColumnMenu extends React.Component {
    render() {
        return (
        <div>
            <GridColumnMenuSort {...this.props} />
            <GridColumnMenuFilter {...this.props} />
        </div>
);
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.createDataState({
            take: 8,
            skip: 0
        });
    }

    createDataState(dataState) {
        return {
            result: process(products.slice(0), dataState),
            dataState: dataState
        };
    }

    dataStateChange = (event) => {
        this.setState(this.createDataState(event.data));
    }

    columnProps(field) {
        return {
            field: field,
            columnMenu: ColumnMenu,
            headerClassName: this.isColumnActive(field, this.state.dataState) ? 'active' : ''
        };
    }

    isColumnActive(field, dataState) {
        return GridColumnMenuFilter.active(field, dataState.filter) ||
                GridColumnMenuSort.active(field, dataState.sort);
    }

    render() {
        return (<Grid
            data={this.state.result}
            {...this.state.dataState}
            onDataStateChange={this.dataStateChange}
            sortable={true}
            pageable={true}
            pageSize={8}
        >
            <GridColumn {...this.columnProps('ProductID')} filter={'numeric'} />
            <GridColumn {...this.columnProps('ProductName')} />
            <GridColumn {...this.columnProps('UnitPrice')} filter={'numeric'} />
            <GridColumn {...this.columnProps('Discontinued')} filter={'boolean'} />
        </Grid>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('my-app'));

