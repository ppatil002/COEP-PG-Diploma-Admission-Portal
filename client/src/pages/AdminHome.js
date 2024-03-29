import { React, useState, useRef, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import NavBar from "../components/Navbar/Navbar";
import { useForm, Form } from "./Form";
import { Navigate, useNavigate } from "react-router-dom";
import Input from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import HomeIcon from '@mui/icons-material/Home';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LogoutIcon from '@mui/icons-material/Logout';
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { useLocation } from "react-router-dom";
import {
  Paper,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableContainer,
  TextField,
} from "@material-ui/core";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  renderText,
  renderButton,
  renderInputText,
  renderText1,
  renderMultiInputText,
  renderInputSelect,
  renderDate,
  RenderDate,
  MultipleSelect,
  renderInputTextDisabled,
} from "../components/common/displayComponents";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { toPng } from 'html-to-image';
import Header from "../components/Header";

const theme = createTheme();
const drawerWidth = 280;

const exportToExcel = () => {
  const url = BACKEND_URL + "/student/allStudentData";
  const excel_data = [];
  const XLSX = require("xlsx");
  axios.get(url).then((res) => {
    let student_data = res.data;
    // console.log(student_data);
    student_data.forEach((student) => {
      let course = "";
      let lastName = "";
      let firstName = "";
      if (student.personalInfo.course) {
        course = student.personalInfo.course;
      }
      if (student.personalInfo.lastName) {
        lastName = student.personalInfo.lastName;
      }

      if (student.personalInfo.firstName) {
        firstName = student.personalInfo.firstName;
      }

    //   console.log(course, lastName, firstName);

      excel_data.push({
        course,
        lastName,
        firstName,
      });
    });
    // console.log(excel_data);

    const XLSX = require("xlsx");
    const workSheet = XLSX.utils.json_to_sheet(excel_data);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Students Data");
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "Students Data.xlsx");
  });
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#01257D",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: "#FFFFFF",
  },
  '&:nth-of-type(even)': {
    backgroundColor: "#D3D3D3",
  },
  // hide last border
  // '&:last-child td, &:last-child th': {
  //   border: 0,
  // },
}));

export default function AdminHome() {
  const location = useLocation();
  const navigate = useNavigate();
  const { window } = location.state;
  const [mobileOpen, setMobileOpen] = useState(false);

  const [pgderp, setPgderp] = useState({})

  const [pgdipdd, setPgdipdd] = useState({})

  const [pgddsai, setPgddsai] = useState({})

  const [pgdesiot, setPgdesiot] = useState({})

  const [pgdem, setPgdem] = useState({})

  const [pgdia, setPgdia] = useState({})

  const [total, setTotal] = useState({})

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div style={{ backgroundColor: "#FFFFE0", minHeight: "100vh" }}>
      <Toolbar />
      <List>
        {location.state.options &&
          Object.keys(location.state.options).map((text, index) => (
            <ListItem key={text}>
              <ListItemButton
                onClick={() =>
                  navigate(location.state.options[text], {
                    state: {
                      options: location.state.options,
                    },
                  })
                }
              >
                <ListItemIcon>
                {index === 0 && (
                  <HomeIcon />
                )}
                {
                  index === 1 && (
                    <AppRegistrationIcon />
                  )
                }
                {
                  index === 2 && (
                    <DownloadIcon />
                  )
                }
                {
                  index === 3 && (
                    <AccountBalanceIcon />
                  )
                }
                {
                  index === 4 && (
                    <LogoutIcon />
                  )
                }
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const registerCoordinator = () => {
    navigate("/admin/registerCoord");
  };

  const wholeData = () => {
    navigate("/admin/grid")
  }

  const elementRef = useRef(null);

  const htmlToImageConvert = () => {
    toPng(elementRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        const date = new Date();
        let currentDay= String(date.getDate()).padStart(2, '0');
        let currentMonth = String(date.getMonth()+1).padStart(2,"0");
        let currentYear = date.getFullYear();

        // we will display the date as DD-MM-YYYY 

        let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
        link.download = "stats" + currentDate + ".png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {

    const url = BACKEND_URL + "/admin/allStudentDetails";
    axios 
      .get(url, {
        headers: {
          "pgderp-website-jwt": localStorage.getItem("pgderp-website-jwt"),
        }
      })
      .then((res) => {
        let students = res.data;
        let pgderpCopy = {"registered": 0, "filled" : 0, "feesPaid" : 0, "verified" : 0};
        let pgdiaCopy = {"registered": 0, "filled" : 0, "feesPaid" : 0, "verified" : 0};
        let pgdesiotCopy = {"registered": 0, "filled" : 0, "feesPaid" : 0, "verified" : 0};
        let pgdemCopy = {"registered": 0, "filled" : 0, "feesPaid" : 0, "verified" : 0};
        let pgddsaiCopy = {"registered": 0, "filled" : 0, "feesPaid" : 0, "verified" : 0};
        let pgdipddCopy = {"registered": 0, "filled" : 0, "feesPaid" : 0, "verified" : 0};
        let totalCopy = {"registered": 0, "filled" : 0, "feesPaid" : 0, "verified" : 0};

        Object.keys(students).map((student, index) => {
          if(students[student]["course"] == "PGDERP"){
            pgderpCopy["registered"] += 1;
            totalCopy["registered"] += 1;

            if(students[student]["applicationFilled"]){
              pgderpCopy["filled"] += 1;
              totalCopy["filled"] += 1;
            }

            if(students[student]["feesDetailsFilled"]){
              pgderpCopy["feesPaid"] += 1;
              totalCopy["feesPaid"] += 1;
            }

            if(students[student]["applicationVerified"]){
              pgderpCopy["verified"] += 1;
              totalCopy["verified"] += 1;
            }
          }

          else if(students[student]["course"] == "PGDIA"){
            pgdiaCopy["registered"] += 1;
            totalCopy["registered"] += 1;

            if(students[student]["applicationFilled"]){
              pgdiaCopy["filled"] += 1;
              totalCopy["filled"] += 1;
            }

            if(students[student]["feesDetailsFilled"]){
              pgdiaCopy["feesPaid"] += 1;
              totalCopy["feesPaid"] += 1;
            }

            if(students[student]["applicationVerified"]){
              pgdiaCopy["verified"] += 1;
              totalCopy["verified"] += 1;
            }
          }

          else if(students[student]["course"] == "PGDESIoT"){
            pgdesiotCopy["registered"] += 1;
            totalCopy["registered"] += 1;

            if(students[student]["applicationFilled"]){
              pgdesiotCopy["filled"] += 1;
              totalCopy["filled"] += 1;
            }

            if(students[student]["feesDetailsFilled"]){
              pgdesiotCopy["feesPaid"] += 1;
              totalCopy["feesPaid"] += 1;
            }

            if(students[student]["applicationVerified"]){
              pgdesiotCopy["verified"] += 1;
              totalCopy["verified"] += 1;
            }
          }

          else if(students[student]["course"] == "PGDEM"){
            pgdemCopy["registered"] += 1;
            totalCopy["registered"] += 1;

            if(students[student]["applicationFilled"]){
              pgdemCopy["filled"] += 1;
              totalCopy["filled"] += 1;
            }

            if(students[student]["feesDetailsFilled"]){
              pgdemCopy["feesPaid"] += 1;
              totalCopy["feesPaid"] += 1;
            }

            if(students[student]["applicationVerified"]){
              pgdemCopy["verified"] += 1;
              totalCopy["verified"] += 1;
            }
          }

          else if(students[student]["course"] == "PGDDSAI"){
            pgddsaiCopy["registered"] += 1;
            totalCopy["registered"] += 1;

            if(students[student]["applicationFilled"]){
              pgddsaiCopy["filled"] += 1;
              totalCopy["filled"] += 1;
            }

            if(students[student]["feesDetailsFilled"]){
              pgddsaiCopy["feesPaid"] += 1;
              totalCopy["feesPaid"] += 1;
            }

            if(students[student]["applicationVerified"]){
              pgddsaiCopy["verified"] += 1;
              totalCopy["verified"] += 1;
            }
          }

          else if(students[student]["course"] == "PGDIPDD"){
            pgdipddCopy["registered"] += 1;
            totalCopy["registered"] += 1;

            if(students[student]["applicationFilled"]){
              pgdipddCopy["filled"] += 1;
              totalCopy["filled"] += 1;
            }

            if(students[student]["feesDetailsFilled"]){
              pgdipddCopy["feesPaid"] += 1;
              totalCopy["feesPaid"] += 1;
            }

            if(students[student]["applicationVerified"]){
              pgdipddCopy["verified"] += 1;
              totalCopy["verified"] += 1;
            }
          }

        })

        setPgderp(pgderpCopy);
        setPgdipdd(pgdipddCopy);
        setPgdia(pgdiaCopy);
        setPgdesiot(pgdesiotCopy);
        setPgdem(pgdemCopy);
        setPgddsai(pgddsaiCopy);
        setTotal(totalCopy)
        //console.log(pgderpCopy, pgdipddCopy, pgdesiotCopy, pgdemCopy, pgddsaiCopy, pgdiaCopy)
      })
  }, [])

  //console.log(total, pgderp, pgdipdd)

  return (
    <Box bgcolor="#E5EDF1" sx={{ display: "flex", minHeight: "100vh" }}>
    <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#00ABE4",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            COEP PG - Diploma Admission Portal
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          bg
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      > <Toolbar />

      <Header />

        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography variant="h4" sx={{ paddingTop: "0.2%", paddingBottom: "0", margin: "auto", fontWeight: "200", marginBottom: "7px" }}>Admin Home</Typography>
        </Box>

        <Grid container rowSpacing={0.1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx = {{paddingLeft: "20px"}}>

          {
            total.registered === (pgderp.registered + pgdem.registered + pgdia.registered + pgddsai.registered + pgdipdd.registered + pgdesiot.registered) ? (

              <TableContainer sx={{ marginTop: "1%", paddingLeft: "2%", paddingTop: "0.1%" }}>
            <Table ref={elementRef} aria-label="customized table"sx={{ paddingLeft: "2%" }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center" wrap sx = {{background: "#1B9C85"}}>Course Name</TableCell>
                  <TableCell align="center" wrap sx = {{background: "#1B9C85"}}>Students Registered</TableCell>
                  <TableCell align="center" wrap sx = {{background: "#1B9C85"}}>Applications Submitted</TableCell>
                  <TableCell align="center" wrap sx = {{background: "#1B9C85"}}>Fees Paid</TableCell>
                  <TableCell align="center" wrap sx = {{background: "#1B9C85"}}>Students Verified</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                <StyledTableRow>
                  <StyledTableCell align="center">PGDERP</StyledTableCell>
                  <StyledTableCell align="center">{pgderp.registered}</StyledTableCell>
                  <StyledTableCell align="center">{pgderp.filled}</StyledTableCell>
                  <StyledTableCell align="center">{pgderp.feesPaid}</StyledTableCell>
                  <StyledTableCell align="center">{pgderp.verified}</StyledTableCell>
                </StyledTableRow>

                <StyledTableRow>
                  <StyledTableCell align="center">PGDIPDD</StyledTableCell>
                  <StyledTableCell align="center">{pgdipdd.registered}</StyledTableCell>
                  <StyledTableCell align="center">{pgdipdd.filled}</StyledTableCell>
                  <StyledTableCell align="center">{pgdipdd.feesPaid}</StyledTableCell>
                  <StyledTableCell align="center">{pgdipdd.verified}</StyledTableCell>
                </StyledTableRow>

                <StyledTableRow>
                  <StyledTableCell align="center">PGDDSAI</StyledTableCell>
                  <StyledTableCell align="center">{pgddsai.registered}</StyledTableCell>
                  <StyledTableCell align="center">{pgddsai.filled}</StyledTableCell>
                  <StyledTableCell align="center">{pgddsai.feesPaid}</StyledTableCell>
                  <StyledTableCell align="center">{pgddsai.verified}</StyledTableCell>
                </StyledTableRow>

                <StyledTableRow>
                  <StyledTableCell align="center">PGDESIot</StyledTableCell>
                  <StyledTableCell align="center">{pgdesiot.registered}</StyledTableCell>
                  <StyledTableCell align="center">{pgdesiot.filled}</StyledTableCell>
                  <StyledTableCell align="center">{pgdesiot.feesPaid}</StyledTableCell>
                  <StyledTableCell align="center">{pgdesiot.verified}</StyledTableCell>
                </StyledTableRow>

                <StyledTableRow>
                  <StyledTableCell align="center">PGDEM</StyledTableCell>
                  <StyledTableCell align="center">{pgdem.registered}</StyledTableCell>
                  <StyledTableCell align="center">{pgdem.filled}</StyledTableCell>
                  <StyledTableCell align="center">{pgdem.feesPaid}</StyledTableCell>
                  <StyledTableCell align="center">{pgdem.verified}</StyledTableCell>
                </StyledTableRow>

                <StyledTableRow>
                  <StyledTableCell align="center">PGDIA</StyledTableCell>
                  <StyledTableCell align="center">{pgdia.registered}</StyledTableCell>
                  <StyledTableCell align="center">{pgdia.filled}</StyledTableCell>
                  <StyledTableCell align="center">{pgdia.feesPaid}</StyledTableCell>
                  <StyledTableCell align="center">{pgdia.verified}</StyledTableCell>
                </StyledTableRow>

                <StyledTableRow>
                  <StyledTableCell align="center">TOTAL</StyledTableCell>
                  <StyledTableCell align="center">{total.registered}</StyledTableCell>
                  <StyledTableCell align="center">{total.filled}</StyledTableCell>
                  <StyledTableCell align="center">{total.feesPaid}</StyledTableCell>
                  <StyledTableCell align="center">{total.verified}</StyledTableCell>
                </StyledTableRow>

              </TableBody>
            </Table>
          </TableContainer>

            ) : (
              <Box display="flex" justifyContent="center" alignItems="center">
          <Typography variant="h4" sx={{ paddingTop: "0.2%", paddingBottom: "0", margin: "auto", fontWeight: "200", marginBottom: "15px" }}>Loading ...</Typography>
        </Box>
            )
          }
          </Grid>
      
          <Button
            variant="contained"
            onClick={() => htmlToImageConvert()}
            color="success"
            style={{ margin: "0 auto", display: "flex", marginTop: "1%" }}>
            DOWNLOAD IMAGE
          </Button>


      </Box>
    </Box>
      
   
  );
}
