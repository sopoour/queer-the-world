import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

html {
  color: black;
  font-size: 14px;
  font-family: "Roboto", sans-serif;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  background-color: #f5f4e2;
  -webkit-tap-highlight-color: transparent;
  overflow-x: hidden;
}


*,
*::before,
*::after {
  box-sizing: inherit;
}

img {
  image-rendering: -webkit-optimize-contrast;

  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    image-rendering: auto;
  }
}

button,
a {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
  padding: 0;
  border-width: 0;
  background: none;
  color: black;
  text-decoration: none;
  font-size: inherit;
  outline: none;
}
button {
  font-family: "Roboto", sans-serif;
  overflow: visible;
  cursor: pointer;
}

button::-moz-focus-inner {
  border: 0;
  padding: 0;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  transition: color 9999s ease-out, background-color 9999s ease-out;
  transition-delay: 9999s;
}

input::-webkit-input-placeholder {
  line-height: normal !important;
}

input {
  font-family: "Roboto", sans-serif;
}

/*
 * Remove text-shadow in selection highlight:
 * https://twitter.com/miketaylr/status/12228805301
 *
 * These selection rule sets have to be separate.
 * Customize the background color to match your design.
 */

/*
 * A better looking default horizontal rule
 */

hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid grey;
  margin: 1em 0;
  padding: 0;
}

/*
 * Remove the gap between audio, canvas, iframes,
 * images, videos and the bottom of their containers:
 * https://github.com/h5bp/html5-boilerplate/issues/440
 */

audio,
canvas,
iframe,
img,
svg,
video {
  vertical-align: middle;
}

/*
 * Remove default fieldset styles.
 */

fieldset {
  border: 0;
  margin: 0;
  padding: 0;
}

/*
 * Allow only vertical resizing of textareas.
 */

textarea {
  resize: vertical;
}

.leaflet-div-icon {
    background: transparent;
    border: none;
}
`;
