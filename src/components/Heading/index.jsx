import React from 'react';
import Section from '../Section/index.jsx';
import * as styles from './styles.module.scss';
import work from '../../images/work.svg';
import '../../styles.scss';

const Heading = (props) => {
  return (
    <Section containerClassName={styles.container}>
      <div>
        <h4 className={styles.tagline}>Submitted by Cassie Sloan</h4>
        <h1 className={styles.title}>Divipay front end challenge submission</h1>
        <a className={styles.button} href="#mygithub">
          Github
        </a>
      </div>
      <div className={styles.imageContainer}>
        <img src={work} />
      </div>
    </Section>
  );
};
export default Heading;
