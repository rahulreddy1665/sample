import {
  Anchor,
  Button,
  Container,
  createStyles,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../../../assets/bg.png";
import { Check, X } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 880,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundImage: `url(${bg})`,
  },
}));
function Login() {
  let navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  useEffect(() => {
    if (isAuthenticated == "true") {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);
  const { classes } = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (event) => {
    showNotification({
      loading: true,
      id: "load-data",
      title: `Saving...`,
      message: "Waiting for response",
      autoclose: 5000,
      style: { borderRadius: 10 },
    });
    event.preventDefault();
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "auth/signin", {
        email: email,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("isAuthenticated", "true");
        navigate("/");
        updateNotification({
          id: "load-data",
          color: "teal",
          title: "Login Successfully",
          message: "Welcome Back :)",
          icon: <Check />,
        });
      })
      .catch((error) => {
        setError("Credentials doesn't match");
        setTimeout(() => {
          setError("");
        }, 6000);
        updateNotification({
          id: "load-data",
          color: "red",
          title: "Login Error",
          message: error.response.data.message,
          icon: <X />,
        });
      });
  };
  const registration = () => {
    navigate("/signup");
  };
  return (
    <div className={classes.wrapper}>
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{" "}
          <Anchor href="#" size="sm" onClick={registration}>
            Create accounts
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Text color="red" style={{ fontFamily: "cairo" }} mb={5}>
            {error}
          </Text>
          <TextInput
            label="Email"
            value={email}
            placeholder="example@viprabandhana.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <PasswordInput
            label="Password"
            value={password}
            placeholder="Your password"
            onChange={(e) => setPassword(e.target.value)}
            required
            mt="md"
          />
          {/* <Group position="apart" mt="md">
                        <Anchor onClick={(event) => event.preventDefault()} href="#" size="sm">
                            Forgot password?
                        </Anchor>
                    </Group> */}
          <Button
            fullWidth
            mt="xl"
            onClick={handleLogin}
            variant="gradient"
            gradient={{ from: "orange", to: "red" }}
          >
            Sign in
          </Button>
        </Paper>
      </Container>
    </div>
  );
}

export default Login;
