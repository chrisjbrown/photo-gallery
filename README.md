FYI I wanted to deploy this to gh-pages but I'm using react-router with the BrowserRouter and
using pushState which doesn't play nice with gh-pages.

you can run the project locally by running

`npm start`

# React photo gallery assignment - post analysis

I started by going over the assignment and looking at the static data file. I noticed that while
the assignment asked me to paginate over the photos I realized this wouldn't be possible using all
of the static data in the file. The file also contains the page the user is on, total pages, and
how many photos to show per page. In orderr to simulate a working server with search and pagination
I chose to just use the photos property from the data file and disregard the other properties. I also
converted the file to .js to simplify updating/persist the data via the edit photo modal.

I chose react as the framework decision was left open and I enjoy working in React expecially when
the view will have multiple re-renders based on search, perpage, and pagination.

I decided early on I would want the parameters that control the filter/search/page of the photos to 
be persisted in the URL to simulate a larger application where a user can share there URL with another
or keep there search link for later. For this reason I chose to use react-router despite only having
one route that accepts an optional parameter.

Changing the number of displayed photos per page was not in the requirements but was easy enough
to implement so I added it. I also noticed some of the image URL's are broken. So I made an image
component that fallsback to a local image sad face. I also made a few design/text changes
as I thought it made more sense but other than that tried to stick closely to the wirefrrame design.

I used Create React App to bootstrap the project

## Dependencies

- styled-components - css
- react-router - routing / search params

## Dev Dependencies

- jest-styled-components

## CSS

I opted for using `styled-components` as my CSS solution as it's the solution I'm most familiar with
and I didn't have a strong preference for another library. I chose not to use a css library.
So all of the CSS is my own (except for a CSS reset from post-css)

### Improvements

As I didn't write much CSS I didn't feel the need to extract it for better organization except
in the case of the `Gallery` As this was a larger component I extracted the CSS just to see how
I might organize styles as the application grew in size.
Ideally I would do something like this for all styles.

### JS

I used react-router for the routing system that renders `src/App.js` and one page `src/pages/Gallery.js`
with or without an optional parameter `photoId` to decide to render the photo modal or not.

I chose not to use a component library so all components are my own. Some are extremely simple But I felt
it better to start extracting any areas of the application that were being re-used to show how the application may grow.
Other components are more interesting `src/components/Button.js` accepts a prop to style itself differently. `src/components/Modal.js` accepts props as function to call for cancel and confirm.

### Improvements

The MockAPI file is of course a stand in for what would be HTTP calls and I kept them as basic as 
possible but they could be better made to also incorporate things like including other properties
in the search. The search input should also be debounced so that the amount of requests is limited
to what is actually intended by the user. 

## State management

I chose not to use redux as it would have required a lot of boilerplate only to keep a store that only
keeps an array of photos and a property to store the page. Instead I chose to use the useReducer
hook within the Gallery page to manage the state of photos and pages, removing the need for redux.

### Improvements

As the application would grow it wouldn't be difficult to add a redux store and take this local
reducer and add it to store. I also created a selector for the current photo to be selected by `photoId` so that this
could also be easily abstracted away.
[selector](https://github.com/chrisjbrown/photo-gallery/blob/6e5adcd4fe5704cec91c11e7be0cb8c320dbde8e/src/pages/Gallery.js#L52-L52)
## Testing

To conserve time I chose to only test the gallery component as it is the most complex. And based
on this I think it's easy to see how the other smaller components could be tested as well.

`src/pages/Gallery.test.js` tests that the list of photos is correctly rendered based on page, perpage, and search

### Improvements

Ideally all files would have unit/integration tests.

## Done differently

Found a way to make the application more beautiful haha
but I thought it better to focus on the code implementation.

And I didn't want to use a component library / css library
so that my work and the work of the libraries is not confused

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
