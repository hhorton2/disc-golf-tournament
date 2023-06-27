import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

// A mock service to send the sign up data to the backend
const signUpService = (
  name: string,
  email: string,
  password: string,
  division: string
) => {
  // TODO: replace this with a real service call
  console.log("Signing up with", name, email, password, division);
  return Promise.resolve({ success: true });
};

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [division, setDivision] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    signUpService(name, email, password, division)
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
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormControl>
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
        <FormControl fullWidth sx={{ marginBottom: 2, marginTop: 2 }}>
          <InputLabel htmlFor="division">Division</InputLabel>
          <Select
            id="division"
            value={division}
            onChange={(e) => setDivision(e.target.value as string)}
            required
          >
            <MenuItem value="MA1">MA1</MenuItem>
            <MenuItem value="MA2">MA2</MenuItem>
            <MenuItem value="MA3">MA3</MenuItem>
            <MenuItem value="MA4">MA4</MenuItem>
          </Select>
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
          Sign Up
        </Button>
      </form>
      <Typography variant="body2">
        Already have an account?{" "}
        <Link to="/login" style={{ textDecoration: "none" }}>
          Log In
        </Link>
      </Typography>
    </Box>
  );
};

export default SignUpForm;
