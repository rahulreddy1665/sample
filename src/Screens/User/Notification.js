import {
  ActionIcon,
  Card,
  Container,
  createStyles,
  Grid,
  Group,
  Image,
  Badge,
  Button,
  Text,
  Divider,
  Tabs,
} from "@mantine/core";
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Bell,
  BrandInstagram,
  BrandTwitter,
  BrandYoutube,
  Phone,
  User,
} from "tabler-icons-react";

import footerlogo from "../../assets/User/footerlogo.png";
import icon from "../../assets/icon.png";
import LazyShow from "../../Components/User/LazyShow";
import ProdileHeader from "../../Components/User/ProfileHeader";
import axios from "axios";
import Footers from "../../Components/User/Footer";

const useStyles = createStyles((theme) => ({
  title: {
    fontWeight: 700,
    fontFamily: ` ${theme.fontFamily}`,
    lineHeight: 1.2,
  },
  section: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },
  card: {
    alignItems: "stretch",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },
  cards: {
    position: "relative",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  rating: {
    position: "absolute",
    top: theme.spacing.xs,
    right: theme.spacing.xs + 2,
    pointerEvents: "none",
  },

  title: {
    display: "block",
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs / 2,
  },

  action: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
  },
  body: {
    paddingLeft: theme.spacing.xs,
  },
  footer: {
    marginTop: 120,
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  logo: {
    maxWidth: 400,
    marginLeft: 50,
    marginRight: "auto",
    [theme.fn.smallerThan("sm")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  },

  descriptions: {
    marginTop: 5,

    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.xs,
      textAlign: "center",
    },
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },

  groups: {
    display: "flex",
    flexWrap: "wrap",
    marginRight: 50,

    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  wrappers: {
    width: 220,
  },

  link: {
    display: "block",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[6],
    fontSize: theme.fontSizes.sm,
    paddingTop: 3,
    paddingBottom: 3,

    "&:hover": {
      textDecoration: "underline",
    },
  },

  titless: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 700,

    marginBottom: theme.spacing.xs / 2,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },
  titleg: {
    fontSize: theme.fontSizes.xs,
    marginBottom: theme.spacing.xs / 2,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },

  afterFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  social: {
    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.xs,
    },
  },
}));
export default function ProfileDashboard() {
  const { classes, cx } = useStyles();
  // Navigation
  let navigate = useNavigate();
  const [URL] = useState(process.env.REACT_APP_BACKEND_URL); // Url is imported from .env file
  const [token] = useState(localStorage.getItem("token")); // jwt token
  const [PROFILE] = useState(process.env.REACT_APP_PROFILE_URL);
  const [data, setData] = useState([]);
  const [to, setTo] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    // for fetching the data of Coupon
    const fetchData = async () => {
      const config = {
        headers: {
          "x-access-token": token,
        },
      };

      // For get all the notification list for user
      await axios
        .get(URL + "app/notification_all", config)
        .then((response) => {
          console.log(response.data);
          setData(response.data.from);
          setTo(response.data.to);
        })
        .catch((error) => {
          console.log("error", error);
        });
      await axios
        .get(URL + "app/login_Data", config)
        .then((response) => {
          console.log(response.data);
          setUser(response.data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    fetchData();
  }, []);

  // For navigating profile details
  const profiledetails = (e) => {
    navigate("/profiledetails/" + e);
  };
  return (
    <>
      <div className={classes.root}>
        {/* Header Part */}
        <Container size="lg" sx={{ height: "5.3vh" }}>
          <ProdileHeader />
        </Container>
      </div>

      <Container size="lg" mt={40}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Text size="xl" mt={40} sx={{ textAlign: "center" }}>
            Welcome Back {user.label}
          </Text>
          <Text mt={40} color="orange">
            Notification
          </Text>
        </div>
        <Text size="xl" mt={40} mb={20} sx={{ textAlign: "center" }}>
          Latest Profiles for you
        </Text>

        <Tabs color="orange">
          {/*Personal Details  */}
          <Tabs.Tab label="Request" icon={<Phone size={14} />}>
            {/* For view all the phone no request from all the users */}
            {data.map((row, index) => (
              <LazyShow>
                <Card
                  withBorder
                  radius="md"
                  mt={5}
                  p={5}
                  className={classes.card}
                >
                  <Grid>
                    <Grid.Col span={3}>
                      {/* For view image and label */}
                      <Group>
                        <Image src={icon} width={50} />
                        <Text size="lg" weight={500}>
                          {row.user_request.label}
                        </Text>
                      </Group>
                    </Grid.Col>

                    <Grid.Col span={3}>
                      <Group>
                        <Text mt={10} size="lg" weight={500}>
                          {new Date(row.createdAt).toLocaleDateString("en-GB")}
                        </Text>
                      </Group>
                    </Grid.Col>
                    {/* Request status */}
                    <Grid.Col span={3}>
                      {row.status == 0 ? (
                        <Text size="lg" mt={10} color="orange" weight={500}>
                          Requesting Pending
                        </Text>
                      ) : row.status == 1 ? (
                        <Text size="lg" mt={10} color="green" weight={500}>
                          Requesting Accepted
                        </Text>
                      ) : (
                        <Text size="lg" mt={10} color="red" weight={500}>
                          Requesting Reject
                        </Text>
                      )}
                    </Grid.Col>
                    {/* For view the user profile */}
                    <Grid.Col span={3}>
                      <Button
                        size="md"
                        color="orange"
                        onClick={() => profiledetails(row.user_request.value)}
                      >
                        <Group>
                          <User />
                          View Profile
                        </Group>
                      </Button>
                    </Grid.Col>
                  </Grid>
                </Card>
              </LazyShow>
            ))}
          </Tabs.Tab>
          <Tabs.Tab label="Notification" icon={<Bell size={14} />}>
            {to.map((row, index) => (
              <LazyShow>
                <Card
                  withBorder
                  radius="md"
                  mt={5}
                  p={5}
                  className={classes.card}
                >
                  <Grid>
                    <Grid.Col span={3}>
                      <Group>
                        <Image src={icon} width={50} />
                        <Text size="lg" weight={500}>
                          {row.user_for.label}
                        </Text>
                      </Group>
                    </Grid.Col>

                    <Grid.Col span={3}>
                      <Group>
                        <Text mt={10} size="lg" weight={500}>
                          {new Date(row.createdAt).toLocaleDateString("en-GB")}
                        </Text>
                      </Group>
                    </Grid.Col>
                    <Grid.Col span={3}>
                      {row.status == 0 ? (
                        <Text size="lg" mt={10} color="orange" weight={500}>
                          Requesting Pending
                        </Text>
                      ) : row.status == 1 ? (
                        <Text size="lg" mt={10} color="green" weight={500}>
                          Requesting Accepted
                        </Text>
                      ) : (
                        <Text size="lg" mt={10} color="red" weight={500}>
                          Requesting Reject
                        </Text>
                      )}
                    </Grid.Col>
                    <Grid.Col span={3}>
                      <Button
                        size="md"
                        color="orange"
                        onClick={() => profiledetails(row.user_for.value)}
                      >
                        <Group>
                          <User />
                          View Profile
                        </Group>
                      </Button>
                    </Grid.Col>
                  </Grid>
                </Card>
              </LazyShow>
            ))}
          </Tabs.Tab>
        </Tabs>

        <Grid></Grid>
      </Container>
      <Footers />
    </>
  );
}
