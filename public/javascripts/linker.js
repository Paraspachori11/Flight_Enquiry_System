
$(document).ready(function(){
        $.getJSON("http://localhost:3000/flightenquiry/fillcities",function(data){
                data.result.map((item)=>{
                        $('#source').append($('<option>').text(item.citiesname).val(item.idcities))
                        $('#destination').append($('<option>').text(item.citiesname).val(item.idcities)) 
                    })
                })
            })
         
            // $(document).ready(function(){
            //     $.getJSON("http://localhost:3000/flightenquiry/fillcities",function(data){
            //         data.result.map((item)=>{
            //             if(item.idcities==data.source)
            //             {
            //                 $('#source').append($('<option selected>').text(item.citiesname).val(item.idcities))
            //             }
            //             else{
            //                 $('#source').append($('<option>').text(item.citiesname).val(item.idcities))
            //             }
            //             if(item.idcities==data.destination)
            //             {
            //                 $('#destination').append($('<option selected>').text(item.citiesname).val(item.idcities))  
            //             }
            //             else{
            //                 $('#destination').append($('<option>').text(item.citiesname).val(item.idcities)) 
            //             }
            //         })
            //     })
            // })

            // $(document).ready(function(){
            //     $.getJSON("http://localhost:3000/flightenquiry/fillcities",function(data){
            //             data.result.map((item)=>{
            //                 if(item.citiesname==$('#isource').text())
            //                 {$('#source').append($('<option>').text(item.citiesname).val(item.idcities).prop('selected',true))}
            //                 else{$('#source').append($('<option>').text(item.citiesname).val(item.idcities))}
                            
            //                 if(item.citiesname==$('#idest').text())
            //                     {$('#destination').append($('<option>').text(item.citiesname).val(item.idcities).prop('selected',true))}
            //                 else{
            //                     $('#destination').append($('<option>').text(item.citiesname).val(item.idcities))
            //                 }
            //                 })
            //             })
            //         })

            // $(document).ready(function(){
            //     $.getJSON("http://localhost:3000/flightenquiry/fillcities",function(data){
            //             data.result.map((item)=>{
            //                 if(item.citiesname==$('#isource').text())
            //                 {$('#source').append($('<option selected>').text(item.citiesname).val(item.idcities))}
            //                 else{$('#source').append($('<option>').text(item.citiesname).val(item.idcities))}
                            
            //                 if(item.citiesname==$('#idest').text())
            //                     {$('#destination').append($('<option selected>').text(item.citiesname).val(item.idcities))}
            //                 else{
            //                     $('#destination').append($('<option>').text(item.citiesname).val(item.idcities))
            //                 }
            //                 })
            //             })
            //         })