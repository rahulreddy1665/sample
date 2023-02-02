import {
  Accordion,
  ActionIcon,
  Col,
  Container,
  createStyles,
  Grid,
  Group,
  Text,
  Image,
  Title,
} from "@mantine/core";
import React from "react";
import "react-multi-carousel/lib/styles.css";
import { BrandInstagram, BrandTwitter, BrandYoutube } from "tabler-icons-react";
// import image from './image.svg';
import About from "../../assets/User/Aboutus.png";
import Footer from "../../Components/User/Footer";
import Header from "../../Components/User/Header";
import LazyShow from "../../Components/User/LazyShow";

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 2,
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
}));

const placeholder =
  "It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.";

export default function Aboutus() {
  const { classes } = useStyles();
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
        <Container size="lg" sx={{ height: "25.3vh" }}>
          <div className={classes.inner}>
            <div className={classes.content}>
              <Title className={classes.title} pt={70}>
                <Text
                  component="span"
                  inherit
                  variant="gradient"
                  gradient={{ from: "pink", to: "yellow" }}
                >
                  About Us
                </Text>
              </Title>
            </div>
          </div>
        </Container>
      </div>

      <Container size="lg">
        <div className={classes.wrapper}>
          <Container size="lg">
            <Grid id="faq-grid" gutter={50}>
              <Grid.Col md={5} sm={12}>
                <LazyShow>
                  <Image
                    style={{ margin: "auto" }}
                    src={About}
                    alt="Image"
                    width="100%"
                  />
                </LazyShow>
              </Grid.Col>
              <Grid.Col md={7} sm={12}>
                <Accordion iconPosition="right" initialItem={0}>
                  <Accordion.Item
                    label="How can I reset my password?"
                    className={classes.item}
                  >
                    {placeholder}
                  </Accordion.Item>
                  <Accordion.Item
                    label="Can I create more that one account?"
                    className={classes.item}
                  >
                    {placeholder}
                  </Accordion.Item>
                  <Accordion.Item
                    label="How can I subscribe to monthly newsletter?"
                    className={classes.item}
                  >
                    {placeholder}
                  </Accordion.Item>
                  <Accordion.Item
                    label="Do you store credit card information securely?"
                    className={classes.item}
                  >
                    {placeholder}
                  </Accordion.Item>
                  <Accordion.Item
                    label="What payment systems to you work with?"
                    className={classes.item}
                  >
                    {placeholder}
                  </Accordion.Item>
                </Accordion>
              </Grid.Col>
              <Grid.Col span={12}>
                <div>
                  <Text sx={{ fontSize: 50 }}>Our Story</Text>
                  <Text size="md" style={{ textAlign: "justify" }}>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters, as opposed to
                    using 'Content here, content here', making it look like
                    readable English. Many desktop publishing packages and web
                    page editors now use Lorem Ipsum as their default model
                    text, and a search for 'lorem ipsum' will uncover many web
                    sites still in their infancy. Various versions have evolved
                    over the years, sometimes by accident, sometimes on purpose
                    (injected humour and the like)
                  </Text>
                </div>
              </Grid.Col>
            </Grid>
          </Container>
        </div>
      </Container>
      <Footer />
    </>
  );
}
