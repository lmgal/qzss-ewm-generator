# QZSS Early Warning System (EWS) Message Generator

A web application with intuitive interface for generating an EWS Message formatted in Common Alert Message Format (CAMF), 
meant for broadcasting using QZSS L1S signal in the form of a 122-bit-wide binary string.

## Background

Global Navigation Satellite Systems (GNSS) is the term for all navigation satellite 
systems, such as GPS, GLONASS, and QZSS. Aside for navigation, these systems are also 
being used for other purposes such as Early Warning Systems. Using QZSS, 
disaster information and instructions can be sent and broadcasted via 250-bit QZSS L1S 
signal. However, there is a constraint on the amount of data that can be sent because
other bits are for other use, limiting EWS messages to 122 bits.

This tool serves as an easy way to generate these binary messages by using a Map with search 
functionalities (for getting the coordinates without having to manually convert to binary) and 
ellipse and marker displays for the ellipse definition and other information.

## How to run on local machine

This web application uses the following technologies:
- [ReactJS](https://react.dev/) as the front-end framework
- [Leaflet](https://leafletjs.com/) for the Map, more specifically [React-Leaflet](https://react-leaflet.js.org/)
- [TailwindCSS](https://tailwindcss.com/) for styling.

To run on your local machine,
1. Install [NodeJS](https://nodejs.org/en)
2. Clone the repository
3. Navigate inside the directory of the repository using a terminal.
4. Run `npm install` on the terminal to install dependencies
5. Run `npm run dev` on the terminal to launch a development server

## Credits
- Prof. Keiko Shimazu (Shimazu Lab, AIIT) - Used their Excel EWM generator as reference
- Prof. Dinesh Manandhar - For his lecture on QZSS EWS Message 

## Todo
1. Finish the rest of quantitative or detailed information on hazards
2. Create unit tests. 
3. Make the web application mobile-friendly
