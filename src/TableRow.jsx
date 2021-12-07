import React from "react";

function TableRow(props) {

    const w = Math.floor(100 / Object.keys(props.data).length);

    return <tr>
        <td style={{ width: `${w}%`, textAlign: "center", border: "1px solid grey" }}>
            <input id={props.data["id"]} type="checkbox" value={props.data["id"]} checked={props.data["checked"]} onChange={(e) => props.handleChange(e, props.data)} />
        </td>
        {
            Object.keys(props.data).map(key => {

                let style = { width: `${w}%`, textAlign: "center", border: "1px solid grey" }

                if (typeof props.data[key] == "number") {
                    style = { width: `${w}%`, textAlign: "right", border: "1px solid grey", fontWeight: "bold" }
                }

                if (key != "checked") {
                    return <td style={style}>
                        {props.data[key]}
                    </td>
                }
                return null

            })
        }
    </tr>
}
export default TableRow
