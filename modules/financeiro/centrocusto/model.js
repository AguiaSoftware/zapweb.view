yum.define([

], function () {

    Class('Financeiro.CentroCusto.Model').Extend(Mvc.Model.Base).Body({

        instances: function () {

        },

        init: function () {
            this.base.init('/CentroCusto');
        },

        onValid: function () {
            return {
                //'': new Mvc.Model.Validator.Required('')
            };
        },

        loadModelFromJson: function (json) {
            var model = new Financeiro.CentroCusto.Model(json);

            return model;
        },

        actions: {
            'all': '/all?tipo=:tipo',
            'relatorio': '/relatorio?mes=:mes&ano=:ano'
        },

        getNome: function () {
            return this.Nome.replace(/\:/gi, ' <span class="centro-custo-seta"></span> ')
        }

    });

    Class('Financeiro.CentroCusto.Tipo').Static({
        ENTRADA: 0,
        SAIDA: 1,
        TODOS: 2
    });

});