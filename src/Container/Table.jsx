import { Table, TableBody, TableRow, TableCell } from "@mui/material";

const CustomTable = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Table
                sx={{
                    width: {
                        xs: '90%', // Width for mobile
                        sm: '80%', // Width for small screens
                        md: '50%', // Width for medium screens
                    },
                    border: "2px solid white",
                    backgroundColor: "rgba(71, 70, 70, 0.38)",
                }}
            >
                <TableBody>
                    <TableRow>
                        <TableCell sx={{color: 'white', borderRight: "1px solid white", fontSize: {
                            xs: '1rem', // Font size for mobile
                            sm: '1.5rem', // Font size for small screens
                        }}}>Weekday Camp</TableCell>
                        <TableCell sx={{color: 'white', borderRight: "1px solid white", fontSize: {
                            xs: '1rem', // Font size for mobile
                            sm: '1.5rem', // Font size for small screens
                        }}}>Monday - Friday <br /> 3pm - 6pm</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{color: 'white', borderRight: "1px solid white", fontSize: {
                            xs: '1rem', // Font size for mobile
                            sm: '1.5rem', // Font size for small screens
                        }}}>Weekend Camp</TableCell>
                        <TableCell sx={{color: 'white', borderRight: "1px solid white", fontSize: {
                            xs: '1rem', // Font size for mobile
                            sm: '1.5rem', // Font size for small screens
                        }}}>Saturday : 3pm - 6pm <br /> Sunday : 6am - 9am</TableCell>
                    </TableRow>                    
                </TableBody>
            </Table>
        </div>
    )
}

export default CustomTable;