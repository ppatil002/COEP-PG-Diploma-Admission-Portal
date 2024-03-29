import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import AdminHome from "./pages/AdminHome";
import Home from "./pages/Home";
import CoordinatorRegister from "./pages/CoordinatorRegister";
import Coordinator from "./components/Coordinator/coordinator";
import CoordinatorLogin from "./pages/CoordinatorLogin";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import { roles } from "./adminDetails";
import axios from "axios";
import ProtectedRoute from "./protectedRoute";
import StudentHome from "./pages/StudentHome";
import { OtpScript } from "./components/common/otpScript";
import Docs from "./components/steps/docs";
import DocViewer from "./pages/DocViewer";
import Step4 from "./components/steps/Step4";
import Application from "./components/Coordinator/application";
import ResponsiveStudentHome from "./components/ResposiveDrawer";
import PersonalInfo from "./pages/personalInfo";
import AcademicsInfo from "./pages/academicsInfo";
import ProfessionalExperience from "./pages/ProfessionalExperience";
import Documents from "./pages/Documents";
import Download from "./pages/downloadApplication";
import Prerequisites from "./pages/prerequisites";
import CoordinatorDownload from "./components/Coordinator/coordinatorDownload";
import CoordinatorIndividual from "./components/Coordinator/coordinatorIndividual";
import IndiStudent from "./components/Coordinator/indiStudent";
import FeesDetails from "./pages/fees";
import GridAdmin from "./pages/Grid";
import FeesDetailsAdmin from "./pages/FeesDetailsAdmin";
import LandingPage from "./pages/LandingPage";
import WebsiteMaintenance from "./pages/websiteMaintenance";
import Page404 from "./pages/404";
function setToken() {
  const token = localStorage.getItem("pgderp-website-jwt");
  if (token) {
    axios.defaults.headers.common["pgderp-website-jwt"] = "";
    axios.defaults.headers.common["pgderp-website-jwt"] = token;
  } else {
    axios.defaults.headers.common["pgderp-website-jwt"] = null;
    /*if setting null does not remove `Authorization` header then try     
        delete axios.defaults.headers.common['Authorization'];
      */
  }
}
setToken();

function App() {
  return (
    <Router>
      <Routes>

        {/* maintenance */}
        {/* <Route path = "/" exact element={<WebsiteMaintenance />} />
        <Route
          path="*"
          element={<Navigate to="/" replace={true} />}
        />
        */}

        {/* <Route path="/" exact element={<LandingPage />}></Route> */}

        <Route path="/"  exact element={<Page404 />}></Route>

        <Route
          path="*"
          element={<Navigate to="/" replace={true} />}
        />
        <Route path="/student/login" element={<UserLogin />} exact></Route>
        <Route path="/student/register" element={<UserRegister />}></Route>
        
        <Route
          path="/student/home"
          element={
            <ProtectedRoute allowedRoles={[roles.student]}>
              <ResponsiveStudentHome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/personalInfo"
          element={
            <ProtectedRoute allowedRoles={[roles.student]}>
              <PersonalInfo />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/academicsInfo"
          element={
            <ProtectedRoute allowedRoles={[roles.student]}>
              <AcademicsInfo />
            </ProtectedRoute>
          }
        />

<Route
          path="/student/fees"
          element={
            <ProtectedRoute allowedRoles={[roles.student]}>
              <FeesDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/professionalExperience"
          element={
            <ProtectedRoute allowedRoles={[roles.student]}>
              <ProfessionalExperience />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/documents"
          element={
            <ProtectedRoute allowedRoles={[roles.student]}>
              <Documents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/download"
          element={
            <ProtectedRoute allowedRoles={[roles.student]}>
              <Download />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/prerequisites"
          element={
            <ProtectedRoute allowedRoles={[roles.student]}>
              <Prerequisites />
            </ProtectedRoute>
          }
        />

        <Route path="/admin/loginefirihig67894536dyey" element={<AdminLogin />} exact></Route>
        <Route
          path="/admin/home"
          element={
            <ProtectedRoute allowedRoles={[roles.admin]}>
              <AdminHome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/coordinator"
          element={
            <ProtectedRoute allowedRoles={[roles.coordinator]}>
              <Coordinator />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/coordinator/:id"
          element={
            <ProtectedRoute allowedRoles={[roles.coordinator]}>
              <Application />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/coordinator/login767984rgykeyenc678"
          element={<CoordinatorLogin />}
          exact
        ></Route>
        <Route
          path="/coordinator/list"
          element={
            <ProtectedRoute allowedRoles={[roles.coordinator]}>
              <CoordinatorDownload />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/coordinator/download"
          element={
            <ProtectedRoute allowedRoles={[roles.coordinator]}>
              <CoordinatorIndividual />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/coordinator/get"
          element={
            <ProtectedRoute allowedRoles={[roles.coordinator]}>
              <IndiStudent />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/admin/registerCoord"
          element={
            <ProtectedRoute allowedRoles={[roles.admin]}>
              <CoordinatorRegister />
            </ProtectedRoute>
          }
        />
        <Route path="/otpscript" element={<OtpScript />}></Route>
        <Route
          path="/admin/grid"
          element={
            <ProtectedRoute allowedRoles={[roles.admin]}>
              <GridAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/feesDetails"
          element={
            <ProtectedRoute allowedRoles={[roles.admin]}>
              <FeesDetailsAdmin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
