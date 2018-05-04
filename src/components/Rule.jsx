import React from 'react';
import Markdown from 'react-markdown';
import './Rule.css';

function flatten(text, child) {
  return typeof child === 'string'
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text)
}

function Heading({ children, level }) {
  const text = children.reduce(flatten, '');
  const slug = text
    .toLowerCase()
    .replace(/\s+/g, '-');

  return React.createElement(`h${level}`, {id: slug}, children)
}

export default ({ source }) => (
  <div className="rule">
    <Markdown source={source} renderers={{heading: Heading}} transformImageUri={(uri) => `../data/diagrams/${uri}`} />
  </div>
)
