/* global graphql */

import Helmet from 'react-helmet';
import Img from 'gatsby-image';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import React from 'react';

import PageContent from '../components/PageContent/PageContent';
import PageHeader from '../components/PageHeader/PageHeader';

const AboutPage = ({ data }) => {
  const florianSizes = data.file.childImageSharp.sizes;

  return (
    <div>
      <Helmet title="About Florian Eckerstorfer" />
      <div>
        <PageHeader title="About" />
        <PageContent>
          <p>
            Hello. My name is Florian Eckerstorfer. I am a Web Developer based
            in Vienna, Europe. When not writing code I like reading, walking and
            music. I go to a lot of{' '}
            <Link to="/concerts">
              <span role="img" aria-labelledby="e-guitar" className="emoji">
                🎸
              </span>concerts
            </Link>{' '}
            and always want to{' '}
            <Link to="/travel">
              <span role="img" aria-labelledby="train" className="emoji">
                🚋
              </span>travel
            </Link>{' '}
            more.
          </p>

          <Img sizes={florianSizes} alt="Florian Eckerstorfer" />

          <p>
            You can find me at numerous social networks and web services,
            including <a href="http://twitter.com/Florian_">Twitter</a>,{' '}
            <a href="https://pinboard.in/u:florian.eckerstorfer">Pinboard</a>,{' '}
            <a href="http://instagram.com/florian_">Instagram</a> and{' '}
            <a href="http://www.last.fm/user/feredir">Last.fm</a>. You can find
            code I write on{' '}
            <a href="https://github.com/florianeckerstorfer">Github</a>,{' '}
            <a href="https://packagist.org/users/florianeckerstorfer/">
              Packagist
            </a>,
            <a href="https://www.npmjs.org/~florianeckerstorfer">NPM</a> and
            <a href="https://rubygems.org/profiles/florianeckerstorfer">
              RubyGems
            </a>. You can also send me an{' '}
            <a href="mailto:florian@eckerstorfer.net">email</a>.
          </p>

          <h2>Biography</h2>

          <p>
            I was born and raised in Linz, Austria and graduated from
            <em>HLW für Kommunikations- und Mediendesign</em>, which included an
            education in Econimics as well as in communication and media design.
            After school I moved to Vienna to study{' '}
            <em>Software & Information Engineering</em> at the Vienna University
            of Technology. In July 2011 I received my bachelors degree and
            started my Masters in
            <em>Software Engineering & Internet Computing</em>. In March 2012 I
            also began working on a supplement curriculum in <em>Innovation</em>,
            which I received in March 2014. I finished my Masters studies in
            January 2018 by writing my thesis on{' '}
            <em>
              Machine Learning Approach for Web Ranking Identification based on
              Visual Features
            </em>.
          </p>

          <p>
            When I was a child I made magazines with friends and sold them to
            family members. When the Internet became a thing I moved my creative
            endeavors into the digital space. I tought myself the required
            design and programming skills and started making websites about
            stuff I like. After some years of freelancing while in school I
            started my first serious job at 2beFOUND in Vienna to build web
            sites and applications. Nowadays I create applications that collect,
            analyze and move around large amounts of data. In April 2016 I
            joined the startup <a href="https://kiweno.com">Kiweno</a> in Vienna
            as a full time Frontend Developer. Since January 2017 I am working
            full time at <a href="https://www.swell.wtf">Swell</a> as Frontend
            &amp; Mobile App Developer.
          </p>

          <p>
            I never stopped creating websites and applications about stuff I am
            passionate about. For multiple years I ran a weblog called{' '}
            <a href="http://webadventures.at">Web Adventures</a> and I
            constantly do new, small <Link to="/projects/">projects</Link>.
          </p>
        </PageContent>
      </div>
    </div>
  );
};

AboutPage.defaultProps = {
  data: {},
};

AboutPage.propTypes = {
  data: PropTypes.shape({
    file: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        sizes: PropTypes.shape({}),
      }),
    }),
  }),
};

export const query = graphql`
  query GatsbyImageSampleQuery {
    file(relativePath: { eq: "florian.jpg" }) {
      childImageSharp {
        sizes(maxWidth: 1520) {
          ...GatsbyImageSharpSizes
        }
      }
    }
  }
`;

export default AboutPage;
