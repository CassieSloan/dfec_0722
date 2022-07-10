import React, { useState } from 'react';
import { InView } from 'react-intersection-observer';

const OnVisible = ({
  as,
  className,
  visibleClassName,
  id,
  onClick = () => {},
  onChange = () => {},
  style,
  threshold,
  children,
  dangerouslySetInnerHTML,
  triggerOnce,
}) => {
  const [visible, setVisible] = useState(false);

  const onChangeHandler = (isVisible, entry) => {
    setVisible(isVisible);
    onChange(isVisible, entry);
  };

  return (
    <InView
      as={as || 'div'}
      className={`${className || ''} ${visible ? `visible ${visibleClassName || ''}` : ''}`}
      style={style}
      id={id || ''}
      triggerOnce={triggerOnce === undefined || triggerOnce !== false}
      onClick={onClick}
      onChange={onChangeHandler}
      threshold={threshold || 0.4}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
    >
      {children}
    </InView>
  );
};

export default OnVisible;
