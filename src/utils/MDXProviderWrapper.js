/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { MDXEmbedProvider } from 'gatsby-plugin-mdx-embed';

import { Button, Code, Box, Heading, Text, useTheme } from '@chakra-ui/react';
import PrismHighlight, { defaultProps } from 'prism-react-renderer';
import prismTheme from 'prism-react-renderer/themes/nightOwl';

import { Image } from '../components';

const H1 = (props) => <Heading as="h1" {...props} />;
const H2 = (props) => <Heading as="h2" {...props} />;
const H3 = (props) => <Heading as="h3" {...props} />;
const H4 = (props) => <Heading as="h4" {...props} />;
const H5 = (props) => <Heading as="h5" {...props} />;
const H6 = (props) => <Heading as="h6" {...props} />;
const P = (props) => (
  <Box as="p" marginTop="1rem" marginBottom="1rem" {...props} />
);
const Aside = (props) => {
  const theme = useTheme();

  const colors = {
    default: theme.colors.pink,
    info: theme.colors.yellow,
    note: theme.colors.green,
    error: theme.colors.red,
    warning: theme.colors.red,
  };

  const selectedColor = colors[props.type] || colors.default;

  return (
    <Box
      borderLeft="8px solid"
      padding="1rem 0 1rem 2rem"
      borderColor={selectedColor[400]}
      backgroundColor={selectedColor[50]}
      margin="2rem 0 2rem -2rem"
      color={theme.colors.gray[900]}
      {...props}
    />
  );
};

const Highlight = (props) => {
  return <Text as="mark" {...props} />;
};

const InlineCode = (props) => (
  <Code
    color="rgb(214, 222, 235)"
    whiteSpace="pre"
    backgroundColor="#1a1a1d"
    borderRadius=".3em"
    padding="0.1ch 1ch"
    {...props}
  />
);

const Pre = (props) => {
  const classNames = props.children.props.className || '';
  const matches = classNames.match(/language-(?<lang>.*)/);
  return (
    <Box marginBottom="2rem" marginTop="2rem">
      <PrismHighlight
        {...defaultProps}
        theme={prismTheme}
        code={props.children.props.children}
        language={
          matches && matches.groups && matches.groups.lang
            ? matches.groups.lang
            : ''
        }
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => {
              // TODO: why is this needed though?
              if (i === tokens.length - 1) return null;
              return (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              );
            })}
          </pre>
        )}
      </PrismHighlight>
    </Box>
  );
};

const ImageWrapper = (props) => <Image marginBottom="1rem" {...props} />;

const components = {
  Aside,
  Button,
  Highlight,
  Image: ImageWrapper,
  inlineCode: InlineCode,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: P,
  pre: Pre,
};

// eslint-disable-next-line react/prop-types
const MDXProviderWrapper = ({ children }) => (
  <MDXEmbedProvider>
    <MDXProvider components={components}>{children}</MDXProvider>
  </MDXEmbedProvider>
);

export default MDXProviderWrapper;
