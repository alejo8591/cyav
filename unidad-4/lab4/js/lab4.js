var i = localStorage.length;

function onBodyLoad(){
	var todo = "";

	create_new_list();

	$('#clear').click(function(){
		localStorage.clear();
		$('#todo_list li').fadeOut(function(){
			$(this).html("");
		});
	});

	$('#remove').bind("click", function(e){
		var index = $(this).closest("li").attr("id");
		$(this).closest("li").slideUp(function(){
			// removiendo el elemento seleccionado de la lista
			localStorage.removeItem('names_' + index);

			// Reorganizando el array en localStorage
			for(var i = 0; i < localStorage.length; i++){
				if(!localStorage.getItem('names_'+1)){
					localStorage.setItem('names_' + i, localStorage.getItem('names_' + (i + 1) )  );
					localStorage.removeItem('names_' + (i + 1) );
				}
			}
			// Limpiando toda la lista
			$('#todo_list').html("");
		});
	});
}

// Creando nueva lista en el browser
function create_new_list(){
	for(var i = 0; i < localStorage.length; i++){
		// trayendo info desde el Local Storage
		todo = localStorage.getItem('names_' + i );

		$('#todo_list').append('<li id="' + i + '"><a href="#">' + todo + '</a><a href="#" data-rel="dialog" data-transition="slideUp" id="remove">Remover</a></li>');
	}

	$('todo_list').listview();
	$('todo_list').listview('refresh');
}

// Salvar en Local Storage
function save_todo(){
	var todo = $('#textinput1').val();

	if (todo.length){
		// Salvar item en local Storage
		localStorage['names_' + i]  = todo;

		// Actualizar la lista
		$('#todo_list').append('<li id="' + i + '"><a href="#">' + todo + '</a><a href="#" data-rel="dialog" data-transition="slideUp" id="remove">Remover</a></li>');

		// Refrescar la lista para jQuery mobile;
		$('#todo_list').listview();
		$('#todo_list').listview('refresh');
		i++;
	}
}