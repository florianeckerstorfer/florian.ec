import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../layouts/Layout';
import SEO from '../components/SEO/SEO';
import H1 from '../components/H1/H1';
import Content from '../components/Content/Content';
import { Link } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';

export interface Props {
  data: {
    file: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
  };
}

const AboutPage = ({ data }: Props) => {
  console.log(data.file);
  return (
    <Layout>
      <SEO title="About" />
      <H1>About</H1>

      <Content>
        <p>
          Hello, my name is Florian Eckerstorfer and I am a web developer living
          in Vienna, Europe. I have a Masters degree in{' '}
          <em>Software Engineering and Internet Computing</em> from the
          Technical University of Vienna.
        </p>

        <p>
          I like reading, music, going to <Link to="/concerts">concerts</Link>{' '}
          and going on walks.
        </p>

        <Img
          fluid={data.file.childImageSharp.fluid}
          alt="Gatsby Docs are awesome"
        />

        <h2>Biography</h2>

        <p>
          I was born and raised in Linz, Austria and graduated from{' '}
          <em>HLW für Kommunikations- und Mediendesign</em>, which included an
          education in Econimics as well as in communication and media design.
          After school I moved to Vienna to study{' '}
          <em>Software & Information Engineering</em> at the Vienna University
          of Technology. In July 2011 I received my bachelors degree and started
          my Masters in <em>Software Engineering & Internet Computing</em>. In
          March 2012 I also began working on a supplement curriculum in{' '}
          <em>Innovation</em>, which I received in March 2014. I finsished my
          Masters studies in January 2018 by writing my thesis on{' '}
          <em>
            Machine Learning Approach for Web Ranking Identification based on
            Visual Features
          </em>
          .
        </p>

        <p>
          When I was a child I made magazines with friends and sold them to
          family members. When the Internet became a thing I moved my creative
          endeavors into the digital space. I tought myself the required design
          and programming skills and started making websites about stuff I like.
          After some years of freelancing while in school I started my first
          serious job at 2beFOUND in Vienna to build web sites and applications.
          Nowadays I create applications that collect, analyze and move around
          large amounts of data. In April 2016 I joined the startup{' '}
          <a href="https://kiweno.com">Kiweno</a> in Vienna as a full time
          Frontend Developer. From January 2017 to Mai 2018 I was working full
          time at <a href="https://www.swell.wtf">Swell</a> as Frontend &amp;
          Mobile App Developer. Since August 2018 I work as a Senior Frontend
          Developer at <a href="https://mysugr.com">mySugr</a>.
        </p>

        <p>
          I never stopped creating websites and applications about stuff I am
          passionate about. For multiple years I ran a weblog called{' '}
          <a href="http://webadventures.at">Web Adventures</a> and over the
          years I created a number of fun side-
          <Link to="/projects">projects</Link>.
        </p>

        <p>
          I also have a <Link to="/cv">CV</Link>.
        </p>

        <h2>Contact</h2>

        <p>
          If you want to get in touch with me you can find all the information
          on the <a href="/contact">contact page</a>.
        </p>
      </Content>
    </Layout>
  );
};

export default AboutPage;

export const pageQuery = graphql`
  query {
    file(relativePath: { eq: "florian-with-notebook.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
