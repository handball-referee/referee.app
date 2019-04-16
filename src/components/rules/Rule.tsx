import React, { FunctionComponent, ReactElement } from "react";
import Markdown from "react-markdown";
import "./Rule.css";

const flatten = (text: string, child: string | ReactElement): string => (
  typeof child === "string"
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text)
);

interface HeadingProps {
  level: number;
  children: ReactElement[];
}

const Heading: FunctionComponent<HeadingProps> = ({ children, level }) => {
  const text = children.reduce(flatten, "");
  const slug = text
    .toLowerCase()
    .replace(/\s+/g, "-");

  return React.createElement(`h${level}`, { id: slug }, children);
};

interface Props {
  source: string;
}

const Rule: FunctionComponent<Props> = ({ source }) => (
  <div className="rule">
    <Markdown source={source} renderers={{ heading: Heading }} transformImageUri={uri => `/data/diagrams/${uri}`} />
  </div>
);

export default Rule;
