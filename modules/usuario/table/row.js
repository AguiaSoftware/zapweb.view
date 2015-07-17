yum.define([
	PI.Url.create('Usuario', '/table/row.html'),
	PI.Url.create('Usuario', '/table/row.css')
], function (html) {

    Class('Usuario.TableRow').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.excluir = new UI.Button({
                label: 'Excluir',
                classes: 'vermelho'
            });
        },

        viewDidLoad: function () {
            if (this.isOdd) {
                this.view.element.addClass('flat-table-row-odd');
            }

            this.view.element.evidence();

            this.base.viewDidLoad();
        },

        events: {

            '{excluir} click': function () {
                this.event.trigger('destroy');
                this.destroy();                
            }

        }

    });

});