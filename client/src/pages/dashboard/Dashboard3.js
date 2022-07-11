import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

// import FormControl, { useFormControl } from '@mui/material/FormControl';
// import OutlinedInput from '@mui/material/OutlinedInput';

import '../../stylesheets/Dashboard3.css'



function Dashboard3() {
    return (
        <div>
        <br></br>
        <TableContainer align="center">
            
            <Table  sx={{ minWidth: 800, maxWidth: 1200}} aria-label="simple table">
            <h1 id="blockcontainer" align="center">Create Group</h1>
            <TableBody >

                <TableRow>
                    <TableCell align="center" component="th" scope="row">
                    <form>
                        <input id="inputboxsize3" name="groupName" type="text" maxlength="20" placeholder="Group Name"></input>
                        <br></br>
                        <br></br>
                        <input id="inputboxsize3" name="groupDescription" type="text" maxlength="50" placeholder="Description"></input>
                        <br></br>
                        <br></br>
                        <Button size="medium" variant="contained" >Submit</Button>
                    </form>
                    <br></br>
                </TableCell>
                </TableRow>
        
            </TableBody>
            </Table>
        </TableContainer>

      </div>
    )
}

export default Dashboard3;