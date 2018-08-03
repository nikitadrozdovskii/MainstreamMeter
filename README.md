# Mainstream Meter

## General Description:
Mainstream Meter is a front end single page application (SPA) using Spotify API that I built to practice my knowledge in vanilla Javascript, HTML, CSS/Sass and Responsive Web Design. It allows user to find out how popular an artist, song or album is on Spotify popularity scale. To implement SPA functionality I wrote a custom router that asynchronously loads HTML code  representing different “pages” without page reload. URL hash represents current page name, so user can use browser navigation. Mainstream Meter achieves responsiveness and great UX on all devices through media queries and responsive images. 

### Technology used:
HTML, CSS/Sass, plain Javascript, Spotify API + several npm packages.

### User Stories:
* I am a user, I login from desktop and want to find out how popular some band is today. 

* I am a user, I login from my smartphone and want to find out how popular some song is today.

### Notable features:
* Custom router. This app uses custom-built router, that is asynchronously loading HTML elements onto the page via Fetch API to imitate SPA functionality - page change without page reload. 

* Responsive design. Mainstream Meter is fully responsive across a wide range of devices using media queries and responsive images. Units used for majority of properties are rem, vw, vh for best experience of users with both default and custom browser font size. 

* Login via token. To login user is redirected to Spotify website, which returns token in URL hash. Token is extracted after redirect and stored in Local Storage reflecting expiration time. If user reloads page, valid token will allow user to use app immediately, while expired token would ask user to sign in. 


