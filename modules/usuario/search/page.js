﻿yum.define([
	PI.Url.create('Usuario', '/search/page.html'),
	PI.Url.create('Usuario', '/search/page.css'),
    PI.Url.create('Usuario', '/table/table.js'),
    PI.Url.create('Lib.TableFilter', '/tablefilter.js')
], function (html) {

    Class('Usuario.Search.Page').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.search = new UI.TextBox({
                placeholder: 'Pesquisar'
            });

            this.table = new Usuario.Table({
                messageEmpty: 'Aguarde ...',
                columns: ['editar']
            });
        },

        viewDidLoad: function () {
            app.home.setTitle('Pesquisar Usuário');

            this.loadAndFill();

            this.base.viewDidLoad();
        },

        loadAndFill: function () {
            var self = this;

            Usuario.Model.create().all().ok(function (unidades) {
                for (var i in unidades) {
                    self.table.add(unidades[i]);
                }

                self.table.view.empty.remove();
            });
        },

        events: {

            '{search} keyup': function () {
                $.TableFilter(this.table.view.table, this.search.get());
            }

        }

    });

});