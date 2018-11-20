import React from 'react';
import PropTypes from 'prop-types';

const cont = {
  backgroundColor: '#eee',
  cursor: 'pointer',
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
        maxheight={'180px'}
        alt={`${src} DASI`}
        maxhidth={'320px'}
        width={`auto`}
        height={'auto'}
      />
    </div>
  );
};

Thumbnail.propTypes = {
  src: PropTypes.string,
};

export default Thumbnail;

