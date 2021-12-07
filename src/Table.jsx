import React, { Component } from "react";
import TableRow from "./TableRow";
import PropTypes from 'prop-types';

class Table extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        const w = Math.floor(100 / Object.keys(this.props.data[0]).length);

        return (
            <div>
                {
                    this.props.data.length == 0 ?
                        <p>No data available</p>
                        : <table style={{ border: "1px solid grey" }}>
                            <thead>
                                <tr>
                                    <th style={{ width: `${w}%`, border: "1px solid grey" }}>
                                        <input type="checkbox" checked={this.props.checkAll} onChange={(e) => this.props.handleSelectAll(e)} />
                                    </th>
                                    {

                                        Object.keys(this.props.data[0]).map(d => {

                                            if (d != "checked") {
                                                return <th style={{ width: `${w}%`, border: "1px solid grey" }}>{d}</th>
                                            }

                                        })
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.data.map(dObject => <TableRow data={dObject} handleChange={(e, data) => this.props.handleRowClick(e, data)} />)
                                }
                            </tbody>
                        </table>
                }
            </div>
        )
    }
}

Table.prototypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleRowClick: PropTypes.func.isRequired

}

export default Table

