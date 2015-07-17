yum.define([
	PI.Url.create('Financeiro', '/receita/page/page.html'),
	PI.Url.create('Financeiro', '/receita/page/page.css'),
	PI.Url.create('Financeiro', '/receita/model.js'),
	PI.Url.create('Financeiro', '/receita/table/table.js'),
	PI.Url.create('Util', '/meses/select.js')
], function (html) {

    Class('Financeiro.Receita.Page').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);

	        this.table = new Financeiro.Receita.Table({
		        dataModel: 'Items'
	        });

	        this.mes = new Util.Meses.Select({
		        dataModel: 'Mes'
	        });

	        this.ano = new UI.TextBox({
		        placeholder: 'Ano',
		        dataModel: 'Ano',
		        mask: 'ano'
	        });

            this.salvar = new UI.Button({                
                label: 'Salvar',
                iconLeft: 'fa fa-check',
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
        },

        viewDidLoad: function () {
	        var self = this;

	        if(this.model.isNotNew()){

		        this.model.get().ok(function(model){
			        self.model = model;

			        self.injectModelToView(model);
		        });

	        }else{
		        this.table.addRow();
	        }

            this.base.viewDidLoad();
        },

	    refresh: function(){
		    var self = this;
		    var mes = this.mes.get();
		    var ano = this.ano.get();

		    if(ano.length != 4) return;

		    this.model.find(mes, ano).ok(function(receita){

			    if(self.model.Id == receita.Id) return;

			    self.model = receita;

			    self.injectModelToView(receita);
		    });
	     },

        events: {

            '{salvar} click': function () {
	            var self = this,
                    model = this.model;

                this.saveModel(this.model).ok(function (m) {

	                PI.Url.Hash.to('Receita/Editar/' + m.Id);

                    Alert.info('Sucesso', 'Receita salva com sucesso');
                });
            },

            '{voltar} click': function () {
                window.history.back();
            },

            '{mes.select} change': function () {
	            this.refresh();
            },

            '{ano} lostfocus': function () {
                this.refresh();
            }

        }

    });

});