import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Typography,
} from "@mui/material";

// A mock service to fetch the team data from the backend
const teamService = {
  getTeams: () => {
    // TODO: replace this with a real service call
    console.log("Getting teams");
    return Promise.resolve([
      {
        id: "1",
        name: "Team Awesome",
        description: "We are awesome",
        lookingForGroup: true,
        members: [
          { name: "John Doe", division: "MA2" },
          { name: "Jane Doe", division: "MA3" },
        ],
      },
      {
        id: "2",
        name: "Team Cool",
        description: "We are cool",
        lookingForGroup: false,
        members: [
          { name: "Bob Smith", division: "MA1" },
          { name: "Alice Smith", division: "MA4" },
        ],
      },
    ]);
  },
};

const TeamList = () => {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch the team data when the component mounts
    setLoading(true);
    setError("");
    teamService
      .getTeams()
      .then((res: any) => {
        setLoading(false);
        // Set the state with the team data
        setTeams(res);
      })
      .catch((err) => {
        setLoading(false);
        // Show an error message
        setError(err.message || "Something went wrong");
      });
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 2,
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Teams
      </Typography>
      {/* TODO: add filters for division, looking for group, and name */}
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {teams.map((team: any) => (
          <Card key={team.id} sx={{ maxWidth: 300, margin: 2 }}>
            <CardHeader title={team.name} subheader={team.description} />
            <CardContent>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                Members:
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                {team.members.map((member: any) => (
                  <Chip
                    key={member.name}
                    label={`${member.name} (${member.division})`}
                    sx={{ margin: 0.5 }}
                  />
                ))}
              </Box>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={`/team/${team.id}`}
              >
                Join Team
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
      {error && (
        <Typography color="error" sx={{ marginBottom: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default TeamList;
