yum.define([
    PI.Url.create('Financeiro', '/centrocusto/relatorio/page.html'),
    PI.Url.create('Financeiro', '/centrocusto/relatorio/page.css'),
    PI.Url.create('Financeiro', '/centrocusto/model.js'),
    PI.Url.create('Financeiro', '/centrocusto/relatorio/popup.mes.js'),
    PI.Url.create('Financeiro', '/centrocusto/relatorio/popup.ano.js')
], function (html) {

    Class('Financeiro.CentroCusto.Relatorio.Page').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.unidade = Usuario.Current.Unidade;
            this.usuario = Usuario.Current;

            this.statusBar = new UI.StatusStripBar();

            this.popupMes = new Financeiro.CentroCusto.Relatorio.PopupMes();
            this.popupAno = new Financeiro.CentroCusto.Relatorio.PopupAno();

            this.dataHora = Lib.DataTime.Now().getDateStringFromFormat('dd/MM/yyyy hh:mm');
            this.logo = PI.Url.create('Logo').getUrl();

            this.centroCustos = [];
        },

        viewDidLoad: function () {
            var self = this;
            app.home.setTitle('Relatório - Centro Custo');

            this.opcoes = new UI.Menu.Menu({ label: 'Opções', style: {'background-color': '#fccdb6;'} });
            app.home.menubar.add(this.opcoes, true);

            this.opcoes.add(new UI.Menu.Item({ label: 'Período', icon: 'fa fa-calendar text-black', labelRight: 'Ctrl-H-A' }));
            this.opcoes.add(new UI.Menu.Separador());
            this.opcoes.add(new UI.Menu.Item({ label: 'Imprimir', icon: 'fa fa-print text-black', labelRight: 'Ctrl-H-A' }));

            this.periodo = new UI.StatusStrip.Label({
                label: Lib.DataTime.CurrentMes(),
                position: 'right'
            });

            this.ano = new UI.StatusStrip.Label({
                label: Lib.DataTime.CurrentAno(),
                position: 'right'
            });

            this.print = new UI.StatusStrip.Label({
                iconLeft: 'fa fa-print',
                label: 'Imprimir',
                position: 'right' 
            });

            this.print.event.listen('click', function(){
                window.print();
            });

            this.statusBar.add(this.periodo);
            this.statusBar.add(new UI.StatusStrip.Separator({ position: 'right' }));
            this.statusBar.add(this.ano);
            this.statusBar.add(new UI.StatusStrip.Separator({ position: 'right' }));
            this.statusBar.add(this.print);

            this.popupMes.showOnClick(this.periodo);
            this.popupAno.showOnClick(this.ano);

            this.popupMes.event.listen('click', function(mes){
                self.periodo.set(mes);
                self.load();
            });

            this.popupAno.event.listen('click', function(a){
                self.ano.set(a);                
                self.load();
            });

            Financeiro.CentroCusto.Model.create().all(Financeiro.CentroCusto.Tipo.TODOS).ok(function (cs) {
                self.fill(cs);
            });

            this.base.viewDidLoad();
        },

        load: function (cs) {
            var self = this;

            Financeiro.CentroCusto.Model.create().relatorio(Lib.DataTime.convertMesToIndex(this.periodo.get()) + 1, this.ano.get()).ok(function (cs) {
                self.calcule(cs);
            });

        },

        calcule: function(cs){

            this.clear();

            for (var i = 0; i < cs.length; i++) {
                var c = cs[i];
                var h = this.splitHierarquia(c.Nome);

                for (var j = h.length - 1; j >= 0; j--) {
                    var total = this.view.find(h[j]).data('total') || 0;

                    total += c.Total;
                    this.view.find(h[j]).data('total', total); 

                    this.view.find(h[j]).html(PI.Convert.DolarToReal(total));
                }
            }
        },

        splitHierarquia: function(nome){
            var h = [];
            var i = nome.lastIndexOf(':');

            h.push(nome);

            while( i > -1 ){
                nome = nome.substring(0, i);
                h.push(nome);
                i = nome.lastIndexOf(':');
            }

            return h;
        },

        clear: function(){
            for (var i = 0; i < this.centroCustos.length; i++) {
                this.view.find(this.centroCustos[i].Nome).data('total', 0);
                this.view.find(this.centroCustos[i].Nome).html('0,00');
            };
        },

        fill: function (cs) {
            var tpl = '<li class="centrocusto-page-item"><span>@{nome}</span><span>R$ <span at="@{id}">@{total}</span></span></li>';
            var view = '';

            this.centroCustos = cs;

            for (var i = 0; i < cs.length; i++) {
                var c = cs[i];

                view += Mvc.Helpers.tpl({
                    id: c.Nome,
                    nome: c.Nome.replace(':', '<span class="centro-custo-seta"></span>'),
                    total: '0,00'
                }, tpl);
            }

            this.view.list.html(view);

            this.load();
        },

        destroy: function(){            
            this.base.destroy();
            this.opcoes.destroy();
        },

        events: {

            '{opcoes} click': function(item){
                if (item == undefined) return;

                switch(item.label){
                    case 'Imprimir':
                        window.print();
                        break;
                    case 'Período':
                        break;
                    default:
                        break
                };

            }

        }

    });

});