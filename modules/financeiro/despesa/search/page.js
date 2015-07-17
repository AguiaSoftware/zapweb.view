yum.define([
	PI.Url.create('Financeiro', '/despesa/search/page.html'),
	PI.Url.create('Financeiro', '/despesa/search/page.css'),
	PI.Url.create('Financeiro', '/despesa/search/popup.js'),
	PI.Url.create('Financeiro', '/status/select.js'),
	PI.Url.create('Financeiro', '/despesa/search/table.js'),
	PI.Url.create('Financeiro', '/despesa/search/model.js')
], function(html){

	Class('Financeiro.Despesa.Search.Page').Extend(Mvc.Component).Body({

		instances: function(){
			this.view = new Mvc.View(html);

			this.dataInicio = new UI.DateBox({
				placeholder: 'Data Inicio',
				dataModel: 'DataInicio'
			});

			this.dataFim = new UI.DateBox({
				placeholder: 'Data Fim',
				dataModel: 'DataFim'
			});

			this.numero = new UI.TextBox({
				placeholder: 'Número',
				dataModel: 'Numero'
			});

			this.valorMenor = new UI.TextBox({
				placeholder: 'R$ 0,00',
				mask: 'financeira',
				dataModel: function (model, method, value) {
					if (method == 'set') {
						model.ValorMenor = PI.Convert.RealToDolar(value);
					}
				}
			});

			this.valorMaior = new UI.TextBox({
				placeholder: 'R$ 0,00',
				mask: 'financeira',
				dataModel: function (model, method, value) {
					if (method == 'set') {
						model.ValorMaior = PI.Convert.RealToDolar(value);
					}
				}
			});

			this.fornecedor = new Fornecedor.Search.TextBox({
				placeholder: 'Fornecedor',
				dataModel: 'Fornecedor'
			});

			this.unidade = new Unidade.Search.TextBox({
				clearOnSelect: false,
				dataModel: 'Unidade'
			});

			this.usuario = new Usuario.Search.TextBox({
				clearOnSelect: false,
				placeholder: 'Usuário',
				dataModel: 'Usuario'
			});

			this.status = new Financeiro.Status.Select({
				dataModel: 'Status'
			});

			this.table = new Financeiro.Despesa.Search.Table();

			this.addNew = new UI.Button({
				label: 'Adicionar Filtro',
				iconLeft: 'fa fa-plus',
				classes: 'cinza'
			});

			this.pesquisar = new UI.Button({
				label: 'Pesquisar',
				iconLeft: 'fa fa-search',
				classes: 'verde',
				style: {
					'min-width': '120px'
				}
			});

			this.voltar = new UI.Button({
				label: 'Voltar',
				iconLeft: 'fa fa-arrow-circle-left',
				classes: 'cinza',
				style: {
					'min-width': '120px'
				}
			});

			this.popup = new Financeiro.Despesa.Search.Popup({
				offsetTop: 0,
				offsetLeft: 0
			});

			this.model = new Financeiro.Despesa.Search.Model();
		},

		viewDidLoad: function(){
			this.base.viewDidLoad();

			this.view.rowdata.hide();
			this.view.rownumero.hide();
			this.view.rowstatus.hide();
			this.view.rowfornecedor.hide();
			this.view.rowunidade.hide();
			this.view.rowusuario.hide();
			this.view.rowvalor.hide();

			this.popup.setReference(this.addNew);

			this.popup.select('data', 'numero', 'status');
		},

		events: {

			'{addNew} click': function(){
				this.popup.show();
			},

			'{pesquisar} click': function(){
				var self = this;

				this.injectViewToModel(this.model);

				this.model.pesquisar().ok(function(despesas){
					self.table.set(despesas);
				});
			},

			'{popup} select': function(select){
				this.view['row' + select].toggle();
			}

		}

	});

});