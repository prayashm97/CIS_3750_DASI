import React from 'react';
import PropTypes from 'prop-types';

const cont = {
  backgroundColor: '#eee',
  overflow: 'hidden',
  position: 'relative',
};

const Thumbnail = ({src}) => {


  return (
    <div
      style={{ margin:"15px", ...cont }}
    >
      <img
        src={src}
        height={'180px'}
        alt={`${src} DASI`}
        width={'320px'}
        cursor={"default"}
      />
    </div>
  );
};

Thumbnail.propTypes = {
  src: PropTypes.string,
};

export default Thumbnail;

