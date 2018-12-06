# react-showcase

A list of elements (restaurants) which can be searched and sorted.

[**LIVE DEMO**](http://www.oshell.online/react-showcase/)

## User Documentaion

  - displays restaurants in 3 states ('open'/'order ahead'/'closed')
  - restaurant can be added to favorites and those will be displayed on top
  - can be sorted by certain values (asc/desc)
  - can be filtered by search term

## Developer Documentation

  - no database (frontend showcase) - restaurants exported in src/data/restaurants.js
  - uses redux for state management

### Project Structure

```sh
src/
    /actions # action creators for redux
    /components # presentational components (stateless)
    /constants # style and business logic constants
    /container # smart components using redux
    /controller # business logic for reducers
    /data # sample data
    /reducers # redux reducers
```

### Installation

```sh
$ git clone https://github.com/oshell/react-showcase.git
$ cd react-showcase
$ npm install
$ npm start
```

### Testing

Tests can be found under ```./src/__tests__```.  Enter watch mode with ```npm test``` and press 'a' to run the tests.
