import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

// A mock service to fetch and update the profile data from the backend
const profileService = {
  getProfile: () => {
    // TODO: replace this with a real service call
    console.log("Getting profile");
    return Promise.resolve({
      name: "John Doe",
      email: "johndoe@example.com",
      division: "MA2",
      team: "Team Awesome",
      status: "Active",
    });
  },
  updateProfile: (name: string, email: string, division: string) => {
    // TODO: replace this with a real service call
    console.log("Updating profile with", name, email, division);
    return Promise.resolve({ success: true });
  },
};

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [division, setDivision] = useState("");
  const [team, setTeam] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the profile data when the component mounts
    setLoading(true);
    setError("");
    profileService
      .getProfile()
      .then((res) => {
        setLoading(false);
        // Set the state with the profile data
        setName(res.name);
        setEmail(res.email);
        setDivision(res.division);
        setTeam(res.team);
        setStatus(res.status);
      })
      .catch((err) => {
        setLoading(false);
        // Show an error message
        setError(err.message || "Something went wrong");
      });
  }, []);

  const handleEdit = () => {
    // Update the profile data with the service
    setLoading(true);
    setError("");
    profileService
      .updateProfile(name, email, division)
      .then((res) => {
        setLoading(false);
        if (res.success) {
          // Show a success message
          setError("Profile updated successfully");
        } else {
          // Show an error message
          setError("Something went wrong");
        }
      })
      .catch((err) => {
        setLoading(false);
        // Show an error message
        setError(err.message || "Something went wrong");
      });
  };

  const handleCreateTeam = () => {
    // Redirect to the team form page
    navigate("/team/create");
  };

  const handleJoinTeam = () => {
    // Redirect to the team list page
    navigate("/team/join");
  };

  const handleLeaveTeam = () => {
    // TODO: implement this function to leave the current team
    console.log("Leaving team");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", margin: 2 }}>
      <Card sx={{ maxWidth: 500 }}>
        <CardHeader title="Profile" />
        <CardContent>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            Name:
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            Email:
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            Division:
          </Typography>
          <Select
            value={division}
            onChange={(e) => setDivision(e.target.value as string)}
            sx={{ marginBottom: 2 }}
          >
            <MenuItem value="MA1">MA1</MenuItem>
            <MenuItem value="MA2">MA2</MenuItem>
            <MenuItem value="MA3">MA3</MenuItem>
            <MenuItem value="MA4">MA4</MenuItem>
          </Select>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            Team:
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            {team || "None"}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            Status:
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            {status}
          </Typography>
          {error && (
            <Typography color="error" sx={{ marginBottom: 2 }}>
              {error}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEdit}
            disabled={loading}
          >
            Edit
          </Button>
          {team ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLeaveTeam}
            >
              Leave Team
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCreateTeam}
              >
                Create Team
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleJoinTeam}
              >
                Join Team
              </Button>
            </>
          )}
        </CardActions>
      </Card>
    </Box>
  );
};

export default Profile;
