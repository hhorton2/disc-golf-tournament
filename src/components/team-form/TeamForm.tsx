import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";

// A mock service to send and receive the team data from the backend
const teamService = {
  createTeam: (name: string, description: string, lookingForGroup: boolean) => {
    // TODO: replace this with a real service call
    console.log("Creating team with", name, description, lookingForGroup);
    return Promise.resolve({ success: true });
  },
  joinTeam: (teamId: string) => {
    // TODO: replace this with a real service call
    console.log("Joining team with id", teamId);
    return Promise.resolve({ success: true });
  },
  getTeam: (teamId: string) => {
    // TODO: replace this with a mock service call
    console.log("Getting team with id", teamId);
    return Promise.resolve({
      name: "Team Awesome",
      description: "We are awesome",
      lookingForGroup: true,
      members: [
        { name: "John Doe", division: "MA2" },
        { name: "Jane Doe", division: "MA3" },
      ],
    });
  },
};

const TeamForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [lookingForGroup, setLookingForGroup] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { teamId } = useParams();

  useEffect(() => {
    // If there is a teamId in the URL, fetch the team data and prefill the form
    if (teamId) {
      setLoading(true);
      setError("");
      teamService
        .getTeam(teamId)
        .then((res) => {
          setLoading(false);
          // Set the state with the team data
          setName(res.name);
          setDescription(res.description);
          setLookingForGroup(res.lookingForGroup);
        })
        .catch((err) => {
          setLoading(false);
          // Show an error message
          setError(err.message || "Something went wrong");
        });
    }
  }, [teamId]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (teamId) {
      // Join the existing team with the service
      teamService
        .joinTeam(teamId)
        .then((res) => {
          setLoading(false);
          if (res.success) {
            // Redirect to the profile page
            navigate("/profile");
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
    } else {
      // Create a new team with the service
      teamService
        .createTeam(name, description, lookingForGroup)
        .then((res) => {
          setLoading(false);
          if (res.success) {
            // Redirect to the profile page
            navigate("/profile");
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
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", margin: 2 }}>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel htmlFor="name">Team Name</InputLabel>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={!!teamId}
          />
        </FormControl>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel htmlFor="description">Team Description</InputLabel>
          <Input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            disabled={!!teamId}
          />
        </FormControl>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={lookingForGroup}
                onChange={(e) => setLookingForGroup(e.target.checked)}
                disabled={!!teamId}
              />
            }
            label="Looking for group"
          />
          <FormHelperText>
            Check this if you want other players to join your team
          </FormHelperText>
        </FormControl>
        {error && (
          <Typography color="error" sx={{ marginBottom: 2 }}>
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
          sx={{ marginBottom: 2 }}
        >
          {teamId ? "Join Team" : "Create Team"}
        </Button>
      </form>
    </Box>
  );
};

export default TeamForm;
