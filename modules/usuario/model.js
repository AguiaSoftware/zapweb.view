yum.define([
    PI.Url.create('Auth', '/model.js'),
    PI.Url.create('Unidade', '/model.js')
], function () {

    Class('Usuario.Model').Extend(Mvc.Model.Base).Body({

        instances: function () {
            this.Account = new Auth.Model();
        },

        init: function () {
            this.base.init('/Usuario');

            this.Unidade = new Unidade.Model(this.Unidade);
        },

        onValid: function () {
            return {
                'Nome': new Mvc.Model.Validator.Required('O nome do usuário é obrigatório'),
                'Email': new Mvc.Model.Validator.Required('O email do usuário é obrigatório')
            };
        },

        loadModelFromJson: function (json) {
            var model = new Usuario.Model(json);

            model.Account = Auth.Model.create().loadModelFromJson(json.Account);

            return model;
        },

        actions: {
            
        }

    });

    Usuario.Current = new Usuario.Model(CurrentUsuario);

});