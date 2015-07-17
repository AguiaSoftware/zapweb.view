yum.define([
	PI.Url.create('Financeiro', '/centrocusto/relatorio/popup.mes.html'),
	PI.Url.create('Financeiro', '/centrocusto/relatorio/popup.mes.css')
], function(html){
	
	Class('Financeiro.CentroCusto.Relatorio.PopupMes').Extend(UI.Popup).Body({
	
		instances: function(){
			this.view.inject({
				title: '',
				content: html
			});

			this.offsetTop = -5;

			this.position = 'bottom::right';
			this.type = 'fixed';
		},

		events: {
			
			'li click': function(e){
				var mes = e.getAttribute('mes');

				this.event.trigger('click', mes);

				this.hide();
			}
		
		}
	
	});
	
});