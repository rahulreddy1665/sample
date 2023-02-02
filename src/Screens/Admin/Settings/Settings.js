import {
  Avatar,
  Box,
  Card,
  Center,
  Container,
  createStyles,
  Grid,
  Image,
  Text,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import {
  Affiliate,
  ArrowRampRight,
  Book2,
  Confetti,
  Diamond,
  School,
  Stars,
  User,
  UserCircle,
  ZodiacCancer,
} from "tabler-icons-react";
import "../../../App.css";
import Batman from "../../../assets/Batman.png";
import BreadCrumb from "../../../Components/Admin/BreadCrumbs/Breadcrumbs";
import axios from "axios";

const useStyles = createStyles((theme) => ({
  Box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  Card: {
    marginTop: 10,
    borderRadius: 8,
    height: "auto",
    cursor: "pointer",
    "&:hover": {
      borderColor: "#FF9248",
      color: "#FF9248",
      transition: "ease-in",
      transitionDuration: "0.1s",
    },
  },
  card: {
    "&:hover": {
      borderColor: "#FF9248",
      borderWidth: 10,
    },
  },

  Text1: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.gray[3]
        : theme.colors.dark[6],
    fontSize: "20px",
  },
  Text2: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.gray[3]
        : theme.colors.dark[6],
    fontSize: "14px",
  },
}));

export default function Settings({ opened }) {
  const { classes } = useStyles();
  const [URL] = useState(process.env.REACT_APP_BACKEND_URL); // Url is imported from .env file
  const [token] = useState(localStorage.getItem("token")); // jwt token
  const [PROFILE] = useState(process.env.REACT_APP_PROFILE_URL);
  let navigate = useNavigate();
  const [data, setData] = useState("");

  useEffect(() => {
    // for fetching the data of nakshatra
    const fetchData = async () => {
      const config = {
        headers: {
          "x-access-token": token,
        },
      };
      await axios
        .get(URL + "user_login", config)
        .then((response) => {
          console.log(response.data);
          setData(response.data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    fetchData();
  }, []);
  return (
    <div>
      <BreadCrumb Text="Settings" />
      <div>
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Image
              src={PROFILE + data.image}
              style={{ width: 100, margin: "auto", marginTop: 10 }}
              radius="sm"
            />
          </div>
          <Text className={classes.Text1}>{data.label}</Text>
        </div>
        <Container style={{ width: "65%" }}>
          <Grid>
            <Grid.Col xs={3}>
              <Card
                className={classes.Card}
                shadow="sm"
                p="lg"
                withBorder={true}
                onClick={() => navigate("/admin_profile")}
              >
                <Center>
                  <Box className={classes.Box}>
                    <UserCircle className="zvcr-icon" />
                    <Text sx={{ fontSize: "12px" }}>Profile</Text>
                  </Box>
                </Center>
              </Card>
            </Grid.Col>
            {/* <Grid.Col xs={3}>
              <Card
                className={classes.Card}
                shadow="sm"
                p="lg"
                withBorder={true}
                onClick={() => navigate("/gender")}
              >
                <Center>
                  <Box className={classes.Box}>
                    <User className="zvcr-icon" />
                   
                    <Text sx={{ fontSize: "12px" }}>GENDER</Text>
                  </Box>
                </Center>
              </Card>
            </Grid.Col> */}
            <Grid.Col xs={3}>
              <Card
                className={classes.Card}
                shadow="sm"
                p="lg"
                withBorder={true}
                onClick={() => navigate("/gotra")}
              >
                <Center>
                  <Box className={classes.Box}>
                    <Affiliate className="zvcr-icon" />
                    <Text sx={{ fontSize: "12px" }}>GOTRA</Text>
                  </Box>
                </Center>
              </Card>
            </Grid.Col>
            <Grid.Col xs={3}>
              <Card
                className={classes.Card}
                shadow="sm"
                p="lg"
                withBorder={true}
                onClick={() => navigate("/rashi")}
              >
                <Center>
                  <Box className={classes.Box}>
                    <ZodiacCancer className="zvcr-icon" />
                    <Text sx={{ fontSize: "12px" }}>RASHI</Text>
                  </Box>
                </Center>
              </Card>
            </Grid.Col>

            <Grid.Col xs={3}>
              <Card
                className={classes.Card}
                shadow="sm"
                p="lg"
                withBorder={true}
                onClick={() => navigate("/nakshatra")}
              >
                <Center>
                  <Box className={classes.Box}>
                    <Stars className="zvcr-icon" />
                    <Text sx={{ fontSize: "12px" }}>NAKSHATRA</Text>
                  </Box>
                </Center>
              </Card>
            </Grid.Col>
            <Grid.Col xs={3}>
              <Card
                className={classes.Card}
                shadow="sm"
                p="lg"
                withBorder={true}
                onClick={() => navigate("/marriage")}
              >
                <Center>
                  <Box className={classes.Box}>
                    <Confetti className="zvcr-icon" />
                    <Text sx={{ fontSize: "12px" }}>MarriageType</Text>
                  </Box>
                </Center>
              </Card>
            </Grid.Col>
            <Grid.Col xs={3}>
              <Card
                className={classes.Card}
                shadow="sm"
                p="lg"
                withBorder={true}
                onClick={() => navigate("/sub_cast")}
              >
                <Center>
                  <Box className={classes.Box}>
                    <ArrowRampRight className="zvcr-icon" />
                    <Text sx={{ fontSize: "12px" }}>Sub-Caste</Text>
                  </Box>
                </Center>
              </Card>
            </Grid.Col>
            <Grid.Col xs={3}>
              <Card
                className={classes.Card}
                shadow="sm"
                p="lg"
                withBorder={true}
                onClick={() => navigate("/sect")}
              >
                <Center>
                  <Box className={classes.Box}>
                    <Diamond className="zvcr-icon" />
                    <Text sx={{ fontSize: "12px" }}>Sect(ಪಂಗಡ)</Text>
                  </Box>
                </Center>
              </Card>
            </Grid.Col>

            <Grid.Col xs={3}>
              <Card
                className={classes.Card}
                shadow="sm"
                p="lg"
                withBorder={true}
                onClick={() => navigate("/education")}
              >
                <Center>
                  <Box className={classes.Box}>
                    <School className="zvcr-icon" />
                    <Text sx={{ fontSize: "12px" }}>Education</Text>
                  </Box>
                </Center>
              </Card>
            </Grid.Col>
            {/* <Grid.Col xs={3}>
              <Card
                className={classes.Card}
                shadow="sm"
                p="lg"
                withBorder={true}
                onClick={() => navigate("/education_type")}
              >
                <Center>
                  <Box className={classes.Box}>
                    <Book2 className="zvcr-icon" />
                    <Text sx={{ fontSize: "12px" }}>Education Type</Text>
                  </Box>
                </Center>
              </Card>
            </Grid.Col> */}
          </Grid>
        </Container>
      </div>
    </div>
  );
}
