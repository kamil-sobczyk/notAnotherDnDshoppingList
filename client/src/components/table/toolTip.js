import React from "react";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";

const TableToolTip = (row, index) => {
    return <Tooltip disableFocusListener title={row.chosenItems.join(", ")} placement="right" key={index}>
        <TableRow key={index}>
            <TableCell component="th" scope="row">
                {row.date}
            </TableCell>
            <TableCell align="right">{row.count + "zł"}</TableCell>
        </TableRow>
    </Tooltip>;
}

export default TableToolTip;