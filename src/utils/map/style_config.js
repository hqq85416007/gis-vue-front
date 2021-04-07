import { Style, Stroke, Fill } from 'ol/style';
const olStyle = {
    //小车图标
    car: {
        alarm: require("@/assets/map/alarm_car.png"),
        work: require('@/assets/map/work_car.png'),
        free: require('@/assets/map/free_car.png'),
        scale: 1
    },
    track: new Style({
        fill: new Fill({
            color: 'gray',
            width: 0.4
        }),
        stroke: new Stroke({
            color: "#64d9ff",
            width: 1
        })

    }),
    selectTrack: new Style({
        fill: new Fill({
            color: 'red',
            width: 0.4
        }),
        stroke: new Stroke({
            color: "red",
            width: 1
        })
    })
};


export default olStyle;