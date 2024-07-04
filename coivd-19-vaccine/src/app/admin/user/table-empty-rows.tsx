import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

interface TableEmptyRowsProps {
    emptyRows?: number;
    height?: number;
}

const TableEmptyRows: React.FC<TableEmptyRowsProps> = ({ emptyRows, height }) => {
    if (!emptyRows) {
        return null;
    }

    return (
        <TableRow
            sx={{
                ...(height && {
                    height: height * emptyRows,
                }),
            }}
        >
            <TableCell colSpan={9} />
        </TableRow>
    );
};

TableEmptyRows.propTypes = {
    emptyRows: PropTypes.number,
    height: PropTypes.number,
};

export default TableEmptyRows;
