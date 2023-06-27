import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom"; // import Routes instead of Switch
import SignUpForm from "../sign-up-form/SignUpForm";
import LoginForm from "../login-form/LoginForm";
import Profile from "../profile/Profile";
import TeamForm from "../team-form/TeamForm";
import TeamList from "../team-list/TeamList";
import TeamDetail from "../team-detail/TeamDetail";

export default function Router() {
  return (
    <Container maxWidth="md" sx={{ marginTop: 10 }}>
      <Routes>
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/team/create" element={<TeamForm />} />
        <Route path="/team/list" element={<TeamList />} />
        <Route path="/team/:teamId" element={<TeamDetail />} />
      </Routes>
    </Container>
  );
}
