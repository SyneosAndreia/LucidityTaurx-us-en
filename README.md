# LucidityTrial

#### Installation :

Required on your machine before moving ahead
- node.js
- NPM
- Gulp 

Install dependencies locally:

```sh
$ npm install
```

#### Instructions :

To begin serving the site at localhost:3000, with live reload:

```sh
gulp serve
```

And to build manually:

```sh
gulp build
```

A build folder will be created in the root. These files will be the production ready files.


#### Other technologies of mention
- Mustache
- Google Maps API

### Adding new hospital locations
Under src/data/approvedLocations.json you'll find the json file to update. Use https://www.latlong.net to get the coordiates of an address given and update the file following the pattern.


### Updating Google Map's API key

Under src/js/ui/GoogleMaps.js under const API_KEY you'll update your new key here. More information can be found here https://developers.google.com/maps/documentation/javascript/get-api-key

### Prequlify Screener
- prequalify.luciditytrial.com hosted by X Factor Advertising