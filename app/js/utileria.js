var temporale = [];
var avg = 0;
var totalt = 0;
var d = new Date();
var anio = d.getFullYear();
var meis = ["01","02","03","04","05","06","07","08","09","10","11","12"];
var mes = meis[d.getMonth()];
var deis = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
var dia = deis[d.getDate()];
var meses_abr = ["Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
];

function restaHoras(d,h){
  return d.getHours() - h;
}

function get_fecha_corta(d){
  var fecha = d.getFullYear()+'-'+ meis[d.getMonth()] +'-'+((d.getDate() < 10?'0':'') + d.getDate());
  return fecha;
}

function put_temperatura(estacion,contenedor)
{
  var fActual = new Date();
  var url =  "https://api.datos.gob.mx/v1/sinaica?parametro=TMP&fecha="+get_fecha_corta(fActual)+"&estacionesid="+estacion;
  $.ajax({
    type: 'GET',
    url: url,
    data: {},
    success: function( data, textStatus, jqxhr ) {
      if(data.results.length > 0)
        contenedor.html(data.results[data.results.length-1].valororig);
      else
        contenedor.html('ND');
    },
    xhrFields: {
      withCredentials: false
    },
    crossDomain: true,
    async:true
  });
}

function reset_botones(){
  $('.parametro').each(function(index){
    $( this ).removeClass('active');
  });

  $('#pinta_primero').addClass('active');

  ant_val_arr = [];
  ant_val_arr_rango = [];
  ant_val_arr_promedio = [];
  
  ant_lab_arr = [];
  ant_lab_arr_dias = [];
  ant_lab_arr_horas = [];

}

function get_fecha_formato(fecha)
{
  //voltear fecha 
  var voltear  =  fecha.split('-');
  var nuevaFecha  =  voltear[1]+'/'+voltear[2]+'/'+voltear[0];
  var f = new Date(nuevaFecha);
  
  return  f.getDate() + '-' + meses_abr[f.getMonth()];
}

function decimalAdjust(type, value, exp) {
  // Si el exp no está definido o es cero...
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math[type](value);
  }
  value = +value;
  exp = +exp;
  // Si el valor no es un número o el exp no es un entero...
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }
  // Shift
  value = value.toString().split('e');
  value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}

// Decimal round
if (!Math.round10) {
  Math.round10 = function (value, exp) {
    return decimalAdjust('round', value, exp);
  };
}
// Decimal floor
if (!Math.floor10) {
  Math.floor10 = function (value, exp) {
    return decimalAdjust('floor', value, exp);
  };
}
// Decimal ceil
if (!Math.ceil10) {
  Math.ceil10 = function (value, exp) {
    return decimalAdjust('ceil', value, exp);
  };
}