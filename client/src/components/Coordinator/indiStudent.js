import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
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
import Typography from "@mui/material/Typography";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CallIcon from '@mui/icons-material/Call';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableContainer,
  TextField
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
  renderInputTextDisabled
} from "../common/displayComponents";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import Button from "@mui/material/Button";
import e from "cors";
import { saveAs } from "file-saver";
import pic from "../images/header.jpg";

import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  pdf
} from "@react-pdf/renderer";

import HomeIcon from "@mui/icons-material/Home";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import LogoutIcon from "@mui/icons-material/Logout";
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import ArticleIcon from '@mui/icons-material/Article';

const drawerWidth = 280;

const styles = StyleSheet.create({
  body: {
    padding: 10
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row"
  },
  tableColHeader: {
    width: "100%",
    borderStyle: "solid",
    backgroundColor: "#BEBEBE",
    borderColor: "#bfbfbf",
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCol1: {
    width: "25%",
    borderStyle: "solid",
    backgroundColor: "#E8E8E8",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCol2: {
    width: "50%",
    borderStyle: "solid",
    backgroundColor: "#E8E8E8",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCol3: {
    width: "75%",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCellHeader: {
    margin: "auto",
    margin: 5,
    fontSize: 12,
    fontWeight: 500
  },
  tableCell: {
    margin: "auto",
    margin: 5,
    fontSize: 10
  },
  declareHead: {
    fontSize: 11,
    marginTop: 10
  },
  declare: {
    fontSize: 11
  },
  place: {
    fontSize: 11,
    marginTop: 25
  },
  date: {
    fontSize: 11,
    textAlign: "left"
  },
  sign: {
    fontSize: 11,
    textAlign: "right"
  },
  view: {
    width: "100%",
    padding: 0,
    marginBottom: 5,
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  photo: {
    width: "30%",
    height: "150px",
    padding: 0,
    marginBottom: 5,
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  signImg: {
    width: "20%",
    height: "100px",
    marginTop: 15,
    marginBottom: 5,
    marginLeft: "70%",
    backgroundColor: "white",
    display: "flex",
    alignItems: "right",
    justifyContent: "right"
  },
  declareHead: {
    fontSize: 11,
    marginTop: 5
  },
  declare: {
    fontSize: 11
  },
  place: {
    fontSize: 11,
    marginTop: 10
  },
  date: {
    fontSize: 11,
    textAlign: "left"
  },
  sign: {
    fontSize: 11,
    textAlign: "right",
    marginRight: "30px"
  }
});

function Download() {
  const queryParameters = new URLSearchParams(window.location.search)
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [personalData, setPersonalData] = React.useState([]);
  const [sign, setSign] = React.useState(null);
  const [photo, setPhoto] = React.useState(null);

  React.useEffect(() => {
    let url = BACKEND_URL + "/student/getAppData";
    axios
      .get(url, {params: {'userRole': 'coordinator', 'id': queryParameters.get("id")}})
      .then((res) => {
        setPersonalData(res.data.user);
        let contentType = "image/png";
        axios
          .get(BACKEND_URL + "/files/get/" + res.data.user.documents.sign, {
            responseType: "blob",
          })
          .then(function(response){
            const file = new Blob([response.data], { type: contentType });
            setSign(URL.createObjectURL(file));
          })
          axios
          .get(BACKEND_URL + "/files/get/" + res.data.user.documents.photo, {
            responseType: "blob",
          })
          .then(function(response){
            const file = new Blob([response.data], { type: contentType });
            setPhoto(URL.createObjectURL(file));
          })
      });
  }, []);
  const MyDoc = () => (
    <Document>
      <Page style={styles.body}>
        <View style={styles.view}>
          <Image style={styles.image} src={pic} alt="image" />
        </View>
        {
          photo && (
            <View style={styles.view}>
          <Image style={styles.photo} src={photo} alt="image" />
        </View>
          )
        }
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={{ ...styles.tableCellHeader, fontWeight: "600" }}>
                COEP PG Diploma Admission REGISTRATION ID :{" "}
                {personalData.registrationID}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Important Details</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Full Name</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{personalData.name}</Text>
            </View>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Email</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{personalData.email}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Mobile</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{personalData.mobile}</Text>
            </View>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Course</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{personalData.course}</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Personal Details</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Address</Text>
            </View>
            <View style={styles.tableCol3}>
              <Text style={styles.tableCell}>
                {personalData.personalInfo.Address}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Pincode</Text>
            </View>
            <View style={styles.tableCol3}>
              <Text style={styles.tableCell}>
                {personalData.personalInfo.Pincode}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Permanent Address</Text>
            </View>
            <View style={styles.tableCol3}>
              <Text style={styles.tableCell}>
                {personalData.personalInfo.permanentAddress}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Gender</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.personalInfo.gender}
              </Text>
            </View>

            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Physical Disability</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.personalInfo.phyDis}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Birth Date</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.personalInfo.dob[0] +
                  "-" +
                  personalData.personalInfo.dob[1] +
                  "-" +
                  personalData.personalInfo.dob[2]}
              </Text>
            </View>

            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Age</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.personalInfo.age}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Parent's Name</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.personalInfo.PHname}
              </Text>
            </View>

            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Parent's Email</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.personalInfo.PHemail}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Parent's Number</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.personalInfo.PHnumber}
              </Text>
            </View>

            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Caste</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.personalInfo.caste}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Domicile</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.personalInfo.domicileState}
              </Text>
            </View>

            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Nationality</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.personalInfo.nationality}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>SSC Details</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Institute SSC</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.academicsInfo.InstituteSSC}
              </Text>
            </View>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>SSC Marks</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.academicsInfo.SSCmarks}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>SSC From</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.academicsInfo.SSCFrom[0] +
                  "-" +
                  personalData.academicsInfo.SSCFrom[1] +
                  "-" +
                  personalData.academicsInfo.SSCFrom[2]}
              </Text>
            </View>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>SSC To</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.academicsInfo.SSCTo[0] +
                  "-" +
                  personalData.academicsInfo.SSCTo[1] +
                  "-" +
                  personalData.academicsInfo.SSCTo[2]}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>HSC Details</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Institute HSC</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.academicsInfo.InstituteHSC}
              </Text>
            </View>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>HSC Marks</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.academicsInfo.HSCmarks}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>HSC From</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.academicsInfo.HSCFrom[0] +
                  "-" +
                  personalData.academicsInfo.HSCFrom[1] +
                  "-" +
                  personalData.academicsInfo.HSCFrom[2]}
              </Text>
            </View>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>HSC To</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.academicsInfo.HSCTo[0] +
                  "-" +
                  personalData.academicsInfo.HSCTo[1] +
                  "-" +
                  personalData.academicsInfo.HSCTo[2]}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Diploma Details</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Institute Diploma</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.academicsInfo.InstituteDiploma}
              </Text>
            </View>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Diploma Marks</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.academicsInfo.Diplomamarks}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Diploma From</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.academicsInfo.DiplomaFrom[0] +
                  "-" +
                  personalData.academicsInfo.DiplomaFrom[1] +
                  "-" +
                  personalData.academicsInfo.DiplomaFrom[2]}
              </Text>
            </View>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Diploma To</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.academicsInfo.DiplomaTo[0] +
                  "-" +
                  personalData.academicsInfo.DiplomaTo[1] +
                  "-" +
                  personalData.academicsInfo.DiplomaTo[2]}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>SSC, HSC, Diploma Gaps</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>SSC-HSC Gap</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.academicsInfo.SSCtoHSC}
              </Text>
            </View>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>HSC-Diploma Gap</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.academicsInfo.HSCtoDiploma}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>SSC-Diploma Gap</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.academicsInfo.SSCtoDiploma}
              </Text>
            </View>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Total Gaps</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.academicsInfo.TotalGapsSchool}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Graduation Details</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Institute Graduation</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.academicsInfo.InstituteGrad}
              </Text>
            </View>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Specialization</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.academicsInfo.SpecializationGrad}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Graduation From</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.academicsInfo.GradFrom[0] +
                  "-" +
                  personalData.academicsInfo.GradFrom[1] +
                  "-" +
                  personalData.academicsInfo.GradFrom[2]}
              </Text>
            </View>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Graduation To</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.academicsInfo.GradTo[0] +
                  "-" +
                  personalData.academicsInfo.GradTo[1] +
                  "-" +
                  personalData.academicsInfo.GradTo[2]}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Final Year Marks</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.academicsInfo.FinalYearMarksGrad}
              </Text>
            </View>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Aggregate Marks</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.academicsInfo.AggregateMarksGrad}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>
                Post Graduation Details
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Institute PG</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.academicsInfo.InstitutePostGrad}
              </Text>
            </View>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Specialization</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.academicsInfo.SpecializationPostGrad}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>PG From</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.academicsInfo.PostGradFrom[0] +
                  "-" +
                  personalData.academicsInfo.PostGradFrom[1] +
                  "-" +
                  personalData.academicsInfo.PostGradFrom[2]}
              </Text>
            </View>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>PG To</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.academicsInfo.PostGradTo[0] +
                  "-" +
                  personalData.academicsInfo.PostGradTo[1] +
                  "-" +
                  personalData.academicsInfo.PostGradTo[2]}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Final Year Marks</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.academicsInfo.FinalYearMarksPostGrad}
              </Text>
            </View>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Aggregate Marks</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.academicsInfo.AggregateMarksPostGrad}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Graduation & Post Graduation Backlogs & Gaps</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Grad. Alive Backlogs</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.academicsInfo.AliveBacklogsGrad}
              </Text>
            </View>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Grad. Dead Backlogs</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.academicsInfo.DeadBacklogsGrad}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Post Grad. Alive Backlogs</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.academicsInfo.AliveBacklogsPostGrad}
              </Text>
            </View>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Post Grad. Dead Backlogs</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.academicsInfo.DeadBacklogsPostGrad}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Graduation Period</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.academicsInfo.GradPeriod}
              </Text>
            </View>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Grad-Post Grad Gap</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.academicsInfo.GradtoPostGrad}
              </Text>
            </View>
          </View>

          {Object.keys(personalData.academicsInfo.otherCourses).map(
            (row, index) => (
              <>
                <View style={styles.tableRow}>
                  <View style={styles.tableColHeader}>
                    <Text style={styles.tableCellHeader}>
                      Other Course - {index + 1}
                    </Text>
                  </View>
                </View>

                <View style={styles.tableRow}>
                  <View style={styles.tableCol1}>
                    <Text style={styles.tableCell}>Course Name</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {
                        personalData.academicsInfo.otherCourses[row][
                          "courseName"
                        ]
                      }
                    </Text>
                  </View>
                  <View style={styles.tableCol1}>
                    <Text style={styles.tableCell}>University Name</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {personalData.academicsInfo.otherCourses[row]["uniName"]}
                    </Text>
                  </View>
                </View>

                <View style={styles.tableRow}>
                  <View style={styles.tableCol1}>
                    <Text style={styles.tableCell}>Specialization</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {
                        personalData.academicsInfo.otherCourses[row][
                          "specialization"
                        ]
                      }
                    </Text>
                  </View>
                  <View style={styles.tableCol1}>
                    <Text style={styles.tableCell}>Grade</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {personalData.academicsInfo.otherCourses[row]["grade"]}
                    </Text>
                  </View>
                </View>

                <View style={styles.tableRow}>
                  <View style={styles.tableCol1}>
                    <Text style={styles.tableCell}>Period From</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {
                        personalData.academicsInfo.otherCourses[row][
                          "periodFrom"
                        ]
                      }
                    </Text>
                  </View>
                  <View style={styles.tableCol1}>
                    <Text style={styles.tableCell}>Period To</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {personalData.academicsInfo.otherCourses[row]["periodTo"]}
                    </Text>
                  </View>
                </View>
              </>
            )
          )}

          {Object.keys(personalData.professionalExperience).map(
            (row, index) => (
              <>
                <View style={styles.tableRow}>
                  <View style={styles.tableColHeader}>
                    <Text style={styles.tableCellHeader}>
                      Professional Experience - {index + 1}
                    </Text>
                  </View>
                </View>

                <View style={styles.tableRow}>
                  <View style={styles.tableCol1}>
                    <Text style={styles.tableCell}>Company Name</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {personalData.professionalExperience[row]["companyName"]}
                    </Text>
                  </View>
                  <View style={styles.tableCol1}>
                    <Text style={styles.tableCell}>Rank / Designation</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {
                        personalData.professionalExperience[row][
                          "rankDesignation"
                        ]
                      }
                    </Text>
                  </View>
                </View>

                <View style={styles.tableRow}>
                  <View style={styles.tableCol1}>
                    <Text style={styles.tableCell}>Period From</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {personalData.professionalExperience[row]["periodFrom"]}
                    </Text>
                  </View>
                  <View style={styles.tableCol1}>
                    <Text style={styles.tableCell}>Period To</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {personalData.professionalExperience[row]["periodTo"]}
                    </Text>
                  </View>
                </View>

                <View style={styles.tableRow}>
                  <View style={styles.tableCol1}>
                    <Text style={styles.tableCell}>Work Nature</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {personalData.professionalExperience[row]["workNature"]}
                    </Text>
                  </View>
                  <View style={styles.tableCol1}>
                    <Text style={styles.tableCell}>{""}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{""}</Text>
                  </View>
                </View>

                
              </>
            )
          )}

<View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>
                Fees Payment Details
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Bank Name</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.feesDetails.bank}
              </Text>
            </View>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Reference No</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.feesDetails.refNo}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Amount</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.feesDetails.amt}
              </Text>
            </View>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Payment Date</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {personalData.feesDetails.date[0] + "-" + personalData.feesDetails.date[1] + "-" + personalData.feesDetails.date[2]}
              </Text>
            </View>
          </View>
        </View>
        <Text style={styles.declareHead}>Declaration:</Text>
        <Text style={styles.declare}>
          I have read all the rules of admission and after understanding these
          rules, I have filled this application form for admission to PG Diploma Course
          in COEP Technological University for the academic year 2023-24. The
          information given by me in this application is true to the best of my
          knowledge and belief. At any later stage, if it is found that I have
          furnished wrong information and/or submitted false certificate(s), I
          am aware that my admission stands cancelled and fees paid by me will
          be forfeited. Further, I will be subject to legal and/or penal action
          as per the provisions of the law.
        </Text>
        {/* <Text style={styles.place}>Place :</Text>
        <Text style={styles.date}>Date :</Text> */}
        <View style={styles.view}>
          <Image style={styles.signImg} src={sign} alt="image" />
        </View>
        <Text style={styles.sign}>Signature of Candidate</Text>
      </Page>
    </Document>
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const options = [
    {
      "value": "Home",
      "icons": <HomeIcon />
    },
    {
      "value": "Logout",
      "icons": <LogoutIcon />
    },
    {
      "value": "Download Individual Applications",
      "icons": <DocumentScannerIcon />
    },
    {
      "value": "Download List",
      "icons": <ArticleIcon />
    }
  ];
  const changeStatus = (e) => {
    handleDrawerToggle();
    if (e.target.textContent === "Logout") {
      localStorage.clear();
      navigate("/");
    } else if (e.target.textContent === "Home"){
      navigate("/coordinator");
    }
    else if(e.target.textContent === "Download List"){
      navigate("/coordinator/list")
    }
    else if(e.target.textContent === "Download Individual Applications"){
      navigate("/coordinator/download")
    }
  };
  const drawer = (
    <div style={{backgroundColor:"#FFFFE0", minHeight:"100vh"}}>
      <Toolbar/>
      <List>
        {options && options.map((item, index) => (
          <ListItem key={item.value}>
            <ListItemButton onClick={changeStatus}>
              <ListItemIcon>
                {item.icons}
              </ListItemIcon>
              <ListItemText primary={item.value} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box bgcolor="#E5EDF1" sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#00ABE4"
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
          <Typography variant="h6" component="div" style={{padding: "5px"}}>
            COEP Technological University
            <br />
            PG - Diploma Admission Portal
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth
            }
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
              width: drawerWidth
            }
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
          width: { sm: `calc(100% - ${drawerWidth}px)` }
        }}
      >
        <Toolbar />
        <Paper component={Box} p={2}>
          <Grid container spacing={2} style={{ justifyContent: "center" }}>
            <Box mt={1} mb={2}>
              {renderText({ label: "Full Application Download" })}
            </Box>
          </Grid>
          {personalData["personalInfoFilled"] &&
          personalData["academicsInfoFilled"] &&
          personalData["professionalExperienceFilled"] &&
          personalData["documentsFilled"] && personalData["feesDetailsFilled"] && !photo && !sign  ? (
            <div>Loading ...</div>
          ) : (
          personalData["personalInfoFilled"] &&
          personalData["academicsInfoFilled"] &&
          personalData["professionalExperienceFilled"] &&
          personalData["documentsFilled"] && personalData["feesDetailsFilled"] && photo && sign ? (
            <PDFDownloadLink document={<MyDoc />} fileName={personalData.registrationID + ".pdf"}>
              <Button
                variant="contained"
                //   onClick={() => {
                //     if(){
                //         const blob = pdf(<MyDoc />).toBlob();
                //         saveAs(blob, `application.pdf`);
                //     }
                //   }}
                color="success"
                style={{ margin: "0 auto", display: "flex", marginTop: "3%" }}
              >
                DOWNLOAD APPLICATION
              </Button>
            </PDFDownloadLink>
          ) : (
            <div>Save all sections first</div>
          )

        )}
        </Paper>
      </Box>
      <AppBar position="fixed"  sx={{ top: 'auto', bottom: 0, backgroundColor:"#00ABE4", height:"7%" }}>
        <Toolbar>
        <Box sx={{ flexGrow: 0.4 }} />
        <IconButton color="inherit">
            <ArrowForwardIosIcon/>
          </IconButton>
          <Typography color="inherit">
            <a href="https://www.coep.org.in/content/postgraduatediplomaprogram" target="_blank" rel="noopener noreferrer">
          https://www.coep.org.in/content/postgraduatediplomaprogram
          </a>
          </Typography>
          <Box sx={{ flexGrow: 0.3 }} />
          <IconButton color="inherit">
            <MailIcon />
          </IconButton>
          <Typography color="inherit">
          pgdadmission@coeptech.ac.in
          </Typography>
        </Toolbar>
        
      </AppBar>
    </Box>
  );
}

export default Download;
