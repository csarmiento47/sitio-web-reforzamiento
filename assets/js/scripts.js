$(document).ready(function () {

    $('#fecha').change(function () {
        let indicador = $('#indicador').val();
        let fecha_ingresada = $('#fecha').val();
        let año = fecha_ingresada.substring(0, 4);
        let mes = fecha_ingresada.substring(5, 7);
        let dia = fecha_ingresada.substring(8, fecha_ingresada.length);
        let fecha_buscada = `${dia}-${mes}-${año}`;
        console.log(indicador + ' | ' + fecha_ingresada + ' | ' + fecha_buscada);

        let urlMindicador = `https://mindicador.cl/api/${indicador}/${fecha_buscada}`;
        console.log(urlMindicador);

        $.getJSON(urlMindicador, function (dataIndicadores) {
            if (dataIndicadores.serie?.length > 0) {
                let valor = dataIndicadores.serie[0]?.valor;
                console.log(valor);
                let valor_formateado = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 2 }).format(valor);
                console.log(valor_formateado);
                let texto = `Valor Actual ${dataIndicadores.nombre}: ${valor_formateado} `;
                $('#valor_solicitado').text(texto);
            }
            else{
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Lamentablemente no hay valor definido para dicho día."
                });
            }
        }).fail(function () {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Al parecer tenermos problemas con la búsqueda...\nInténtalo seleccionando un indicador o una fecha válida."
            });
        });
    });

});