'use client'
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { users } from '../../../_mock/user';

import Iconify from '../../components/iconify';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

interface User {
    id: string;
    name: string;
    role: string;
    status: string;
    company: string;
    avatarUrl: string;
    isVerified: boolean;
}

const UserPage: React.FC = () => {
    const [page, setPage] = useState<number>(0);
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [selected, setSelected] = useState<string[]>([]);
    const [orderBy, setOrderBy] = useState<string>('name');
    const [filterName, setFilterName] = useState<string>('');
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);

    const handleSort = (event: React.MouseEvent<unknown>, id: string) => {
        const isAsc = orderBy === id && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(id);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = users.map((user) => user.name);
            setSelected(newSelecteds);
        } else {
            setSelected([]);
        }
    };

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = [...selected, name];
        } else if (selectedIndex === 0) {
            newSelected = selected.slice(1);
        } else if (selectedIndex === selected.length - 1) {
            newSelected = selected.slice(0, -1);
        } else if (selectedIndex > 0) {
            newSelected = [...selected.slice(0, selectedIndex), ...selected.slice(selectedIndex + 1)];
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterName(event.target.value);
        setPage(0);
    };

    const dataFiltered = applyFilter({
        inputData: users,
        comparator: getComparator(order, orderBy),
        filterName,
    });

    const notFound = !dataFiltered.length && !!filterName;

    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Users</Typography>
                <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
                    New User
                </Button>
            </Stack>

            <Card>
                <UserTableToolbar
                    numSelected={selected.length}
                    filterName={filterName}
                    onFilterName={handleFilterByName}
                />

                <TableContainer sx={{ overflow: 'unset' }}>
                    <Table sx={{ minWidth: 800 }}>
                        <UserTableHead
                            order={order}
                            orderBy={orderBy}
                            rowCount={users.length}
                            numSelected={selected.length}
                            onRequestSort={handleSort}
                            onSelectAllClick={handleSelectAllClick}
                            headLabel={[
                                { id: 'name', label: 'Name' },
                                { id: 'company', label: 'Company' },
                                { id: 'role', label: 'Role' },
                                { id: 'isVerified', label: 'Verified', align: 'center' },
                                { id: 'status', label: 'Status' },
                            ]}
                        />
                        <TableBody>
                            {dataFiltered
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row: User) => (
                                    <UserTableRow
                                        key={row.id}
                                        name={row.name}
                                        role={row.role}
                                        status={row.status}
                                        company={row.company}
                                        avatarUrl={row.avatarUrl}
                                        isVerified={row.isVerified}
                                        selected={selected.indexOf(row.name) !== -1}
                                        handleClick={(event) => handleClick(event, row.name)}
                                    />
                                ))}

                            <TableEmptyRows
                                height={77}
                                emptyRows={emptyRows(page, rowsPerPage, users.length)}
                            />

                            {notFound && <TableNoData query={filterName} />}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    page={page}
                    component="div"
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>
        </Container>
    );
};

export default UserPage;

