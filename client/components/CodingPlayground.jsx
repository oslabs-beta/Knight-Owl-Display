import React from 'react';
import { Playground } from 'graphql-playground-react';

export default function CodingPlayground() {
  return (
    <Playground endpoint='https://rickandmortyapi.com/graphql' codeTheme={{
                property: "#FFF",
  // comment: "#FFF",
  // punctuation: "#FFF",
  // keyword: "#FFF",
  def: "#FFF",
  qualifier: "#FFF",
  attribute: "#FFF",
  number: "#FFF",
  // string: "#FFF",
  // builtin: "#FFF",
  // string2: "#FFF",
  // variable: "#FFF",
  meta: "#FFF",
  // atom: "#FFF",
  // ws: "#FFF",
  selection: "#FFF",
  cursorColor: "#FFF",
                editorBackground: "#FFFF", resultBackground: "#C9A09E",
                leftDrawerBackground: "#C9A09E",
                rightDrawerBackground: "#C9A09E",
                }}/>
  )
}
