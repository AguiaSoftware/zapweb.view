﻿yum.define([
    PI.Url.create('Unidade', '/tipo.unidade.js'),
    PI.Url.create('Cidade', '/model.js')
], function () {

    Class('Unidade.Model').Extend(Mvc.Model.Base).Body({

        instances: function () {
            this.account = new Auth.Model();
        },

        init: function () {
            this.base.init('/unidade');
        },

        onValid: function () {
            return {
                'Nome': new Mvc.Model.Validator.Required('O nome da unidade é obrigatório'),
                'Tipo': new Mvc.Model.Validator.Required('O tipo da unidade é obrigatório'),
                'Usuarios': new Mvc.Model.Validator.Required('Adicione pelo menos 1 (um) usuário a unidade'),
            };
        },

        getTipoNome: function () {
            switch (this.Tipo) {
                case Unidade.Tipo.CENTRAL: return 'CENTRAL';
                case Unidade.Tipo.COS: return 'COS';
                case Unidade.Tipo.ZAP: return 'ZAP';

            }
            return this.Tipo == Unidade.Tipo.CENTRAL ? 'CENTRAL' : 'COS';
        },

        getUnidadeIdPai: function () {
            var p = this.Hierarquia.split('.');

            if (p.length == 2) return p[0];

            return p[p.length - 2];
        },

        loadModelFromJson: function (json) {
            var model = new Unidade.Model(json);

            model.Cidade = new Cidade.Model(json.Cidade);
            model.Unidades = json.Unidades || [];

            for (var i = 0; i < model.Unidades.length; i++) {
                model.Unidades[i] = Unidade.Model.create().loadModelFromJson(model.Unidades[i]);
            }


            return model;
        },

        actions: {
            'get': '/get?Id=:Id'
        }

    });

});