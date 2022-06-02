# Google Maps JavaScript Sample

This sample is generated from @googlemaps/js-samples located at
https://github.com/googlemaps/js-samples.

## Setup

```sh
npm i
npm start  # development
npm run build  # production
```

## Feedback

For feedback related to this sample, please open a new issue on
[GitHub](https://github.com/googlemaps/js-samples/issues).

base tile
```
convert -background black -gravity center -thumbnail 2624x2624 -extent 2624x2624 public/MapA.jpg public/tiles/map.png
convert -background black -gravity center -thumbnail 256x256 public/tiles/map.png public/tiles/0/tile_0_0.png
```


Resize tiles 
zoom:   0 | 1 | 2 | 3 | 4  | 5  |
factor: 1 | 2 | 4 | 8 | 16 | 32 |
```
 convert public/tiles/map.png -crop 41x41 -resize 256x256 -set filename:tile "%[fx:page.x/256]_%[fx:page.y/256]" +repage +adjoin "public/tiles/6/tile_%[filename:tile].png"
```