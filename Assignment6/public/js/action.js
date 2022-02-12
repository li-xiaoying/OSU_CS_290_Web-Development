var xmlhttp=new XMLHttpRequest();
xmlhttp.open("DELETE","/",true);
xmlhttp.open("PUT","/",true);

$("#addExerciseButton").click(function()
{
    console.log($("#reps").val())
    var param ='0'
	if($('#unitCheck').is(':checked')){
		param ='1'
	}
    $.ajax({
        url: '/',
        type: 'post',
        data: JSON.stringify({"exercise":$("#exercise").val(),
                              "reps":$("#reps").val(),
                              "weight":$("#weight").val(),
                              "date":$("#date").val(),
                              "unitcheck":param
        }),
        contentType: "application/json; charset=utf-8",  
        dataType: "json",
        success: function(data) {
            var $tr=$("<tr></tr>");
            $tr.attr("id", "tr" + data.inserted)

            var $td_exercise=$("<td></td>");
            var $input_exercise=$("<input></input>");
            $input_exercise.attr("id","exercise_"+data.inserted);
            $input_exercise.attr("name","exercise_"+data.inserted);
            $input_exercise.attr("type","text");
            $input_exercise.val($("#exercise").val());
            $td_exercise.append($input_exercise);
            $tr.append($td_exercise);

            var $td_reps=$("<td></td>");
            var $input_reps=$("<input></input>");
            $input_reps.attr("id","reps_"+data.inserted);
            $input_reps.attr("name","reps_"+data.inserted);
            $input_reps.attr("type","text");
            $input_reps.val($("#reps").val());
            $td_reps.append($input_reps);
            $tr.append($td_reps);
            var $td_weight=$("<td></td>");
            var $input_weight=$("<input></input>");
            $input_weight.attr("id","weight_"+data.inserted);
            $input_weight.attr("name","weight_"+data.inserted);
            $input_weight.attr("type","text");
            $input_weight.val($("#weight").val());
            $td_weight.append($input_weight);
            $tr.append($td_weight);
            var $td_date=$("<td></td>");
            var $input_date=$("<input></input>");
            $input_date.attr("id","date_"+data.inserted);
            $input_date.attr("name","date_"+data.inserted);
            $input_date.attr("type","date");
            $input_date.val($("#date").val());
            console.log($("#date").val())
            $td_date.append($input_date);
            $tr.append($td_date);
            var $td_unitcheck=$("<td></td>");
            var $input_unitcheck=$("<input></input>");
            $input_unitcheck.attr("id","unitcheck_"+data.inserted);
            $input_unitcheck.attr("name","unitcheck_"+data.inserted);
            $input_unitcheck.attr("type","checkbox");
            if($('#unitCheck').is(':checked'))
            {
                $input_unitcheck.prop("checked",true);
            }
            else{
                $input_unitcheck.prop("checked",false);
            }
            $td_unitcheck.append($input_unitcheck);
            $tr.append($td_unitcheck);
            var $td_update_btn=$("<td></td>");
            var $update_btn=$("<button>update</button>")
            $update_btn.attr("id","update_btn_"+data.inserted);
            $update_btn.attr("name","update_btn_"+data.inserted);
            $update_btn.attr("row",data.inserted);
            $update_btn.attr("class","update_btn");
            $update_btn.val("update");
            $td_update_btn.append($update_btn);
            $tr.append($td_update_btn);
            var $td_delete_btn=$("<td></td>");
            var $delete_btn=$("<button>delete</button>")
            $delete_btn.attr("id","delete_btn_"+data.inserted);
            $delete_btn.attr("name","delete_btn_"+data.inserted);
            $delete_btn.attr("row",data.inserted);
            $delete_btn.attr("class","delete_btn");
            $delete_btn.val("delete");
            $td_delete_btn.append($delete_btn);
            $tr.append($td_delete_btn);
            $("#exerciseTable").append($tr)
        }
    });
});


$(document).on('click',".delete_btn",function(){
    var id=$(this).attr("row");
    console.log(id)
    $.ajax({
        url: '/',
        type: 'DELETE',
        data: JSON.stringify({"id":id}),
        contentType: "application/json; charset=utf-8",  
        dataType: "json",  
        success: function(data) {
            console.log("success")
            $("#tr"+id).remove();
        }
    });
});

$(document).on('click',".update_btn",function(){
    var id=$(this).attr("row");
    var param ='0'
	console.log($("#exercise_"+id).val())
	if($('#unitCheck_'+id).is(':checked')){
		param ='1'
	}
    $.ajax({
        url: '/',
        type: 'PUT',
        data: JSON.stringify({"exercise":$("#exercise_"+id).val(),
                              "reps":$("#reps_"+id).val(),
                              "weight":$("#weight_"+id).val(),
                              "date":$("#date_"+id).val(),
                              "unitcheck":param,
                              "id":id
        }),
        contentType: "application/json; charset=utf-8",  
        dataType: "json",  
        success: function(data) {
            alert("success")
            window.location.reload()          
        }
    });
});
