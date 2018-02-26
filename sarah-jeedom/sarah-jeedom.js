
var request = require('request');

module.exports = function(RED) {
    function sarahjeedom(config) {
        RED.nodes.createNode(this,config);

		this.host = config.host;
		this.port = config.port;
		this.apikey = config.apikey;
		
        var node = this;

		
		

		node.on('input', function(msg) {
			var url = "http://"+node.host+":"+node.port+"/jeedom/core/api/jeeApi.php?apikey="+node.apikey;
			
			//Récupération des paramètres provenant du fichier grammar/sarah-domoticz.xml retourné par win-sarah
			var action = msg.payload.options.action;
			var command = msg.payload.options.command;
			var cmdid = msg.payload.options.cmdid;
			var tts = msg.payload.options.tts;

			//teste si la variable commande est une action ou une demande de status
			switch(action){
				
				case "On":
					if(cmdid){
						url = url+'&type=cmd&id='+cmdid;
						msg.speak = "c'est fait"
						
					}
					
					else{
						msg.speak = "Il semble que la configuration soit invalide";
					}
					
					break;

				case "Off":
					if(cmdid){
						url = url+'&type=cmd&id='+cmdid;
						msg.speak = "c'est fait"
					}
					
					else{
						msg.speak = "Il semble que la configuration soit invalide";
					}
					
					break;

				case "status":
					if (cmdid){
						url = url+'&type=cmd&id='+cmdid;
					}
					
					else {
					msg.speak = "Il semble que la configuration soit invalide";;
					}
				
			}

			//effectue la requete http à jeedom
			request(url, function (error, response, body) {
				msg.url = url
				node.status({});
				if (error) {

					if (error.code === 'ETIMEDOUT') {

						setTimeout(function () {
						node.status({
							fill: "red",
							shape: "ring",
							text: "common.notification.errors.no-response"
						});
						}, 2);
						
						msg.speak = "jeedom est injoignable";
					
					} 
							
					else {

						node.error(error, msg);
						msg.payload = error.toString() + " : " + url;
						msg.statusCode = error.code;
						//node.send(msg);
						node.status({
						fill: "red",
						shape: "ring",
						text: error.code
						});
						
						msg.speak = "jeedom erreur "+error.code;
							
					} 
						
				}
				
				else {
					
					msg.resultat = body
					if (action == "status"){
						
						var body = JSON.parse(body);
						
						msg.resultat = body
						
						switch (type){
							
							case "switch":
								status = body.result[0].Status
								
								if (status == "On"){
									
									status = "allumée"
								}
								if (status == "Off"){
									status = "éteinte"
								}
								
								msg.speak = 'la lumière est '+status;
							break;
							
							case "temp":
								
								status = body.result[0]
								status = status.replace('.', ',')
																
								msg.speak = 'La température '+tts+' est de '+status+' degré';
						
							break;
							
							case "humidity":
								
								status = body.result[0]
								status = status.replace('.', ',')
																
								msg.speak = 'L\'humidité '+tts+' est de '+status+' %';  
						
							break;
							
		
						}
						
					}
				
				}
	
				node.send(msg);

			});
			
        });
    }
	

    RED.nodes.registerType("sarah-jeedom",sarahjeedom);
}



