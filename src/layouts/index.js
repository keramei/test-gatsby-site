import React from "react";
import g from "glamorous";
import { css } from "glamor";
import Link from "gatsby-link";
import Helmet from 'react-helmet'

import { Grid, Row, Col } from 'react-flexbox-grid';

import { rhythm } from "../utils/typography";

import MediaQuery from "react-responsive";

import NavMenu from "../components/NavMenu"

const App = g.div({
  "display": "flex",
  "flexDirection": "column",
  "margin": `0 auto`,
  "padding": rhythm(2.5),
  "maxWidth": "1200px",
});

const AppBody = g.div({
  "display": "flex",
  "flex": 1,
});

const Sidebar = g.div({
  "position": "fixed",
});

const SiteTitle = g.h1({
  "fontSize": "3.5rem",
  "textTransform": "lowercase",
})

const Links = g.ul({
  "listStyleType": "none",
  "padding": 0,
  "marginBottom": rhythm(0.5),
  "textAlign": "right",
  "fontSize": '1.375rem',
});

const NavLink = g(Link)({
  "fontWeight": 300,
  "paddingLeft": "8px",
  "paddingRight": "8px",
  "textTransform": "lowercase",
});

const FixedLink = g.a({
  "fontWeight": 300,
  "paddingLeft": "8px",
  "paddingRight": "8px",
});

const Content = g.div({
  "flex": "1 1 auto",
  "overflow": "auto",
});

const Footer = g.footer({
  "textAlign": "right",
  "fontSize": "0.75rem"
});

const sidebarContainer = css({
  "width": "15rem",
  "flex": "0 0 auto",
}).toString();

const activeLink = css({
  "color": "#000000",
}).toString();

export default ({ data, children, location }) => {
  let navLinks = data.allMarkdownRemark.edges.map(({ node }) => {
    let props = {
      activeClassName: activeLink,
      to: node.fields.slug,
    };
    if (node.fields.slug === "/") {
      props = {to: node.fields.slug}
      if (location.pathname === "/") {
        props.className = activeLink;
      }
    }
    return (<li key={node.fields.slug}><NavLink {...props}>{node.frontmatter.title}</NavLink></li>);
  });

  navLinks.push()

  let fixedLinks = [
    <li key="fl1"><NavLink activeClassName={activeLink} to={`/about/`}>about</NavLink></li>,
    <li key="fl2"><FixedLink href="/assets/resume.pdf">resume</FixedLink></li>
  ];

  return (
      <App>
        <Helmet>
          <title>{data.site.siteMetadata.title}</title>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#00aba9" />
          <meta name="theme-color" content="#ffffff" />
        </Helmet>
        <MediaQuery query="only screen and (max-width: 48em)" component="header">
          <Grid fluid style={{ "paddingBottom": "16px" }} >
            <Row between="xs" middle="xs">
              <Col><Link to={`/`}><SiteTitle>{data.site.siteMetadata.title}</SiteTitle></Link></Col>
              <Col><NavMenu>{navLinks.concat(fixedLinks)}</NavMenu></Col>
            </Row>
          </Grid>
        </MediaQuery>
        <AppBody>
          <MediaQuery query="only screen and (min-width: 48.03em)" component="nav">
            <div className={sidebarContainer}>
              <Sidebar>
                <Link to={`/`}><SiteTitle>{data.site.siteMetadata.title}</SiteTitle></Link>
                <Links>{navLinks}</Links>
                <Links>{fixedLinks}</Links>
              </Sidebar>
            </div>
          </MediaQuery>
          <Content>
            {children()}
          </Content>
        </AppBody>
        <Footer>
          Copyright © {new Date().getFullYear()} {data.site.siteMetadata.title}. All rights reserved.
        </Footer>
      </App>
  );
}

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: {
        fields: {
          collection: {eq: "portfolio"}
        }
      }
      sort: {
        fields: [frontmatter___order],
        order:ASC,
      }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`