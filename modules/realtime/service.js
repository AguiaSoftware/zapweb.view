yum.define([
    PI.Url.create('Lib', '/signalR/signalR.js')
], function (html) {

    Class('Service.RealTime').Extend(PI.Service).Body({

        instances: function (app) {
            this.conn = $.connection('/realtime');
        },

        init: function () {
            this.conn.received(this.proxy(this.receivedMessage));

            this.conn.start();
        },

        receivedMessage: function (protocol) {
            EventGlobal.trigger(protocol.Event, protocol.Data);
        },

        routes: {

        },

        events: {

        }

    });

});