import React from 'react';
import Layout from '../layouts/Layout';
import SEO from '../components/SEO/SEO';
import H1 from '../components/H1/H1';
import Content from '../components/Content/Content';
import styles from './cv.module.css';

const CvPage: React.FC = () => (
  <Layout>
    <SEO
      title="Curriculum vitae"
      keywords={[
        'florian eckerstorfer',
        'frontend developer',
        'web developer',
        'software developer',
        'software engineering',
        'cv',
        'curriculum vitae',
        'education',
      ]}
    />
    <H1>Curriculum vitae</H1>

    <Content>
      <section id="eduction">
        <h2>Education</h2>

        <ul className={styles.list}>
          <li className={styles.item}>
            <em>Master of Science</em>,{' '}
            <strong>Software Engineering &amp; Internet Computing</strong>
            <br />
            Vienna University of Technology, Vienna, AT, January 2018
          </li>
          <li className={styles.item}>
            <em>Curriculum Supplement</em>, <strong>Innovation</strong>
            <br />
            Vienna University of Technlogy, Vienna, AT, December 2013
          </li>
          <li className={styles.item}>
            <em>Bachelor of Science</em>,{' '}
            <strong>Software &amp; Information Engineering</strong>
            <br />
            Vienna University of Technology, Vienna, AT, September 2011
          </li>
          <li className={styles.item}>
            <em>Graduation Diploma</em>,{' '}
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
        <h2>Experience</h2>
        <ul className={styles.list}>
          <li className={styles.item}>
            <em>Senior Frontend Developer</em>,{' '}
            <a href="https://mysugr.com">
              <strong>mySugr</strong>
            </a>
            , Vienna, AT, since August 2018
            <ul>
              <li className={styles.descriptionItem}>
                Developing web applications with React
              </li>
              <li className={styles.descriptionItem}>
                Developing web sites with React and next.js
              </li>
              <li className={styles.descriptionItem}>
                Software architecture for new and legacy applications
              </li>
              <li className={styles.descriptionItem}>
                Creating build and deployment tools
              </li>
              <li className={styles.descriptionItem}>
                Technical planning of new projects
              </li>
            </ul>
          </li>
          <li className={styles.item}>
            <em>Frontend &amp; Mobile App Developer</em>,{' '}
            <a href="https://www.swell.wtf">
              <strong>Swell</strong>
            </a>
            , Vienna, AT, since January 2017
            <ul>
              <li className={styles.descriptionItem}>
                Developing web views for chatbots with React and InfernoJS
              </li>
              <li className={styles.descriptionItem}>
                Developing mobile apps with React Native for iOS and Android
              </li>
              <li className={styles.descriptionItem}>
                Developing business tools with Angular 2
              </li>
              <li className={styles.descriptionItem}>
                Developing websites with HTML, CSS and JavaScript
              </li>
            </ul>
          </li>
          <li className={styles.item}>
            <em>Frontend Developer</em>,{' '}
            <a href="https://kiweno.com">
              <strong>Kiweno GmbH</strong>
            </a>
            , Vienna, AT, April - November 2016
            <ul>
              <li className={styles.descriptionItem}>
                Developing a responsive web app with HTML, CSS, JavaScript and
                AngularJS
              </li>
              <li className={styles.descriptionItem}>
                Developing ecommerce website with WordPress
              </li>
            </ul>
          </li>
          <li className={styles.item}>
            <em>Web Developer</em>,{' '}
            <strong>2bePUBLISHED Internet Services Austria GmbH</strong>,
            Vienna, AT, June 2009 - March 2016
            <ul>
              <li className={styles.descriptionItem}>
                Frontend Development (HTML, CSS, JavaScript, AngularJS)
              </li>
              <li className={styles.descriptionItem}>
                Web Development with PHP and Symfony
              </li>
              <li className={styles.descriptionItem}>
                Web Data Extraction and Business Intelligence
              </li>
            </ul>
          </li>
          <li className={styles.item}>
            <em>Web Developer</em>,{' '}
            <strong>2beFOUND Performance Marketing GmbH</strong>, Vienna, AT,
            August 2008 - May 2009
            <ul>
              <li className={styles.descriptionItem}>
                Frontend Development (HTML, CSS, JavaScript)
              </li>
              <li className={styles.descriptionItem}>
                Web Development with PHP and Symfony
              </li>
            </ul>
          </li>
          <li className={styles.item}>
            <em>Freelancer</em>, January 2002 - May 2009
            <ul>
              <li className={styles.descriptionItem}>Frontend Development</li>
              <li className={styles.descriptionItem}>Web Development</li>
              <li className={styles.descriptionItem}>Web Design</li>
              <li className={styles.descriptionItem}>Consulting</li>
            </ul>
          </li>
          <li className={styles.item}>
            <em>Internship</em>, <strong>Strobl)Kriegner Group</strong>, Linz,
            AT, August 2004
            <ul>
              <li className={styles.descriptionItem}>Web Design</li>
              <li className={styles.descriptionItem}>Print Design</li>
              <li className={styles.descriptionItem}>Flash Development</li>
            </ul>
          </li>
          <li className={styles.item}>
            <em>Internship</em>, <strong>CREATEAM Werbeagentur GmbH</strong>,
            Linz, AT, August 2003, June - July 2004
            <ul>
              <li className={styles.descriptionItem}>Web Design</li>
              <li className={styles.descriptionItem}>Print Design</li>
              <li className={styles.descriptionItem}>Frontend Development</li>
            </ul>
          </li>
        </ul>
      </section>

      <section id="open-source-projects">
        <h2>Open Source Projects</h2>

        <ul className={styles.list}>
          <li className={styles.item}>
            <a href="https://github.com/plumphp/plum">
              <strong>Plum</strong>
            </a>
            <br />
            Plum is a data processing pipeline for PHP. It allows you to quickly
            write code that reads, filters, converts and writes data in various
            formats.
          </li>
          <li className={styles.item}>
            <a href="http://bootstrap.braincrafted.com">
              <strong>BraincraftedBootstrapBundle</strong>
            </a>
            <br />
            Bundle to easily integrate Twitter Bootstrap in a Symfony2 project.
            As of June 2018 over 1m downloads.
          </li>
          <li className={styles.item}>
            <a href="https://github.com/cocur/slugify">
              <strong>Slugify</strong>
            </a>
            <br />
            Library to create URL slugs from strings with support for a wide
            range of languages. As of Mai 2019 about 12 million downloads.
          </li>
          <li className={styles.item}>
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
        <h2>Private Projects</h2>

        <ul className={styles.list}>
          <li className={styles.item}>
            <strong>Similar.fm</strong>, March 2012
            <br />
            Web Service to easily open music related to the music a user is
            currently listening to in Spotify. No longer online.
          </li>
          <li className={styles.item}>
            <strong>Tryp</strong>, August 2011
            <br />
            Web Service to visualize the previous whereabouts of a Twitter user
            on a map. No longer online.
          </li>
          <li className={styles.item}>
            <strong>RegExp Tester</strong>, July 2010
            <br />
            Web Service to easily test regular expressions. No longer online.
          </li>
          <li className={styles.item}>
            <strong>Ninjawhois</strong>, April 2009
            <br />
            Web Service to check the availability of multiple domains. No longer
            online.
          </li>
          <li className={styles.item}>
            I am working on a wide variety of private projects since 1999. A
            comprehensive overview is presented at the{' '}
            <a href="projects.html">projects</a> page.
          </li>
        </ul>
      </section>

      <section id="languages">
        <h2>Languages</h2>

        <ul className={styles.list}>
          <li className={styles.item}>
            <strong>German</strong>
            <br />
            mother tongue
          </li>
          <li className={styles.item}>
            <strong>English</strong>
            <br />
            Excellent reading (C2) and very good writing and speaking skills
            (C1).
          </li>
          <li className={styles.item}>
            <strong>Spanish</strong>
            <br />
            Basic reading, writing and speaking skills (A2).
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
    </Content>
  </Layout>
);

export default CvPage;
