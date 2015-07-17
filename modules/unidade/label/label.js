yum.define([
	PI.Url.create('Unidade', '/label/label.html'),
	PI.Url.create('Unidade', '/label/label.css'),
    PI.Url.create('Unidade', '/model.js')
], function (html) {

    Class('Unidade.Label').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.nome = Usuario.Current.Unidade.Nome;
        },

        events: {
            
        }

    });

});