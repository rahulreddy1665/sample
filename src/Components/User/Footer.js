import {
  ActionIcon,
  Button,
  Card,
  Container,
  createStyles,
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
import footerlogo from "../../assets/User/footerlogo.png";
import google from "../../assets/User/google.png";
import Polaroid from "../../assets/User/Polaroid.png";
import Welcome from "../../assets/User/Welcome.png";

import LazyShow from "./LazyShow";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    // backgroundAttachment: 'fixed',
    // minHeight: '500px',
    backgroundImage: `linear-gradient(to bottom, black, rgba(255,255,255,0)),  url(${Welcome})`,
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
  footer: {
    marginTop: 50,
    paddingTop: theme.spacing.xl * 2,

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

  afterFooter: {
    textAlign: "center",
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
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
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },
}));

function Footers() {
  const { classes, cx } = useStyles();
  let navigate = useNavigate();

  const footerdata = [
    {
      title: "Account",
      links: [
        {
          label: "Home",
          link: "/",
        },
        {
          label: "About",
          link: "/about",
        },
        {
          label: "Profile",
          link: "/profile",
        },
        {
          label: "Contact",
          link: "/contact",
        },
      ],
    },
    {
      title: "LEGAL",
      links: [
        {
          label: "Term & Conditions",
          link: "/terms",
        },
        {
          label: "Privacy Policy",
          link: "/policy",
        },
        {
          label: "Suspension & Refund",
          link: "/refund",
        },
      ],
    },
    {
      title: "CONTACT",
      links: [
        {
          label: "support@viprabandhana.com",
        },
      ],
    },
  ];

  const handleLink = (e) => {
    navigate(e);
  };

  const groups = footerdata.map((group) => {
    const links = group.links.map((link, index) => (
      <Text
        key={index}
        className={classes.link}
        component="a"
        onClick={(e) => handleLink(link.link)}
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
    <LazyShow>
      <footer className={classes.footer}>
        <Container size="lg">
          <div className={classes.inner}>
            <div className={classes.logo}>
              <img src={footerlogo} width="75%" />
              <Text size="xs" color="dimmed" className={classes.descriptions}>
                Find your perfect match using our customized filter..!
              </Text>
            </div>
            <div className={classes.groups}>{groups}</div>
          </div>
        </Container>
        <div size="lg" className={classes.afterFooter}>
          <Text style={{ textAlign: "center" }}>
            &copy; {new Date().getFullYear()} Vipra Bandhana.
          </Text>
        </div>
      </footer>
    </LazyShow>
  );
}

export default Footers;
