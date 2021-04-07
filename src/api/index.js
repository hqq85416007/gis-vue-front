// import axios from 'axios'

// const URLS = {
//     App:'',
//     AppService:'',
//     Msg:'',
//     MsgRoute:'',
//     MsgType:'',
//     Service:"",
// }
// const App = function(){
//     return axios.get(URLS.App)
//     .then(resp => {
//         if(resp.data.resultState){
//             return resp.data.result;
//         }
//         return Promise.reject({
//             message:resp.data.message
//         });
//     });
// }
// const AppService = function(params={}){
//     return axios.get(URLS.AppService,{params})
//     .then(resp => {
//         if(resp.data.resultState){
//             return resp.data.result;
//         }
//         return Promise.reject({
//             message:resp.data.message
//         });
//     });
// }
// const Msg = function(params={}){
//     return axios.get(URLS.Msg,{params})
//     .then(resp => {
//         if(resp.data.resultState){
//             return resp.data.result;
//         }
//         return Promise.reject({
//             message:resp.data.message
//         });
//     });
// }
// const MsgRoute = function(params={}){
//     return axios.get(URLS.MsgRoute,{params})
//     .then(resp => {
//         if(resp.data.resultState){
//             return resp.data.result;
//         }
//         return Promise.reject({
//             message:resp.data.message
//         });
//     });
// }
// const MsgType = function(params={}){
//     return axios.get(URLS.MsgType,{params})
//     .then(resp => {
//         if(resp.data.resultState){
//             return resp.data.result;
//         }
//         return Promise.reject({
//             message:resp.data.message
//         });
//     });
// }
// const Service = function(params={}){
//     return axios.get(URLS.Service,{params})
//     .then(resp => {
//         if(resp.data.resultState){
//             return resp.data.message;
//         }
//         return Promise.reject({
//             message:resp.data.message
//         });
//     });
// }
// export default {
//     install (Vue) {
//         Vue.prototype.$api = {
//             App,
//             AppService,
//             Msg,
//             MsgRoute,
//             MsgType,
//             Service,
//         }
//     }
// }