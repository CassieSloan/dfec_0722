import React from 'react';
import Section from '../Section/index.jsx';
import './styles.module.scss';

const Heading = (props) => {
  return (
    <Section>
      <h4>A tagline here that's relevant</h4>
      <h1>Divipay front end challenge submission</h1>
      <a href="#mygithub">Github</a>
    </Section>
  );
};
export default Heading;
