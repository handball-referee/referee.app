import React from 'react';
import Markdown from 'react-markdown';
import * as PropTypes from 'prop-types';
import './Rule.css';

const flatten = (text, child) => (typeof child === 'string'
  ? text + child
  : React.Children.toArray(child.props.children).reduce(flatten, text));

const Heading = ({ children, level }) => { // eslint-disable-line react/prop-types
  const text = children.reduce(flatten, '');
  const slug = text
    .toLowerCase()
    .replace(/\s+/g, '-');

  return React.createElement(`h${level}`, { id: slug }, children);
};

const Rule = ({ source }) => (
  <div className="rule">
    <Markdown source={source} renderers={{ heading: Heading }} transformImageUri={uri => `/data/diagrams/${uri}`} />
  </div>
);

Rule.propTypes = {
  source: PropTypes.string.isRequired,
};

export default Rule;
