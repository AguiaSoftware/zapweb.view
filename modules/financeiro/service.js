yum.define([
    PI.Url.create('Financeiro', '/despesa/page/page.js'),
	PI.Url.create('Financeiro', '/receita/page/page.js'),
	PI.Url.create('Financeiro', '/despesa/search/page.js'),
    PI.Url.create('Financeiro', '/centrocusto/relatorio/page.js'),
    PI.Url.create('Financeiro', '/despesa/model.js')
], function (html) {

    Class('Service.Despesa').Extend(PI.Service).Body({

        load: function (app) {
            this.base.load(app);
        },

        routes: {

            'Receita/Adicionar': function () {
                var page = new Financeiro.Receita.Page({
                    model: new Financeiro.Receita.Model()
                });

                app.home.setPage(page);
            },

            'Receita/Editar/:Id': function (id) {
                var page = new Financeiro.Receita.Page({
                    model: new Financeiro.Receita.Model({ Id: id })
                });

                app.home.setPage(page);
            },

            'Despesa/Adicionar': function () {
                var page = new Financeiro.Despesa.Page({
                    model: new Financeiro.Despesa.Model()
                });

                app.home.setPage(page);
            },

            'Despesa/Editar/:Id': function (id) {
                var page = new Financeiro.Despesa.Page({
                    model: new Financeiro.Despesa.Model({ Id: id })
                });

                app.home.setPage(page);
            },

	        'Despesa/Pesquisar': function () {
		        var page = new Financeiro.Despesa.Search.Page();

		        app.home.setPage(page);
	        },

            'Relatorio/CentroCusto': function () {
                var page = new Financeiro.CentroCusto.Relatorio.Page();

                app.home.setPage(page);
            }

        },

        events: {

        }

    });

});