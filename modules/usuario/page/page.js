﻿yum.define([
	PI.Url.create('Usuario', '/page/page.html'),
	PI.Url.create('Usuario', '/page/page.css'),
    PI.Url.create('Usuario', '/page/auth.js'),
    PI.Url.create('Usuario', '/model.js')
], function (html) {

    Class('Usuario.Page').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.nome = new UI.TextBox({
                placeholder: 'Nome',
                dataModel: 'Nome'
            });

            this.email = new UI.TextBox({
                placeholder: 'Email',
                dataModel: 'Email'
            });

            this.auth = new Usuario.PageAuth({
                dataModel: 'Account'
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
            var title = 'Adicionar Usuário';

            if (this.model.isNotNew()) {

                title = 'Editar Usuário';

                this.model.get().ok(function (usuario) {
                    self.model = usuario;

                    app.home.setTitle(title + ' - ' + usuario.Nome);

                    self.injectModelToView(usuario);
                });
            }

            app.home.setTitle(title);

            this.base.viewDidLoad();
        },

        events: {

            '{salvar} click': function () {
                var self = this,
                    model = this.model;

                this.saveModel(model).ok(function (m) {
                    PI.Url.Hash.to('Usuario/Editar/' + m.Id);

                    Alert.info('Sucesso', 'Usuário salvo com sucesso!');
                });
            },

            '{voltar} click': function () {
                window.history.back();
            }

        }

    });

});