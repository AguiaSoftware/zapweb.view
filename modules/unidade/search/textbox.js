yum.define([
	PI.Url.create('Util', '/search/textbox.js'),
    PI.Url.create('Unidade', '/model.js')
], function (html) {

    Class('Unidade.Search.TextBox').Extend(Util.Search.TextBox).Body({

        instances: function () {
            this.placeholder = 'Pesquisa por unidade';
            this.serviceUrl = '/unidade/search';
            this.paramName = 'nome';
        },

        getModel: function(json){
            return Unidade.Model.create().loadModelFromJson(json);
        },

        getValue: function(json){
            return json.Nome;
        }

    });

});