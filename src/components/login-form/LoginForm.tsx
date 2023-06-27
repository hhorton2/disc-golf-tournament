import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

// A mock service to send the log in data to the backend
const logInService = (email: string, password: string) => {
  // TODO: replace this with a real service call
  console.log("Logging in with", email, password);
  return Promise.resolve({ success: true });
};

const LogInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    logInService(email, password)
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
  };

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
        Log In
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormControl>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
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
          Log In
        </Button>
      </form>
      <Typography variant="body2">
        Don't have an account?{" "}
        <Link to="/signup" style={{ textDecoration: "none" }}>
          Sign Up
        </Link>
      </Typography>
    </Box>
  );
};

export default LogInForm;
