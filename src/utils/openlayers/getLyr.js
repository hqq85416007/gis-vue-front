import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
/**
 * 获取OSM地图
 * @returns 
 */
export function getOSMLyr() {
    return new TileLayer({
        source: new OSM(),
    });
}
/**
 * 获取天地图
 * @returns 
 */
export function getTiandituLyr() {
    return ""
}