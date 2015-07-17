yum.define([

], function(html){

	Class('Financeiro.Receita.Search.TableRow').Extend(Mvc.Component).Body({

		instances: function(){
			this.view = new Mvc.View('<tr> <td>@{receita.Mes}</td> <td>@{receita.Ano}</td> <td> <div at="editar"></div> </td> </tr>');

			this.editar = new UI.Button({
				label: 'Editar',
				classes: 'cinza'
			});

		}

	});

});