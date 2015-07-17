yum.define([
	PI.Url.create('Financeiro', '/despesa/page/page.html'),
	PI.Url.create('Financeiro', '/despesa/page/page.css'),
    PI.Url.create('Financeiro', '/centrocusto/select.js'),
    PI.Url.create('Fornecedor', '/search/textbox.js'),
    PI.Url.create('Financeiro', '/item/table.js'),
    PI.Url.create('Financeiro', '/despesa/model.js'),
    PI.Url.create('Arquivo', '/painel.js'),
    PI.Url.create('Historico', '/painel.js')
], function (html) {

    Class('Financeiro.Despesa.Page').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.data = new UI.DateBox({
                placeholder: 'Data',
                dataModel: 'Data'
            });

            this.numero = new UI.TextBox({
                placeholder: 'Número',
                dataModel: 'Numero'
            });

            this.status = new UI.TextBox({
                placeholder: 'Aberta',
                dataModel: function (model, method) {
                    if (method == 'get') return model.getStatus();
                }
            });

            this.fornecedor = new Fornecedor.Search.TextBox({
                placeholder: 'Fornecedor',
                dataModel: 'Fornecedor'
            });

            this.unidade = new Unidade.Search.TextBox({
                clearOnSelect: false,
                dataModel: 'Unidade'
            });

            this.usuario = new Usuario.Search.TextBox({
                clearOnSelect: false,
                placeholder: 'Usuário',
                dataModel: 'Usuario'
            });

            this.table = new Financeiro.Item.Table({
                dataModel: 'Items'
            });

            this.anexo = new Arquivo.Painel({
                dataModel: 'Anexos'
            });

            this.historico = new Historico.Painel({
                dataModel: 'Historicos'
            });

            this.salvar = new UI.Button({                
                label: 'Salvar',
                iconLeft: 'fa fa-check',
                classes: 'verde',
                style: {
                    'min-width': '120px'
                }
            });

            this.remeter = new UI.Button({
                label: 'Remeter',
                iconLeft: 'fa fa-send',
                classes: 'cinza',
                style: {
                    'min-width': '120px'
                }
            });

            this.pagar = new UI.Button({
                label: 'Pagar',
                iconLeft: 'fa fa-check',
                classes: 'cinza',
                style: {
                    'min-width': '120px'
                }
            });

            this.autorizar = new UI.Button({
                label: 'Autorizar',
                iconLeft: 'fa fa-check',
                classes: 'cinza',
                style: {
                    'min-width': '120px'
                }
            });

            this.voltar = new UI.Button({
                label: 'Voltar',
                iconLeft: 'fa fa-arrow-circle-left',
                classes: 'cinza',
                style: {
                    'min-width': '120px'
                }
            });
        },

        viewDidLoad: function () {
            var self = this;

            this.status.setEnable(false);

            if (this.model.isNotNew()) {
                app.home.setTitle('Editar Despesa');

                this.model.get().ok(function (model) {
                    self.model = model;

                    self.chooseButton(self.model);

                    self.injectModelToView(self.model);
                }).error(function (message) {
                    Alert.error('Não foi possível', message);
                });

                app.home.setTitle('Editar Despesa');

            } else {
                app.home.setTitle('Adicionar Despesa');

                this.unidade.set(Usuario.Current.Unidade);
                this.usuario.set(Usuario.Current);
            }

            this.base.viewDidLoad();
        },

        chooseButton: function (despesa) {
            this.view.pagar.hide();
            this.view.remeter.hide();
            this.view.autorizar.hide();

            if (despesa.Status == Financeiro.Despesa.Status.APROVADA) {
                return;
            }else if (Usuario.Current.Unidade.Tipo == Unidade.Tipo.ZAP) {
                    this.view.autorizar.show();
            }else if (Usuario.Current.Unidade.Id == despesa.Unidade.getUnidadeIdPai() && despesa.Status == Financeiro.Despesa.Status.REMETIDA) {
                this.view.pagar.show();
            } else if (despesa.Status == Financeiro.Despesa.Status.ABERTA) {
                this.view.remeter.show();                
            }

        },

        events: {

            '{salvar} click': function () {
                var self = this,
                    model = this.model;

                this.saveModel(this.model).ok(function (m) {
                    
                    PI.Url.Hash.to('Despesa/Editar/' + m.Id);

                    self.chooseButton(m);
                    
                    Alert.info('Sucesso', 'Despesa salva com sucesso');
                })
            },

            '{remeter} click': function () {
                var self = this;

                this.saveModel(this.model, 'remeter').ok(function (m) {
                    self.model = m;

                    self.chooseButton(m);

                    Alert.info('Sucesso', 'Despesa remetida para análise');
                });
            },

            '{pagar} click': function () {
                var self = this;

                this.saveModel(this.model, 'pagar').ok(function (m) {
                    self.model = m;

                    self.chooseButton(m);

                    Alert.info('Sucesso', 'Despesa paga');
                });
            },

            '{autorizar} click': function () {
                var self = this;

                this.saveModel(this.model, 'autorizar').ok(function (m) {
                    self.model = m;

                    self.chooseButton(m);

                    Alert.info('Sucesso', 'Despesa autorizada');
                });
            },

            '{voltar} click': function () {
                window.history.back();
            }

        }

    });

});