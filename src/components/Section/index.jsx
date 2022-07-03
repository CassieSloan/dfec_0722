import React from 'react';
import * as styles from './styles.module.scss';

const isDev = process.env.NODE_ENV === 'development';

const Section = (props) => {
  const { as, className, containerClassName, children, sliceName, noContainer } = props;

  const HtmlElement = as || 'section'

  return (
    <HtmlElement
      className={`${styles.section} ${className || ''}`}
      data-slice={isDev ? sliceName : null}
    >
      {noContainer ? children : <div className={`${styles.container} ${containerClassName || ''}`}>{children}</div>}
    </HtmlElement>
  );
};

export default Section;
