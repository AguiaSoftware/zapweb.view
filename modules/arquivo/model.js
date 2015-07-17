yum.define([

], function () {

    Class('Arquivo.Model').Extend(Mvc.Model.Base).Body({

        instances: function () {

        },

        init: function () {
            this.base.init('/Arquivo');
        },

        onValid: function () {
            return {
                //'': new Mvc.Model.Validator.Required('')
            };
        },

        loadModelFromJson: function (json) {
            var model = new Arquivo.Model(json);

            return model;
        },

        actions: {
            
        }

    });

});