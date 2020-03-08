import { Scene, PointLayer, Popup } from "@antv/l7";
import { GaodeMap } from "@antv/l7-maps";

const scene = new Scene({
  id: "map",
  map: new GaodeMap({
    pitch: 0,
    style: "dark",
    center: [112, 23.69],
    zoom: 1.5
  })
});
fetch(
  "https://raw.githubusercontent.com/pengx12/dvtry1/master/src/whc-sites-2019.csv"
)
  .then(res => res.text())
  .then(data => {
    const pointLayer = new PointLayer({})
      .source(data, {
        parser: {
          type: "csv",
          x: "longitude",
          y: "latitude"
        }
      })
      .shape("circle")
      .active(true)
      .animate(true)
      .size(36)
      .color("category", ["#4cfd47", "#F6BD16", "#E86452"])
      .style({
        opacity: 1
      });
    pointLayer.on("mousemove", e => {
      const popup = new Popup({
        offsets: [0, 0],
        closeButton: false
      })
        .setLnglat(e.lngLat)
        .setHTML(`<span>${e.feature.name_en}\n\n ${e.feature.category}</span>`);
      scene.addPopup(popup);
    });
    scene.addLayer(pointLayer);
  });
