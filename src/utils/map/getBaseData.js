
import GeoJSON from 'ol/format/GeoJSON';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Fill, Stroke, Text, Style } from 'ol/style';
import { polygonGeoJson, lineGeoJson, docklineGeoJson } from '@/components/GisData/gisData.js'

export function getPolygonLyr() {
    //机场---多边形
    let featuresPolygon = new GeoJSON().readFeatures(polygonGeoJson, { "featureProjection": "EPSG:3857" });
    let stylePolygon = new Style({
        fill: new Fill({
            color: 'rgba(43,45,46,0)'
        }),
        stroke: new Stroke({
            color: 'rgba(30,144,255)'
        }),
    });
    let layerPolygon = new VectorLayer({
        source: new VectorSource({
            features: featuresPolygon
        }),
        style: stylePolygon
    });
    return layerPolygon;
}

export function getLineLyr() {
    //机场---线
    let featuresLine = new GeoJSON().readFeatures(lineGeoJson, { "featureProjection": "EPSG:3857" });
    let styleLine = new Style({
        fill: new Fill({
            color: 'rgba(43,45,46,0)'
        }),
        stroke: new Stroke({
            color: 'rgba(30,144,255)'
        }),
    });
    let layerLine = new VectorLayer({
        source: new VectorSource({
            features: featuresLine
        }),
        style: styleLine
    });
    return layerLine;
}
export function getDockLineLyr() {
    //机位---线
    let featuresLine = new GeoJSON().readFeatures(docklineGeoJson, { "featureProjection": "EPSG:3857" });
    for (let i = 0; i < featuresLine.length; i++) {
        let feature = featuresLine[i];
        let properties = feature.getProperties();
        let styleDock = new Style({
            stroke: new Stroke({
                color: "orange"
            }),
            text: new Text({
                text: properties.dockCode + "",
                font: "18px",
                fill: new Fill({
                    color: "#fff"
                })
            })
        });
        feature.setStyle(styleDock);
        feature.setId(feature.getProperties().dockCode);
    }

    let layerLine = new VectorLayer({
        source: new VectorSource({
            features: featuresLine
        }),
        // zIndex: 10
        //     visible: false
    });
    return layerLine;
}