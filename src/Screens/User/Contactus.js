import {
  Anchor,
  Button,
  Container,
  createStyles,
  Group,
  Paper,
  ActionIcon,
  SimpleGrid,
  Text,
  Textarea,
  TextInput,
  Title,
  useMantineTheme,
  Grid,
} from "@mantine/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import bg from './bg.svg';
import {
  Mail,
  BrandTwitter,
  BrandYoutube,
  BrandInstagram,
  Phone,
  MapPin,
  Sun,
} from "tabler-icons-react";
import logo from "../../assets/User/logo.png";
import contactbg from "../../assets/User/contactbg.png";
import Footer from "../../Components/User/Footer";
import Contact from "../../assets/User/Contact.png";
import LazyShow from "../../Components/User/LazyShow";
import Header from "../../Components/User/Header";

const useStyles = createStyles((theme) => {
  const BREAKPOINT = theme.fn.smallerThan("sm");

  return {
    wrappers: {
      display: "flex",
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      borderRadius: theme.radius.lg,
      padding: 4,
      border: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[2]
      }`,

      [BREAKPOINT]: {
        flexDirection: "column",
      },
    },
    form: {
      boxSizing: "border-box",

      flex: 1,
      padding: theme.spacing.xl,
      paddingLeft: theme.spacing.xl * 2,
      borderLeft: 0,

      [BREAKPOINT]: {
        padding: theme.spacing.md,
        paddingLeft: theme.spacing.md,
      },
    },
    fields: {
      marginTop: -12,
    },
    fieldInput: {
      flex: 1,

      "& + &": {
        marginLeft: theme.spacing.md,

        [BREAKPOINT]: {
          marginLeft: 0,
          marginTop: theme.spacing.md,
        },
      },
    },
    fieldsGroup: {
      display: "flex",

      [BREAKPOINT]: {
        flexDirection: "column",
      },
    },
    contacts: {
      boxSizing: "border-box",
      position: "relative",
      borderRadius: theme.radius.lg - 2,
      // backgroundImage: `url(${bg.src})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      border: "1px solid transparent",
      padding: theme.spacing.xl,
      flex: "0 0 280px",

      [BREAKPOINT]: {
        marginBottom: theme.spacing.sm,
        paddingLeft: theme.spacing.md,
      },
    },
    titlessss: {
      marginBottom: theme.spacing.xl * 1.5,
      fontFamily: `Poppins`,

      [BREAKPOINT]: {
        marginBottom: theme.spacing.xl,
      },
    },
    controls: {
      [BREAKPOINT]: {
        flex: 1,
      },
    },
    root: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      // backgroundAttachment: 'fixed',
      // minHeight: '500px',
      backgroundImage: `linear-gradient(to bottom, black, rgba(255,255,255,0)),  url(${Contact})`,
      paddingTop: theme.spacing.xl * 1,
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
      textAlign: "left",

      [theme.fn.smallerThan("md")]: {
        maxWidth: "100%",
        fontSize: 34,
        lineHeight: 1.15,
      },
    },
    control: {
      paddingLeft: 50,
      paddingRight: 50,
      fontFamily: `Poppins`,
      fontSize: 22,

      [theme.fn.smallerThan("md")]: {
        width: "100%",
      },
    },
    wrapper: {
      paddingTop: theme.spacing.xl * 4,
      paddingBottom: theme.spacing.xl * 4,
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
      color: "black",
    },

    descriptions: {
      textAlign: "center",

      [theme.fn.smallerThan("sm")]: {
        textAlign: "left",
      },
    },

    body: {
      paddingLeft: 54,
      paddingTop: theme.spacing.sm,
      fontSize: theme.fontSizes.sm,
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
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[2]
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
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
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
  };
});

export default function Contactus() {
  const { classes, cx } = useStyles();

  const footerdata = [
    {
      title: "MY ACCOUNT",
      links: [
        { label: "Dashboard", link: "/" },
        { label: "Dashboard", link: "/" },
        { label: "Dashboard", link: "/" },
      ],
    },
    {
      title: "LEGAL INFORMATION",
      links: [
        { label: "Dashboard", link: "/" },
        { label: "Dashboard", link: "/" },
        { label: "Dashboard", link: "/" },
      ],
    },
    {
      title: "CONTACT INFORMATION",
      links: [
        { label: "Dashboard", link: "/" },
        { label: "Dashboard", link: "/" },
      ],
    },
  ];

  const groups = footerdata.map((group) => {
    const links = group.links.map((link, index) => (
      <Text
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrappers} key={group.title}>
        <Text className={classes.titless}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <>
      <Header />
      <div className={classes.root}>
        {/* Header Part */}
        <Container size="lg" sx={{ height: "35.3vh" }}>
          <div className={classes.inner}>
            <LazyShow>
              <div className={classes.content}>
                <Title className={classes.title} pt={60}>
                  <Text
                    component="span"
                    inherit
                    variant="gradient"
                    gradient={{ from: "pink", to: "yellow" }}
                  >
                    Contact Us
                  </Text>{" "}
                </Title>
                <Text className={classes.title}> Don't be Shy</Text>
              </div>
            </LazyShow>
          </div>
        </Container>
      </div>
      {/* Contact information card */}
      <Container size="lg">
        <Grid justify="center" gutter="xl">
          <Grid.Col md={4} sm={6}>
            <Paper shadow="md" radius="sm" mt={-40} style={{ minHeight: 425 }}>
              <div className={classes.contacts}>
                <Text
                  size="lg"
                  weight={700}
                  className={classes.titlessss}
                  sx={{ color: "#000000" }}
                >
                  Contact information
                </Text>
                <Group>
                  <Mail />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Text size="xs">Email</Text>
                    <Text>Support@zevcore.com</Text>
                  </div>
                </Group>
                <Group mt={20}>
                  <Phone />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Text size="xs">Phone</Text>
                    <Text>7204402686</Text>
                  </div>
                </Group>
                <Group mt={20}>
                  <MapPin />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Text size="xs">Address</Text>
                    <Text>A2, 1st A Main, Metagalli</Text>
                  </div>
                </Group>
                <Group mt={20}>
                  <Sun />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Text size="xs">Working hours</Text>
                    <Text>9 a.m - 6 p.m</Text>
                  </div>
                </Group>
              </div>
            </Paper>
          </Grid.Col>
          <Grid.Col md={8} sm={6}>
            <Paper shadow="md" radius="sm" mt={-40}>
              <form
                className={classes.form}
                onSubmit={(event) => event.preventDefault()}
              >
                <Text size="lg" weight={700} className={classes.titlessss}>
                  Get in touch
                </Text>

                <div className={classes.fields}>
                  <SimpleGrid
                    cols={2}
                    breakpoints={[{ maxWidth: "sm", cols: 1 }]}
                  >
                    <TextInput label="Your name" placeholder="Your name" />
                    <TextInput
                      label="Your email"
                      placeholder="hello@mantine.dev"
                      required
                    />
                  </SimpleGrid>

                  <TextInput
                    mt="md"
                    label="Subject"
                    placeholder="Subject"
                    required
                  />

                  <Textarea
                    mt="md"
                    label="Your message"
                    placeholder="Please include all relevant information"
                    minRows={3}
                  />

                  <Group position="right" mt="md">
                    <Button
                      variant="filled"
                      color="orange"
                      type="submit"
                      className={classes.controls}
                    >
                      Send message
                    </Button>
                  </Group>
                </div>
              </form>
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>

      {/* Footer */}
      <Footer />
    </>
  );
}
