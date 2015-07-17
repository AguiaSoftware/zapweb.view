yum.define([
	PI.Url.create('Financeiro', '/centrocusto/relatorio/popup.ano.html'),
	PI.Url.create('Financeiro', '/centrocusto/relatorio/popup.ano.css')
], function(html){
	
	Class('Financeiro.CentroCusto.Relatorio.PopupAno').Extend(UI.Popup).Body({
	
		instances: function(){
			this.view.inject({
				title: '',
				content: html
			});
			
	        this.ano = new UI.TextBox({
		        placeholder: 'Ano',
		        dataModel: 'Ano',
		        mask: 'ano'
	        });

            this.ok = new UI.Button({                
                label: 'Ok',
                iconLeft: 'fa fa-check',
                classes: 'cinza'
            });

			this.offsetTop = -5;

			this.position = 'bottom::right';
			this.type = 'fixed';
		},

		viewDidLoad: function(){
		    this.view.header.hide();
		    
		    this.base.viewDidLoad();
		},

		select: function(){
			this.ano.setValidate(true);

			if (this.ano.get().replace(/_/, '').length < 4) {
				this.ano.setValidate(false);
				return;
			};

			this.event.trigger('click',  this.ano.get() );
			this.hide();		    
		},

		events: {
			
			'{ok} click': function(){
				this.select();
			},

			'{ano} enter': function(){
				this.select();  
			},

			'li click': function(){
				this.hide();
			}
		
		}
	
	});
	
});