yum.define([

], function () {

    Class('Financeiro.Receita.Model').Extend(Mvc.Model.Base).Body({

        instances: function () {

        },

        init: function () {
            this.base.init('/Receita');
        },

        onValid: function () {
            return {
                'Mes': new Mvc.Model.Validator.Required('Mês é obrigatório'),
                'Ano': new Mvc.Model.Validator.Required('Ano é obrigatório')
            };
        },

        loadModelFromJson: function (json) {
            var model = new Financeiro.Receita.Model(json);

	        model.Mes = Lib.DataTime.convertIndexToMes(json.Mes);

            return model;
        },

        actions: {
	        'find': '/find?mes=:mes&ano=:ano'
        }

    });

});