# Clean-vas

#### Censor Lyrics for vulgarity, {27/10/24}

#### By **Mwangi Joseph**

## Description
This application censor lyrics to hash curse words among a pool of other words. It simply takes a song title as input and outputs the censored version of the lyrics. Easy, right?

## Setup/Installation Requirements
* This is a great place
* to list setup instructions
* in a simple
* easy-to-understand
* format
{Leave nothing to chance! You want it to be easy for potential users, employers and collaborators to run your app. Do I need to run a server? Do I need to install any dependencies? How should I set up my databases? Is there other code this app depends on?}

## Known Bugs
{Are there issues that have not yet been resolved that you want to let users know you know? Outline any issues that would impact use of your application. Share any workarounds that are in place. }

## Technologies Used
Apart from the common javascript libraries used, HTTP requests using axios are made to get the tracks and subsequently lyrics.
A web scraper(Pupeteer) is used to extract the lyric text form the Genius API, that returns the path to a specific song's lyrics.
A hashing algorithm is used to identify explicit content and then hash them. This algortithm is still being worked on. 
Finally, an output of "clean" lyrics is given.
{Tell me about the languages and tools you used to create this app. Assume that I know you probably used HTML and CSS. If you did something really cool using only HTML, point that out.}

## Support and contact details
Have you noticed a bug? Or do you have a great idea? Contact me via email at jozi.mwangi@gmail.com.
Or app me at +254794718424.

### License
*{Determine the license under which this application can be used.  See below for more details on licensing.}*
Copyright (c) {2024} **{Mwangi Joseph}**
  