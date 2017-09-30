var enviroment = 'DEV';
//var enviroment = 'PROD';
var devAPI = "http://192.168.0.185:9292/api";
var prodAPI = "https://brainsight-web.herokuapp.com/api";


const RailsApi = (method) => {
  var apiweb = (enviroment == 'DEV') ? devAPI : prodAPI;
  if (String(method).substr(0,1) != '/') method = '/'+ method;
  return apiweb + method;

}

export default RailsApi;


