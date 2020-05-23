import React from 'react';
import PropTypes from 'prop-types';
import Editor from '../components/editor';

const WritePage = props => {
  return (
    <div className="page">
      <Editor />
    </div>
  );
};

WritePage.propTypes = {

};

export default WritePage;
