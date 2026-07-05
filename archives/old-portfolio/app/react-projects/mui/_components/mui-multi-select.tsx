// "use client";
// import { PageBody } from "../../custom";
// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";
// import { top100Films } from "./_components/MaterialUI_Data";
// import { useEffect, useRef, useState } from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";

// type OptionsType = {
//   label: string;
//   year: number;
// };

// const localStorageKey = "materialUI_multiSelect";
// function Main() {
//   const [selectedOptions, setSelectedOptions] = useState<OptionsType[]>([]);
//   const initialRender = useRef(true);

//   useEffect(() => {
//     if (!initialRender.current) {
//       // check the selectedOptions in browser console
//       console.table(selectedOptions);
//       localStorage.setItem(localStorageKey, JSON.stringify(selectedOptions));
//     }
//   }, [selectedOptions]);

//   useEffect(() => {
//     if (initialRender.current) {
//       const data = localStorage.getItem(localStorageKey);
//       if (data) {
//         setSelectedOptions(JSON.parse(data));
//       }
//       initialRender.current = false;
//     }
//   }, []);

//   return (
//     <PageBody PageTitle="Material UI">
//       <div className="px-5">
//         <h6 className="text-lg">Multi Select</h6>
//         <div className="flex flex-col gap-5 mt-5 md:flex-row">
//           <Box
//             sx={{
//               background: "#fff",
//               padding: "1.5rem 1rem",
//               borderRadius: "0.3rem",
//             }}
//           >
//             <Typography
//               variant="h6"
//               component="h3"
//               sx={{ marginBottom: "0.5rem" }}
//             >
//               Select your fav movies.
//             </Typography>
//             <Autocomplete
//               multiple
//               disablePortal
//               limitTags={2}
//               id="combo-box-demo"
//               options={top100Films}
//               sx={{ width: 300 }}
//               disableCloseOnSelect
//               value={selectedOptions}
//               isOptionEqualToValue={(option, value) => {
//                 if (option.label === value.label) {
//                   return true;
//                 }
//                 return false;
//               }}
//               getOptionLabel={(option) => option.label}
//               // Don't remove event -> Massive error
//               onChange={(event: any, newValue: any | null) => {
//                 setSelectedOptions(newValue);
//               }}
//               renderInput={(params) => <TextField {...params} />}
//             />
//           </Box>
//           <div>
//             <TableContainer component={Paper} sx={{ width: 300 }}>
//               <Table
//                 sx={{ width: 300, cursor: "default" }}
//                 aria-label="simple table"
//               >
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Label</TableCell>
//                     <TableCell align="right">Year</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {selectedOptions.map((row) => (
//                     <TableRow
//                       key={row.label}
//                       sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                     >
//                       <TableCell component="th" scope="row">
//                         {row.label}
//                       </TableCell>
//                       <TableCell align="right">{row.year}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </div>
//         </div>
//       </div>
//     </PageBody>
//   );
// }

// export default Main;
