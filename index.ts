/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import markers from "./markers.json"

function addMarker(map, position, label, text): void {
  const infowindow = new google.maps.InfoWindow({
    content: text,
  });

  const marker = new google.maps.Marker({
    position: position,
    map,
    label: {
      color: 'white',
      // fontWeight: 'bold',
      text: label,
    },
    icon: {
      labelOrigin: new google.maps.Point(11, 50),
      url: './pointer_small.png',
      // size: new google.maps.Size(95, 393),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(11, 40),
    },
  });

  marker.addListener("click", () => {
    infowindow.open({
      anchor: marker,
      map,
      shouldFocus: false,
    });
  });
}

function initMap(): void {
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      center: { lat: 0, lng: 0 },
      zoom: 3,
      streetViewControl: false,
      mapTypeControlOptions: {
        mapTypeIds: ["moon"],
      },
      backgroundColor: '#000',
    }
  );

  markers.forEach(marker => {
    addMarker(map, marker.position, marker.label, marker.text);
  });

  const moonMapType = new google.maps.ImageMapType({
    getTileUrl: function (coord, zoom): string {
      const normalizedCoord = getNormalizedCoord(coord, zoom);

      if (!normalizedCoord) {
        return "";
      }

      const bound = Math.pow(2, zoom);
      console.log({ coord, normalizedCoord, zoom, bound })
      // return "/MapA.jpg"
      return `./tiles/${zoom}/tile_${normalizedCoord.x}_${(normalizedCoord.y)}.png`
      // console.log(zoom, normalizedCoord.x, (bound - normalizedCoord.y - 1), "https://mw1.google.com/mw-planetary/lunar/lunarmaps_v1/clem_bw" +
      // "/" +
      // zoom +
      // "/" +
      // normalizedCoord.x +
      // "/" +
      // (bound - normalizedCoord.y - 1) +
      // ".jpg")

      // return (
      //   "https://mw1.google.com/mw-planetary/lunar/lunarmaps_v1/clem_bw" +
      //   "/" +
      //   zoom +
      //   "/" +
      //   normalizedCoord.x +
      //   "/" +
      //   (bound - normalizedCoord.y - 1) +
      //   ".jpg"
      // );
    },
    tileSize: new google.maps.Size(256, 256),
    maxZoom: 6,
    minZoom: 0,
    // @ts-ignore TODO 'radius' does not exist in type 'ImageMapTypeOptions'
    radius: 1738000,
    name: "Świat",
  });

  map.mapTypes.set("moon", moonMapType);
  map.setMapTypeId("moon");
}

// Normalizes the coords that tiles repeat across the x axis (horizontally)
// like the standard Google map tiles.
function getNormalizedCoord(coord, zoom) {
  const y = coord.y;
  let x = coord.x;

  // tile range in one direction range is dependent on zoom level
  // 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
  const tileRange = 1 << zoom;

  // don't repeat across y-axis (vertically)
  if (y < 0 || y >= tileRange) {
    return null;
  }

  // repeat across x-axis
  if (x < 0 || x >= tileRange) {
    // x = ((x % tileRange) + tileRange) % tileRange;
    return null;
  }

  return { x: x, y: y };
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
