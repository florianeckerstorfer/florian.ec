import React from 'react';
import Helmet from 'react-helmet';
import CvListItem from '../components/CvListItem/CvListItem';
import Layout from '../components/Layout/Layout';
import PageContent from '../components/PageContent/PageContent';
import PageHeader from '../components/PageHeader/PageHeader';
import jobs from '../data/jobs';
import LocationPropType from '../propTypes/LocationPropType';
import './cv.scss';

const CvPage = ({ location }) => (
  <Layout location={location}>
    <div>
      <Helmet title="Curriculum vitae" />
      <div>
        <PageHeader title="Curriculum vitae" />
        <PageContent>
          <section id="eduction">
            <h3>Education</h3>

            <ul className="cv-list">
              <li className="cv-list__item">
                <em className="cv-list__item__position">Master of Science</em>,{' '}
                <strong>Software Engineering &amp; Internet Computing</strong>
                <br />
                Vienna University of Technology, Vienna, January 2018
              </li>
              <li className="cv-list__item">
                <em className="cv-list__item__position">
                  Curriculum Supplement
                </em>
                , <strong>Innovation</strong>
                <br />
                Vienna University of Technlogy, Vienna, December 2013
              </li>
              <li className="cv-list__item">
                <em className="cv-list__item__position">Bachelor of Science</em>
                , <strong>Software &amp; Information Engineering</strong>
                <br />
                Vienna University of Technology, Vienna, September 2011
              </li>
              <li className="cv-list__item">
                <em className="cv-list__item__position">Graduation Diploma</em>,{' '}
                <strong>
                  <em>HLW f&uuml;r Kommunikations- und Mediendesign</em>
                </strong>{' '}
                (specialization in communications- and media design)
                <br />
                Schulzentrum der Kreuzschwestern, Linz, June 2006
              </li>
            </ul>
          </section>

          <section id="experience">
            <h3>Experience</h3>
            <ul className="cv-list">
              {jobs.map(job => (
                <CvListItem
                  key={`${job.position}-${job.start}-${job.end}`}
                  position={job.position}
                  organisation={job.organisation}
                  location={job.location}
                  start={job.start}
                  end={job.end}
                >
                  <li>Develop web applications with React</li>
                  <li>Develop and maintain websites with Drupal</li>
                </CvListItem>
              ))}
            </ul>
          </section>

          <section id="open-source-projects">
            <h3>Open Source Projects</h3>

            <ul className="cv-list">
              <li className="cv-list__item">
                <a href="https://github.com/plumphp/plum">
                  <strong>Plum</strong>
                </a>
                <br />
                Plum is a data processing pipeline for PHP. It allows you to
                quickly write code that reads, filters, converts and writes data
                in various formats.
              </li>
              <li className="cv-list__item">
                <a href="http://bootstrap.braincrafted.com">
                  <strong>BraincraftedBootstrapBundle</strong>
                </a>
                <br />
                Bundle to easily integrate Twitter Bootstrap in a Symfony2
                project. As of November 2016 about 685k downloads.
              </li>
              <li className="cv-list__item">
                <a href="https://github.com/cocur/slugify">
                  <strong>Slugify</strong>
                </a>
                <br />
                Library to create URL slugs from strings with support for a wide
                range of languages. As of November 2016 over 2.8m downloads.
              </li>
              <li className="cv-list__item">
                <a href="http://symfony.com">
                  <strong>Symfony2 Forms Framework</strong>
                </a>
                <br />
                Contributed with three other students to a framework to create,
                validate and submit forms. Part of the Symfony2 Framework.
              </li>
            </ul>
          </section>

          <section id="private-projects">
            <h3>Private Projects</h3>

            <ul className="cv-list">
              <li className="cv-list__item">
                <a href="http://similar.fm">
                  <strong>Similar.fm</strong>
                </a>
                , March 2012
                <br />
                Web Service to easily open music related to the music a user is
                currently listening to in Spotify.
              </li>
              <li className="cv-list__item">
                <strong>Tryp</strong>, August 2011
                <br />
                Web Service to visualize the previous whereabouts of a Twitter
                user on a map. No longer online.
              </li>
              <li className="cv-list__item">
                <strong>RegExp Tester</strong>, July 2010
                <br />
                Web Service to easily test regular expressions. No longer
                online.
              </li>
              <li className="cv-list__item">
                <strong>Ninjawhois</strong>, April 2009
                <br />
                Web Service to check the availability of multiple domains. No
                longer online.
              </li>
              <li className="cv-list__item">
                I am working on a wide variety of private projects since 1999. A
                comprehensive overview is presented at the{' '}
                <a href="projects.html">projects</a> page.
              </li>
            </ul>
          </section>

          <section id="languages">
            <h3>Languages</h3>

            <ul className="cv-list">
              <li className="cv-list__item">
                <strong>German</strong>
                <br />
                mother tongue
              </li>
              <li className="cv-list__item">
                <strong>English</strong>
                <br />
                Excellent reading (C2) and very good writing and speaking skills
                (C1).
              </li>
              <li className="cv-list__item">
                <strong>Spanish</strong>
                <br />
                Basic reading, writing and speaking skills (A2).
              </li>
              <li className="cv-list__item">
                <strong>French</strong>
                <br />
                <a href="https://www.duolingo.com/florianec">A little bit</a>.
              </li>
            </ul>
          </section>

          <p>
            A PDF version of my CV is also available:{' '}
            <a href="/cv.pdf" title="CV Florian Eckerstorfer (PDF format)">
              cv.pdf
            </a>
            .
          </p>
        </PageContent>
      </div>
    </div>
  </Layout>
);

CvPage.propTypes = {
  location: LocationPropType.isRequired,
};

export default CvPage;
