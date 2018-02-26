### Module Node-Red pour S.A.R.A.H V5

Ce module sarah-jeedom permet de commander et recevoir les états des periphériques de Jeedom.

télécharger, extraire puis copier le repertoire **sarah-jeedom** dans le dossier `\sarah\viseo-bot-framework\node_modules\`

relancer sarah

### configuration du module :

renseigner l'adresse ip, le port et l'API key du serveur Jeedom.

![GitHub Logo](/images/jeedom.png)

Copier le fichier xml **./grammar/sarah-jeedom.xml** dans le dossier grammar configuré sur le module **win-sarah**

modifier le fichier **sarah-jeedom.xml** pour qu'il corresponde à vos actions sur jeedom

`out.action.plugin` ==> utilisé comme discriminant pour identifier le plugin

`out.action.cmdid` ==> id de l'action dans jeedom

`out.action.type` ==> **switch** ou **temp** ou **humidity**
	
`out.action.action` ==> **On** / **Off** / **status**

dans le cas de plusieurs plugins utiliser un module **switch** avec comme discriminant `msg.payload.options.plugin` renvoyé par **win-sarah** (ici **jeedom-http**)

![GitHub Logo](/images/jeedom-switch.png)

![GitHub Logo](/images/jeedom-flow.png)

### Inputs

- `msg.payload.options.plugin`:

à utiliser avec un module **switch** pour rediriger vers le bon plugin

valeur de `out.action.plugin` du fichier **sarah-jeedom.xml**

- `msg.payload.options.action`:

**On** / **Off** / **status**

valeur de `out.action.action` du fichier **sarah-jeedom.xml**

- `msg.payload.options.type`:

**switch** / **temp** / **humidity**

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

sarah comment est le salon
