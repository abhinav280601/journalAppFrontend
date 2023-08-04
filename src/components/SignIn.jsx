import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container,
  Typography,
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  submitBut: {
    width: "50%",
    height: "7vh",
  },
  role: {
    width: "100%",
    height: "7vh",
  },
}));

const SignInPage = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [role, setRole] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
      role,
    };
    try {
      await fetch("https://journalapptest.onrender.com/auth/login" + role, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((data) => {
              setErrorMessage(data.message);
              throw new Error(data.message);
            });
          }
          return response.json();
        })
        .then((data) => {
          localStorage.setItem("accesstoken", data.token);
          localStorage.setItem("role", data.role);
          console.log("Login successful!");
          if (role === "Teacher") navigate("/TeacherHome");
          else navigate("/StudentHome");
        });
    } catch (error) {
      console.error("Error Loging In:", error);
    }
  };
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.container}>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="username"
            name="username"
            autoComplete="username"
            autoFocus
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
            autoComplete="current-password"
          />
          <div className={classes.submit}>
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
              onClick={() => navigate("/")}
            >
              Sign Up
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={(classes.submit, classes.submitBut)}
            >
              Sign In
            </Button>
          </div>
          {errorMessage && (
            <Typography style={{ color: "red" }} component="h3" variant="h5">
              {errorMessage}
            </Typography>
          )}
        </form>
      </div>
    </Container>
  );
};

export default SignInPage;
