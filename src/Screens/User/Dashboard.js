import {
  ActionIcon,
  Button,
  Card,
  Container,
  createStyles,
  MediaQuery,
  Grid,
  Group,
  SimpleGrid,
  Text,
  ThemeIcon,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Navigate, useNavigate } from "react-router-dom";
import {
  BrandInstagram,
  BrandTwitter,
  BrandYoutube,
  Certificate,
  Coin,
  Truck,
} from "tabler-icons-react";
import apple from "../../assets/User/apple.png";

import google from "../../assets/User/google.png";
import Polaroid from "../../assets/User/Polaroid.png";
import Welcome from "../../assets/User/Welcome.png";
import Header from "../../Components/User/Header";
import LazyShow from "../../Components/User/LazyShow";
import Footer from "../../Components/User/Footer";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    // backgroundAttachment: 'fixed',
    // minHeight: '500px',
    backgroundImage: `linear-gradient(to bottom, black, rgba(255,255,255,0)),  url(${Welcome})`,

    paddingBottom: theme.spacing.xl * 4,
  },
  root22: {
    position: "relative",
    zIndex: 1,
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

  title: {
    color: theme.white,
    fontFamily: `Poppins`,
    fontWeight: 900,
    lineHeight: 1.05,
    maxWidth: 500,
    fontSize: 48,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      fontSize: 34,
      lineHeight: 1.15,
    },
  },

  description: {
    color: theme.white,
    opacity: 0.75,
    maxWidth: 500,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
    },
  },

  control: {
    paddingLeft: 50,
    paddingRight: 50,
    fontFamily: `Poppins`,
    color: "white",
    fontSize: 22,

    [theme.fn.smallerThan("md")]: {
      width: "100%",
    },
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "10%",
    marginBottom: 30,
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: "black",
    fontSize: theme.fontSizes.md,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: "transparent",
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    borderBottomColor: "orangered",
    "&, &:hover": {
      backgroundColor: "transparent",
      color: theme.colors.orange,
    },
  },
  wrapper: {
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
  },

  titles: {
    fontFamily: `Poppins`,
    fontWeight: 900,
    marginBottom: theme.spacing.md,
    textAlign: "center",

    [theme.fn.smallerThan("sm")]: {
      fontSize: 28,
      textAlign: "left",
    },
  },

  descriptions: {
    textAlign: "center",

    [theme.fn.smallerThan("sm")]: {
      textAlign: "left",
    },
  },
  success: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  comment: {
    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
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
    textAlign: "center",
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

  social: {
    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.xs,
    },
  },
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    marginRight: 20,
    marginTop: 80,
    height: 260,
  },

  section: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },
}));

export function Feature({ icon: Icon, title, description }) {
  const theme = useMantineTheme();
  return (
    <div>
      <div className="home_choose">
        <ThemeIcon variant="light" color="orange" size={100} radius={100}>
          <Icon style={{ width: 60, height: 60 }} />
        </ThemeIcon>
      </div>
      <Text
        className="home_choose"
        style={{ marginTop: theme.spacing.sm, marginBottom: 7 }}
      >
        {title}
      </Text>
      <Text
        size="sm"
        color="dimmed"
        style={{ lineHeight: 1.6, textAlign: "justify" }}
      >
        {description}
      </Text>
    </div>
  );
}

const MOCKDATA = [
  {
    icon: Truck,
    title: "Free Worldwide shipping",
    description:
      "As electricity builds up inside its body, it becomes more aggressive. One theory is that the electricity.",
  },
  {
    icon: Certificate,
    title: "Best Quality Product",
    description:
      "Slakoth’s heart beats just once a minute. Whatever happens, it is content to loaf around motionless.",
  },
  {
    icon: Coin,
    title: "Very Affordable Pricing",
    description:
      "Thought to have gone extinct, Relicanth was given a name that is a variation of the name of the person who discovered.",
  },
];

export default function Dashboard({ title, description, data = MOCKDATA }) {
  const { classes, cx } = useStyles();
  let navigate = useNavigate();
  const theme = useMantineTheme();
  const [opened, toggleOpened] = useBooleanToggle(false);
  const [authenticate] = useState(localStorage.getItem("isAuthenticated"));
  const features = data.map((feature, index) => (
    <Feature {...feature} key={index} />
  ));

  // Responsive carousel
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  // Login page
  const login = () => {
    navigate("/login");
  };

  const dashboard = () => {
    const role = localStorage.getItem("role");
    if (role == "User") {
      navigate("/user_profile");
    } else {
      navigate("/dashboard");
    }
  };

  // Registration Page
  const registration = () => {
    navigate("/signup");
  };

  return (
    <>
      <div className={classes.root}>
        <Header />
        <Container size="lg" sx={{ height: "75.3vh" }}>
          <div className={classes.inner}>
            <LazyShow>
              <div className={classes.content}>
                <Title className={classes.title} pt={85}>
                  A{" "}
                  <Text
                    component="span"
                    inherit
                    variant="gradient"
                    gradient={{ from: "pink", to: "yellow" }}
                  >
                    fully filtered
                  </Text>{" "}
                  Matrimonial Website for Brahmin's
                </Title>

                <Text className={classes.description} mt={30}>
                  Find your perfect match with our customized filters – Vipra
                  Bandhana includes more than 10 customizable filters and hooks
                  to cover you in any situation
                </Text>
                {authenticate == "true" ? (
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <Button
                      variant="gradient"
                      gradient={{ from: "orange", to: "red" }}
                      size="lg"
                      className={classes.control}
                      mt={40}
                      mr={20}
                      onClick={dashboard}
                    >
                      Dashboard
                    </Button>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <Button
                      variant="gradient"
                      gradient={{ from: "orange", to: "red" }}
                      size="lg"
                      className={classes.control}
                      mt={40}
                      mr={20}
                      onClick={login}
                    >
                      Login
                    </Button>

                    <Button
                      variant="gradient"
                      gradient={{ from: "white", to: "white" }}
                      size="lg"
                      className={classes.control}
                      mt={40}
                      mr={20}
                      onClick={registration}
                    >
                      <Text color="orange" size="xl">
                        {" "}
                        Sign up{" "}
                      </Text>
                    </Button>
                  </div>
                )}
              </div>
            </LazyShow>
          </div>
        </Container>
      </div>
      <Container size="lg" className={classes.wrapper}>
        <Title className={classes.titles}>
          Why Choose{" "}
          <span style={{ fontFamily: "Great Vibes", color: "orange" }}>
            Vipra
          </span>
          <span style={{ fontFamily: "Great Vibes" }}> Bandhana</span> ?
        </Title>

        <Container size={560} p={0}>
          <Text size="sm" className={classes.descriptions}>
            Find your perfect match with our customized filters
          </Text>
        </Container>
        <LazyShow>
          <SimpleGrid
            mt={60}
            cols={3}
            spacing={theme.spacing.xl * 2}
            breakpoints={[
              { maxWidth: 980, cols: 2, spacing: "xl" },
              { maxWidth: 755, cols: 1, spacing: "xl" },
            ]}
          >
            {features}
          </SimpleGrid>
        </LazyShow>
      </Container>
      <div style={{ backgroundColor: "#F1F1F2" }}>
        <div>
          <Text
            size="lg"
            style={{ textAlign: "center", paddingTop: 10, paddingBottom: 10 }}
          >
            Now instantly contact your matches from your community
          </Text>
          <Grid style={{ width: "80%", margin: "auto", paddingBottom: 8 }}>
            <Grid.Col md={6}>
              <div className="for_float">
                <Button
                  size="xl"
                  px={30}
                  color="dark"
                  className={classes.control}
                  mt={40}
                  style={{ margin: "auto" }}
                  mr={20}
                >
                  <img src={google} style={{ width: 50 }} />

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Text size="xs" style={{ textAlign: "left" }}>
                      GET IT ON
                    </Text>{" "}
                    <Text size="lg" mt={-8}>
                      Google Play
                    </Text>
                  </div>
                </Button>
              </div>
            </Grid.Col>
            <Grid.Col md={6}>
              <Button
                size="xl"
                px={40}
                color="dark"
                className={classes.control}
                style={{ margin: "auto" }}
                mt={40}
                py={5}
              >
                <img src={apple} style={{ width: 40 }} />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: 5,
                  }}
                >
                  <Text size="xs" style={{ textAlign: "left" }}>
                    Download on the
                  </Text>
                  <Text size="xl" ml={-6} mt={-8}>
                    App Store
                  </Text>
                </div>
              </Button>
            </Grid.Col>
          </Grid>
          {/* <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              paddingBottom: 30,
              marginTop: -20,
            }}
          >
            <Button
              size="xl"
              px={30}
              color="dark"
              className={classes.control}
              mt={40}
              mr={20}
            >
              <img src={google} style={{ width: 50 }} />

              <div style={{ display: "flex", flexDirection: "column" }}>
                <Text size="xs" style={{ textAlign: "left" }}>
                  GET IT ON
                </Text>{" "}
                <Text size="lg" mt={-8}>
                  Google Play
                </Text>
              </div>
            </Button>
            <Button
              size="xl"
              px={40}
              color="dark"
              className={classes.control}
              mt={40}
              py={5}
            >
              <img src={apple} style={{ width: 40 }} />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 5,
                }}
              >
                <Text size="xs" style={{ textAlign: "left" }}>
                  Download on the
                </Text>
                <Text size="xl" ml={-6} mt={-8}>
                  App Store
                </Text>
              </div>
            </Button>
          </div> */}
        </div>
      </div>
      <Container size="lg" className={classes.wrapper}>
        <Title className={classes.titles} mb={40}>
          Our Success Stories
        </Title>

        <Grid>
          <Grid.Col span={7}>
            <div>
              <Carousel
                responsive={responsive}
                autoPlay={false}
                transitionDuration={500}
                infinite={true}
                removeArrowOnDeviceType={["tablet", "mobile"]}
              >
                <LazyShow>
                  <Card px={85} radius="md" p="md" className={classes.card}>
                    <Card.Section className={classes.section} mt="md">
                      <Group position="apart">
                        <Text size="lg" weight={500}>
                          Verudela Beach
                        </Text>
                      </Group>
                      <Text size="sm" mt="xs">
                        Completely renovated for the season 2020, Arena Verudela
                        Bech Apartments are fully equipped and modernly
                        furnished 4-star self-service apartments <br></br>
                        <br></br> Completely renovated for the season 2020,
                        Arena Verudela Bech Apartments are fully equipped and
                        modernly furnished 4-star self-service apartments
                      </Text>
                    </Card.Section>
                  </Card>
                </LazyShow>
                <LazyShow>
                  <Card px={85} radius="md" p="md" className={classes.card}>
                    <Card.Section className={classes.section} mt="md">
                      <Group position="apart">
                        <Text size="lg" weight={500}>
                          Verudela Beach
                        </Text>
                      </Group>
                      <Text size="sm" mt="xs">
                        Completely renovated for the season 2020, Arena Verudela
                        Bech Apartments are fully equipped and modernly
                        furnished 4-star self-service apartments <br></br>
                        <br></br> Completely renovated for the season 2020,
                        Arena Verudela Bech Apartments are fully equipped and
                        modernly furnished 4-star self-service apartments
                      </Text>
                    </Card.Section>
                  </Card>
                </LazyShow>
                <LazyShow>
                  <Card px={85} radius="md" p="md" className={classes.card}>
                    <Card.Section className={classes.section} mt="md">
                      <Group position="apart">
                        <Text size="lg" weight={500}>
                          Verudela Beach
                        </Text>
                      </Group>
                      <Text size="sm" mt="xs">
                        Completely renovated for the season 2020, Arena Verudela
                        Bech Apartments are fully equipped and modernly
                        furnished 4-star self-service apartments <br></br>
                        <br></br> Completely renovated for the season 2020,
                        Arena Verudela Bech Apartments are fully equipped and
                        modernly furnished 4-star self-service apartments
                      </Text>
                    </Card.Section>
                  </Card>
                </LazyShow>
                <LazyShow>
                  <Card px={85} radius="md" p="md" className={classes.card}>
                    <Card.Section className={classes.section} mt="md">
                      <Group position="apart">
                        <Text size="lg" weight={500}>
                          Verudela Beach
                        </Text>
                      </Group>
                      <Text size="sm" mt="xs">
                        Completely renovated for the season 2020, Arena Verudela
                        Bech Apartments are fully equipped and modernly
                        furnished 4-star self-service apartments
                        <br></br>
                        <br></br>
                        Completely renovated for the season 2020, Arena Verudela
                        Bech Apartments are fully equipped and modernly
                        furnished 4-star self-service apartments
                      </Text>
                    </Card.Section>
                  </Card>
                </LazyShow>
              </Carousel>
            </div>
          </Grid.Col>
          <Grid.Col span={5}>
            {" "}
            <img src={Polaroid} width="100%" />
          </Grid.Col>
        </Grid>
      </Container>
      <div style={{ backgroundColor: "#FF9248", padding: 30 }}>
        <Text size="xl" style={{ color: "white", textAlign: "center" }}>
          Your Story is waiting to happen ..!
        </Text>
      </div>
      <Container className={classes.wrapper}>
        <Title className={classes.titles} mb={30}>
          How it works..!
        </Title>

        <div className="frame_container">
          <iframe
            className="video_frame"
            src="https://www.youtube.com/embed/E7wJTI-1dvQ"
            title="video"
          />
        </div>
      </Container>
      <Footer />
    </>
  );
}
