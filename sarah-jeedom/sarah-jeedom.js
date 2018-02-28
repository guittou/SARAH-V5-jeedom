var request = require('request');

module.exports = function(RED) {

    function sarahjeedom(config) {

        RED.nodes.createNode(this, config);
        this.host = config.host;
        this.port = config.port;
        this.apikey = config.apikey;
        var node = this;

        node.on('input', function(msg) {

            var url = "http://" + node.host + ":" + node.port + "/core/api/jeeApi.php?apikey=" + node.apikey;
            //Récupération des paramètres provenant du fichier grammar/sarah-domoticz.xml retourné par win-sarah
            var action = msg.payload.options.action;
            var device = msg.payload.options.device;
            var type = msg.payload.options.type;
            var cmdid = msg.payload.options.cmdid;
            var tts = msg.payload.options.tts;
            //teste si la variable commande est une action ou une demande de status

            switch (action) {
            case "On":
            case "Off":
                if (cmdid) {
                    url = url + '&type=cmd&id=' + cmdid;
                    msg.speak = "c'est fait";

                } else {
                    msg.speak = "Il semble que la configuration soit invalide";

                }
                break;
            case "status":
                if (cmdid) {
                    url = url + '&type=cmd&id=' + cmdid;
                } else {
                    msg.speak = "Il semble que la configuration soit invalide";

                }
                break;
            case "start":
                if (cmdid) {
                    url = url + '&type=scenario&id=' + cmdid + '&action=' + action;
                    msg.speak = "le scénario a été lancé";

                } else {
                    msg.speak = "Il semble que la configuration soit invalide";

                }
                break;
            case "stop":
                if (cmdid) {
                    url = url + '&type=scenario&id=' + cmdid + '&action=' + action;
                    msg.speak = "le scénario a été arrété";

                } else {
                    msg.speak = "Il semble que la configuration soit invalide";

                }
                break;
            case "activer":
            case "désactiver":
                if (cmdid) {
                    url = url + '&type=scenario&id=' + cmdid + '&action=' + action;
                    msg.speak = "le scénario a été " + action;

                } else {
                    msg.speak = "Il semble que la configuration soit invalide";

                }
                break;
            default:
                msg.speak = "Action invalide";
            }

            //effectue la requete http à jeedom
            request(url, function(error, response, body) {

                msg.url = url;
                node.status({});

                if (error) {
                    if (error.code === 'ETIMEDOUT') {
                        setTimeout(function() {
                            node.status({
                                fill : "red",
                                shape : "ring",
                                text : "common.notification.errors.no-response"
                            });
                        }, 2);
                        msg.speak = "jeedom est injoignable";

                    } else {
                        node.error(error, msg);
                        msg.payload = error.toString() + " : " + url;
                        msg.statusCode = error.code;
                        //node.send(msg);
                        node.status({
                            fill : "red",
                            shape : "ring",
                            text : error.code
                        });
                        msg.speak = "jeedom erreur " + error.code;

                    }
                } else {
                    msg.resultat = body;
                    
                    if (action == "status") {
                        switch (type) {
                        case "switch":
                            status = body;
                            if (status == "On") {
                                status = "allumée";
                            }
                            if (status == "Off") {
                                status = "éteinte";
                            }
                            msg.speak = 'la lumière est ' + status;
                            break;
                        case "temp":
                            var temp = body.replace('.', ',');
                            msg.speak = 'La température ' + tts + ' est de '+ temp +' degré';
                            break;
                        case "humidity":
                            var humidity = body.replace('.', ',');
                            msg.speak = 'L\'humidité ' + tts + ' est de ' + humidity + ' %';
                            break;
                        default:
                            msg.speak = "Type invalide";

                        }
                    }
                }
                node.send(msg);
            });
        });
    }


    RED.nodes.registerType("sarah-jeedom", sarahjeedom);
}