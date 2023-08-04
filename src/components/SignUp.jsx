import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(8),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    width: "30%",
    height: "7vh",
  },
  submitBut: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  formControl: {
    marginTop: theme.spacing(1),
    minWidth: 120,
  },
  role: {
    width: "100%",
    height: "7vh",
  },
}));

const SignUpPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const data = {
      username: formData.get("Username"),
      email: formData.get("email"),
      password: formData.get("password"),
      role,
    };
    try {
      const response = await fetch(
        "https://journalapptest.onrender.com/auth/register" + role,
        {
          method: "POST",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        console.error("Signup failed:", response.json().message);
        return;
      }
      console.log("Signup successful!");
      navigate("/SignIn");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.container}>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Username"
            label="Username"
            name="Username"
            autoComplete="Username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
          />
          <div className={classes.submitBut}>
            <FormControl variant="outlined">
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                className={classes.role}
                labelId="role-label"
                id="role"
                value={role}
                onChange={handleRoleChange}
                label="Role"
                required
              >
                <MenuItem value="Student">Student</MenuItem>
                <MenuItem value="Teacher">Teacher</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Button
              type="button"
              onClick={() => navigate("/SignIn")}
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default SignUpPage;
