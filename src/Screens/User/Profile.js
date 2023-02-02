import {
  Accordion,
  ActionIcon,
  Col,
  Container,
  createStyles,
  Card,
  Group,
  Text,
  Image,
  Title,
  Button,
  ScrollArea,
} from "@mantine/core";
import React, { useState, useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import {
  BrandInstagram,
  BrandTwitter,
  BrandYoutube,
  Phone,
  User,
} from "tabler-icons-react";
// import image from './image.svg';
import About from "../../assets/User/Aboutus.png";
import Footer from "../../Components/User/Footer";
import Header from "../../Components/User/Header";
import LazyShow from "../../Components/User/LazyShow";
import Batman from "../../assets/User/Batman.png";
import Contact from "../../assets/User/Contact.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 5,
    paddingBottom: theme.spacing.xl * 2,
  },
  root: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    // backgroundAttachment: 'fixed',
    // minHeight: '500px',
    backgroundImage: `linear-gradient(to bottom, black, rgba(255,255,255,0)),  url(${About})`,
    paddingTop: theme.spacing.xl * 1,
    paddingBottom: theme.spacing.xl * 4,
  },
  title: {
    marginBottom: theme.spacing.md,
    paddingLeft: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Poppins`,
  },

  item: {
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
  },
  inner: {
    display: "flex",
    justifyContent: "space-between",
    [theme.fn.smallerThan("md")]: {
      flexDirection: "column",
    },
  },
  image: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },
  content: {
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan("md")]: {
      marginRight: 0,
    },
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
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    marginRight: 20,
    marginTop: 50,
  },

  section: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

const placeholder =
  "It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.";

export default function Profile() {
  const { classes } = useStyles();
  const [URL] = useState(process.env.REACT_APP_BACKEND_URL); // Url is imported from .env file
  const [token] = useState(localStorage.getItem("token")); // jwt token
  const [PROFILE] = useState(process.env.REACT_APP_PROFILE_URL);
  const [data, setData] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    // for fetching the data of Coupon
    const fetchData = async () => {
      const config = {
        headers: {
          "x-access-token": token,
        },
      };
      console.log(token);
      if (token !== null && typeof token != "undefined") {
        await axios
          .get(URL + "app/users_all", config)
          .then((response) => {
            setData(response.data.data);
          })
          .catch((error) => {
            console.log("error", error);
          });
      } else {
        await axios
          .get(URL + "app/users_all2", config)
          .then((response) => {
            setData(response.data.data);
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    };

    fetchData();
  }, []);

  // Responsive carousel
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  // For navigating profile details
  const profiledetails = (e) => {
    navigate("/profiledetails/" + e);
  };
  return (
    <>
      <Header />
      <div className={classes.root}>
        <Container size="lg" sx={{ height: "25.3vh" }}>
          <div className={classes.inner}>
            <div className={classes.content}>
              <Title className={classes.title} pt={80}>
                <Text
                  component="span"
                  inherit
                  variant="gradient"
                  gradient={{ from: "pink", to: "yellow" }}
                >
                  Profiles
                </Text>
              </Title>
            </div>
          </div>
        </Container>
      </div>

      <Container size="lg" mt={40}>
        <Text size="xl" sx={{ textAlign: "center" }}>
          Latest Profiles
        </Text>
        <Carousel
          responsive={responsive}
          autoPlay={false}
          infinite={true}
          transitionDuration={500}
          removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {data.map((row, index) => (
            <LazyShow>
              <Card
                withBorder
                radius="md"
                onClick={() => profiledetails(row.value)}
                p="md"
                style={{
                  backgroundImage:
                    `linear-gradient(180deg, rgba(0, 0,0, 0.02) 50%, rgba(20, 20, 20, 0.900) 80%),url(` +
                    PROFILE +
                    row.image.split(",")[0] +
                    `)`,

                  width: "95%",
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
                    <Text size="xl" weight={500}>
                      {row.label}
                    </Text>

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
          ))}
        </Carousel>
      </Container>
      <Footer />
    </>
  );
}
