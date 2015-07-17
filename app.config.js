/**
 * Configuration Globais
 */
Application.config({

    ajax: {
        contentType: 'application/json'
    },

    textbox: {
        classes: 'form-control'
    },

    textarea: {
        classes: 'form-control'
    },

    button: {
        classes: 'btn btn-sm button'
    },

    checkbox: {
        classes: 'ui-checkbox'
    },

    confirm: {
        ok: {
            classes: 'btn btn-sm button verde'
        },

        cancelar: {
            classes: 'btn btn-sm button cinza'
        }
    },

    alert: {
        ok: {
            classes: 'btn btn-sm button verde'
        }
    }
});

PI.Url.add('BaseUrl', PI.Url.create(window.location.toString()).href());

PI.Url.add('App', 'BaseUrl', '/Public');
PI.Url.add('Modules', 'App', '/modules');
PI.Url.add('Lib', 'App', '/lib');
PI.Url.add('DataTime', 'Lib', '/datatime');
PI.Url.add('Tips', 'Lib', '/tips');
PI.Url.add('Scroll', 'Lib', '/scroll');
PI.Url.add('Logo', 'App', '/files/logo.png');

/**
 * Libs
 */
PI.Url.add('UI', 'Lib', '/pillar/ui');
PI.Url.add('Lib.Autocomplete', 'Lib', '/autocomplete');
PI.Url.add('Lib.TableFilter', 'Lib', '/tablefilter');
PI.Url.add('Lib.TableOrder', 'Lib', '/tableorder');

/**
 * Url Alias
 */
PI.Url.add('Auth', 'Modules', '/auth');
PI.Url.add('Home', 'Modules', '/home');
PI.Url.add('Usuario', 'Modules', '/usuario');
PI.Url.add('Unidade', 'Modules', '/unidade');
PI.Url.add('Permissao', 'Modules', '/permissao');
PI.Url.add('Notificacao', 'Modules', '/notificacao');
PI.Url.add('Cidade', 'Modules', '/cidade');
PI.Url.add('Fornecedor', 'Modules', '/fornecedor');
PI.Url.add('Telefone', 'Modules', '/telefone');
PI.Url.add('Endereco', 'Modules', '/endereco');
PI.Url.add('Contato', 'Modules', '/contato');
PI.Url.add('Financeiro', 'Modules', '/financeiro');
PI.Url.add('Util', 'Modules', '/util');
PI.Url.add('Arquivo', 'Modules', '/arquivo');
PI.Url.add('RealTime', 'Modules', '/realtime');
PI.Url.add('Historico', 'Modules', '/historico');


/**
* Service
*/
PI.Service.add('Unidade', 'Permissao', 'Usuario', 'Fornecedor', 'Financeiro', 'RealTime', 'Notificacao');