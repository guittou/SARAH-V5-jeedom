#### Module Node-Red pour S.A.R.A.H V5

### Inputs

- `msg.payload.options.plugin`:

à utiliser avec un module **switch** pour rediriger vers le bon plugin

valeur de `out.action.plugin` du fichier **sarah-jeedom.xml**

- `msg.payload.options.action`:

**On** / **Off** / **status** / **start**(scenario) / **activer**(scenario) / **stop**(scenario) / **desactiver**(scenario)

valeur de `out.action.action` du fichier **sarah-jeedom.xml**

- `msg.payload.options.type`:

**switch** / **temp** / **humidity** / **scenario**

valeur de `out.action.type` du fichier **sarah-jeedom.xml**

- `msg.payload.options.cmdid`:

**id** de l'action dans jeedom

valeur de `out.action.cmid` du fichier **sarah-jeedom.xml**


### Outputs

- `msg.payload`: renvoyé par win-sarah

- `msg.speak`: texte à lire par win-speak(ou autre)

![GitHub Logo](/images/speak1.png)

### Utilisation:

sarah allumes/eteins le salon

sarah quelle est la température/humidité du salon

sarah active/demarre/lance NOM_SCENARIO

sarah stop/arrete/desactive NOM_SCENARIO
