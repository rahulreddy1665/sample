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
} from "@mantine/core";
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  BrandInstagram,
  BrandTwitter,
  BrandYoutube,
  FileX,
  Phone,
  User,
} from "tabler-icons-react";

import footerlogo from "../../assets/User/footerlogo.png";
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
    marginTop: "auto",
    bottom: 0,
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
  const [user, setUser] = useState("");

  useEffect(() => {
    // for fetching the data of Coupon
    const fetchData = async () => {
      const config = {
        headers: {
          "x-access-token": token,
        },
      };

      // For app get all the users based on groom or bride get the list
      await axios
        .get(URL + "app/users_all", config)
        .then((response) => {
          console.log(response.data);
          setData(response.data.data);
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

  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
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
            Dashboard
          </Text>
        </div>
        <Text size="xl" mt={40} mb={20} sx={{ textAlign: "center" }}>
          Latest Profiles for you
        </Text>

        {/* For view the users list by card design */}
        <Grid>
          {data.map((row, index) => (
            <Grid.Col md={4} lg={3}>
              {/* using lazy show for animation view */}
              <LazyShow>
                <Card
                  withBorder
                  radius="md"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => profiledetails(row.value)}
                  p="md"
                  style={{
                    backgroundImage:
                      `linear-gradient(180deg, rgba(0, 0,0, 0.02) 50%, rgba(20, 20, 20, 0.900) 80%),url(` +
                      PROFILE +
                      row.image.split(",")[0] +
                      `)`,

                    width: "100%",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: 400,
                    position: "relative",
                    cursor: "pointer",

                    boxShadow:
                      "rgb(0 0 0 / 5%) 0px 1px 3px, rgb(0 0 0 / 5%) 0px 20px 25px -5px, rgb(0 0 0 / 4%) 0px 10px 10px -5px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      left: 0,
                    }}
                  >
                    <div
                      style={{
                        color: "white",
                        paddingLeft: 15,
                      }}
                      mt="md"
                    >
                      {/* For view the user name */}
                      <Text size="xl" weight={500}>
                        {row.label}
                      </Text>
                      {/* For view the rashi and nakshathra and gothra */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <div style={{ display: "flex" }}>
                            {row.rashi_id != null ? (
                              <Text size="xs" mt="xs">
                                R: {row.rashi.label}
                              </Text>
                            ) : (
                              <Text size="xs" mt="xs">
                                R: -
                              </Text>
                            )}
                            <Text size="xs" p={0} mt="xs">
                              &nbsp; | &nbsp;
                            </Text>
                            {row.nakshathra_id != null ? (
                              <Text size="xs" mt="xs">
                                N: {row.nakshathra.label}
                              </Text>
                            ) : (
                              <Text size="xs" mt="xs">
                                N: -
                              </Text>
                            )}
                          </div>
                          <div style={{ display: "flex", marginTop: -10 }}>
                            {row.gothra_id != null ? (
                              <Text size="xs" mt="xs">
                                G: {row.gothra.label}
                              </Text>
                            ) : (
                              <Text size="xs" mt="xs">
                                G: -
                              </Text>
                            )}
                            <Text size="xs" mt="xs">
                              &nbsp; | &nbsp;
                            </Text>
                            <Text size="xs" mt="xs">
                              H: {row.height} (
                              {Number(row.height * 30.48).toFixed(0)})
                            </Text>
                          </div>
                          <div style={{ display: "flex", marginTop: -10 }}>
                            <Text size="xs" mt="xs">
                              {row.mother_tongue}
                            </Text>
                            <Text size="xs" mt="xs">
                              &nbsp; | &nbsp;
                            </Text>
                            <Text size="xs" mt="xs">
                              {row.city}
                            </Text>
                          </div>
                        </div>
                        <div
                          style={{
                            backgroundColor: "#FF9248",
                            borderTopLeftRadius: 10,
                            borderBottomLeftRadius: 10,
                            marginBottom: 10,
                          }}
                        >
                          {/* For view the user age in orange box */}
                          <Text
                            style={{
                              fontSize: 45,
                              paddingLeft: 10,
                              paddingRight: 10,
                              paddingTop: -2,
                              paddingBottom: -2,
                              color: "white",
                              fontWeight: 600,
                              margin: 0,
                            }}
                          >
                            {Math.floor(
                              (new Date() -
                                new Date(row.date_of_birth).getTime()) /
                                3.15576e10
                            )}
                          </Text>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </LazyShow>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
      <Footers />
    </>
  );
}

{
  /* <Card.Section className={classes.section} pr={2} mt="md">
<Group position="apart">
  <Text size="lg" weight={500}>
    {row.label}
  </Text>
</Group>
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
  }}
>
  <div>
    <Group mt={-10}>
      {row.rashi_id != null ? (
        <Text size="xs" mt="xs">
          R: {row.rashi.label}
        </Text>
      ) : (
        <Text size="xs" mt="xs">
          R: -
        </Text>
      )}
      {row.nakshathra_id != null ? (
        <Text size="xs" mt="xs">
          N: {row.nakshathra.label}
        </Text>
      ) : (
        <Text size="xs" mt="xs">
          N: -
        </Text>
      )}
    </Group>
    <Group mt={-10}>
      {row.gothra_id != null ? (
        <Text size="xs" mt="xs">
          G: {row.gothra.label}
        </Text>
      ) : (
        <Text size="xs" mt="xs">
          G: -
        </Text>
      )}

      <Text size="xs" mt="xs">
        H: {row.height}
      </Text>
    </Group>
    <Group mt={-10}>
      <Text size="xs" mt="xs">
        M-T: {row.mother_tongue}
      </Text>
      <Text size="xs" mt="xs">
        E: {row.currently_working}
      </Text>
    </Group>
  </div>
  <div
    style={{
      border: "3px solid #E0E0E0",

      padding: "0px 8px",
    }}
  >
    <Text
      style={{
        fontSize: 45,

        color: "orange",
      }}
      weight={700}
    >
      {Math.floor(
        (new Date() -
          new Date(row.date_of_birth).getTime()) /
          3.15576e10
      )}
    </Text>
  </div>
</div>
</Card.Section>
<Card.Section>
<Button
  size="md"
  fullWidth
  color="orange"
  onClick={() => profiledetails(row.value)}
>
  <Group>
    <User />
    View Profile
  </Group>
</Button>
</Card.Section> */
}
