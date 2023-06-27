import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

// A mock service to fetch and update the team data from the backend
const teamService = {
  getTeam: (teamId: string) => {
    // TODO: replace this with a real service call
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
  invitePlayer: (teamId: string, playerId: string) => {
    // TODO: replace this with a real service call
    console.log("Inviting player with id", playerId, "to team with id", teamId);
    return Promise.resolve({ success: true });
  },
  applyToTeam: (teamId: string, playerId: string) => {
    // TODO: replace this with a real service call
    console.log(
      "Applying to team with id",
      teamId,
      "as player with id",
      playerId
    );
    return Promise.resolve({ success: true });
  },
  acceptPlayer: (teamId: string, playerId: string) => {
    // TODO: replace this with a real service call
    console.log(
      "Accepting player with id",
      playerId,
      "to team with id",
      teamId
    );
    return Promise.resolve({ success: true });
  },
  rejectPlayer: (teamId: string, playerId: string) => {
    // TODO: replace this with a real service call
    console.log(
      "Rejecting player with id",
      playerId,
      "from team with id",
      teamId
    );
    return Promise.resolve({ success: true });
  },
  leaveTeam: (teamId: string, playerId: string) => {
    // TODO: replace this with a real service call
    console.log("Leaving team with id", teamId, "as player with id", playerId);
    return Promise.resolve({ success: true });
  },
  getPlayers: () => {
    // TODO: replace this with a real service call
    console.log("Getting players");
    return Promise.resolve([
      { id: "1", name: "Bob Smith", division: "MA1" },
      { id: "2", name: "Alice Smith", division: "MA4" },
      { id: "3", name: "Tom Jones", division: "MA2" },
      { id: "4", name: "Mary Jones", division: "MA3" },
    ]);
  },
  getApplications: (teamId: string) => {
    // TODO: replace this with a real service call
    console.log("Getting applications for team with id", teamId);
    return Promise.resolve([
      { id: "1", player: { id: "3", name: "Tom Jones", division: "MA2" } },
      { id: "2", player: { id: "4", name: "Mary Jones", division: "MA3" } },
    ]);
  },
};
const profileService = {
  getProfile: () => {
    // TODO: replace this with a real service call
    console.log("Getting profile");
    return Promise.resolve({
      id: 1,
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
const TeamDetails = () => {
  const [players, setPlayers] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [isMember, setIsMember] = useState(false);
  const [myId, setMyId] = useState("");
  const [team, setTeam] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { teamId } = useParams();

  useEffect(() => {
    profileService.getProfile().then((res: any) => {
      // Set the state with your own id
      setMyId(res.id);
    });
  }, []);
  useEffect(() => {
    // Fetch the team data when the component mounts
    setLoading(true);
    setError("");
    teamService
      .getTeam(teamId!)
      .then((res: any) => {
        setLoading(false);
        // Set the state with the team data
        setTeam(res);
      })
      .catch((err) => {
        setLoading(false);
        // Show an error message
        setError(err.message || "Something went wrong");
      });
    teamService.getPlayers().then((res: any) => {
      // Set the state with the players data
      setPlayers(res);
    });
    teamService.getApplications(teamId!).then((res: any) => {
      // Set the state with the applications data
      setApplications(res);
    });
  }, [teamId]);

  const handleInvite = (playerId: string) => {
    // Invite a player to join the team with the service
    setLoading(true);
    setError("");
    teamService
      .invitePlayer(teamId!, playerId)
      .then((res: any) => {
        setLoading(false);
        if (res.success) {
          // Show a success message
          setError("Player invited successfully");
          // TODO: update the team state with the new invitation
        } else {
          // Show an error message
          setError(res.message || "Something went wrong");
        }
      })
      .catch((err) => {
        setLoading(false);
        // Show an error message
        setError(err.message || "Something went wrong");
      });
  };

  const handleApply = (playerId: string) => {
    // Apply to join the team with the service
    setLoading(true);
    setError("");
    teamService
      .applyToTeam(teamId!, playerId)
      .then((res: any) => {
        setLoading(false);
        if (res.success) {
          // Show a success message
          setError("Application sent successfully");
          // TODO: update the team state with the new application
        } else {
          // Show an error message
          setError(res.message || "Something went wrong");
        }
      })
      .catch((err) => {
        setLoading(false);
        // Show an error message
        setError(err.message || "Something went wrong");
      });
  };

  const handleAccept = (playerId: string) => {
    // Accept a player to join the team with the service
    setLoading(true);
    setError("");
    teamService
      .acceptPlayer(teamId!, playerId)
      .then((res: any) => {
        setLoading(false);
        if (res.success) {
          // Show a success
          setError("Player accepted successfully");
          // TODO: update the team state with the new member
        } else {
          // Show an error message
          setError(res.message || "Something went wrong");
        }
      })
      .catch((err) => {
        setLoading(false);
        // Show an error message
        setError(err.message || "Something went wrong");
      });
  };

  const handleReject = (playerId: string) => {
    // Reject a player from joining the team with the service
    setLoading(true);
    setError("");
    teamService
      .rejectPlayer(teamId!, playerId)
      .then((res: any) => {
        setLoading(false);
        if (res.success) {
          // Show a success message
          setError("Player rejected successfully");
          // TODO: update the team state with the removed invitation or application
        } else {
          // Show an error message
          setError(res.message || "Something went wrong");
        }
      })
      .catch((err) => {
        setLoading(false);
        // Show an error message
        setError(err.message || "Something went wrong");
      });
  };

  const handleLeave = (playerId: string) => {
    // Leave the team with the service
    setLoading(true);
    setError("");
    teamService
      .leaveTeam(teamId!, playerId)
      .then((res: any) => {
        setLoading(false);
        if (res.success) {
          // Show a success message
          setError("Team left successfully");
          // TODO: update the team state with the removed member
        } else {
          // Show an error message
          setError(res.message || "Something went wrong");
        }
      })
      .catch((err) => {
        setLoading(false);
        // Show an error message
        setError(err.message || "Something went wrong");
      });
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", margin: 2 }}>
      {team ? (
        <Card sx={{ maxWidth: 500 }}>
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
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              Invite players:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {players.map((player) => (
                <Button
                  key={player.id}
                  variant="outlined"
                  color="primary"
                  onClick={() => handleInvite(player.id)}
                  sx={{ margin: 0.5 }}
                >
                  {`${player.name} (${player.division})`}
                </Button>
              ))}
            </Box>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              Applications:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {applications.map((application) => (
                <Box key={application.player.id} sx={{ margin: 0.5 }}>
                  <Typography variant="body2">
                    {`${application.player.name} (${application.player.division})`}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAccept(application.player.id)}
                    sx={{ marginRight: 0.5 }}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleReject(application.player.id)}
                  >
                    Reject
                  </Button>
                </Box>
              ))}
            </Box>
            {/* TODO: add a list of invitations and applications to join the team */}
          </CardContent>
          <CardActions>
            {!isMember && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleApply(myId)}
              >
                Apply to join
              </Button>
            )}
            {/* TODO: add buttons to invite, apply, accept, reject, or leave the team */}
          </CardActions>
        </Card>
      ) : (
        <Typography variant="h6">Team not found</Typography>
      )}
      {error && (
        <Typography color="error" sx={{ marginBottom: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default TeamDetails;
