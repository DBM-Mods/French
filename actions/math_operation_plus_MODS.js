module.exports = {

name: "Math Operation Plus MOD",
section: "Other Stuff",
meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]<br>[Tempest - 321400509326032897]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

subtitle: function(data) {
	const info = ['Addition', 'Soustraction', 'Multiplication', 'Division', 'Arrondir', 'Arrondir en A.S.', 'Absolu', 'Arrondir vers le haut', 'Arrondir vers le bas', 'Factoriel', 'Augmenter par (Exposants)', 'Enraizado por (Raízes)', 'Sinus', 'Cosinus', 'Tangente', 'Arc Sinus', 'Arc Cosinus', 'Arco Tangente', '% du Nombre', 'Augmenter par %', 'Réduir par %', 'Valeur de Pi', 'Valeur du nombre de Eulers', 'Racine carée', 'Numéro aleatoire entre', 'Fahrenheit en Celsius', 'Celsius en Fahrenheit', 'Celsius en Kelvin', 'Fahrenheit en Kelvin', 'Kelvin en Celsius', 'Kelvin en Fahrenheit', 'Racine cubique'];
	return `${info[data.info]}`;
},
	
variableStorage: function (data, varType) {
	const type = parseInt(data.storage);
	if (type !== varType) return;
	let dataType = 'Number';
	return ([data.varName, dataType]);
},

fields: ["FirstNumber", "info", "SecondNumber", "storage", "varName"],

html: function(isEvent, data) {
	return `
  <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/French/archive/refs/heads/main.zip">Mettre à jour</div>
  <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/French">Github: Version 1.3</div>

<table style="width:100%"><tr><td style="width:45%" id="Principado">

<div id="FirstNum">
<span class="dbminputlabel">Valeur 1</span><br>
<input id="FirstNumber" class="round" type="text">
</div>

</td><td style="width:10%;text-align:center"><br>
<div id="Meio" name="Meio"></div>
</td><td style="width:45%">

<div id="SecondNum">
<span class="dbminputlabel">Valeur 2</span><br>
<input id="SecondNumber" class="round" type="text">
</div>
</td></tr></table>
<br>
<div style="padding-top: 8px; width: 100%;">
<span class="dbminputlabel">Opération mathématiques</span>
<select id="info" class="round" onchange="glob.onChange1(this)">
			<option value="0" selected>[ + ] Addition</option>
			<option value="1">[ - ] Soustraction</option>
			<option value="2">[ x ] Multiplication</option>
			<option value="3">[ ÷ ] Division</option>
			<option value="4">Arrondir</option>
			<option value="5">[ AAS ] Arrondir en A.S.</option>
			<option value="6">Absolu</option>
			<option value="7">Arrondir vers le haut</option>
			<option value="8">Arrondir vers le bas</option>
			<option value="9">Factoriel</option>
			<option value="10">[ x,y ] Augmenté par (Exposants)</option>
			<option value="11">[ x,y ] Racines par (racines)</option>
			<option value="12">Sinus</option>
			<option value="13">Cosinus</option>
			<option value="14">Tangente</option>
			<option value="15">Arc Sinus</option>
			<option value="16">Arc Cosinus</option>
			<option value="17">Arc Tangente</option>
			<option value="18">[ % ] Pourcentage</option>
			<option value="19">[ % ] Augmenter le nombre en pourcentage</option>
			<option value="20">[ % ] Diminuer le nombre en pourcentage</option>
			<option value="21">Valeur de Pi</option>
			<option value="22">Valeur du nombre d'Euler</option>
			<option value="23">[ √ ] Racine carrée</option>
			<option value="31">Racine cubique</option>
			<option value="24">[ e ] Nombre aléatoire entre l'un et l'autre</option>
			<option value="25">Convertir Fahrenheit en Celsius</option>
			<option value="26">Convertir Celsius en Fahrenheit</option>
			<option value="27">Convertir Celsius en Kelvin</option>
			<option value="28">Convertir Fahrenheit en Kelvin</option>
			<option value="29">Convertir Kelvin en Celsius</option>
			<option value="30">Convertir Kelvin en Fahrenheit</option>
</select>
<br>
</div>
<span class="dbminputlabel">informations sur la formule</span>
<div id="Informativo" name="Informativo" style="border:1px solid #ccc;background:rgba(50,50,50,0.7);padding:5px"></div>
<br>
<div style="padding-top: 8px;">
	<div style="float: left; width: 35%;">
	<span class="dbminputlabel">Stocker dans</span><br>
		<select id="storage" class="round">
			${data.variables[1]}
		</select>
	</div>
	<div id="varNameContainer" style="float: right; width: 60%;">
	<span class="dbminputlabel">Nom de la variable</span><br>
		<input id="varName" class="round" type="text">
	</div>
</div>
  <style>
  xinspace{padding:5px 0px 0px 0px;display:block}
  .dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
  .dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}
  </style>`;
},

init: function() {
    const {glob, document} = this;
	
	const xinelaslinks = document.getElementsByClassName('xinelaslink');
    for (let x = 0; x < xinelaslinks.length; x++) {
      const xinelaslink = xinelaslinks[x];
      const url = xinelaslink.getAttribute('data-url');
      if (url) {
        xinelaslink.setAttribute('title', url);
        xinelaslink.addEventListener('click', (e) => {
          e.stopImmediatePropagation();
          console.log(`Launching URL: [${url}] in your default browser.`);
          require('child_process').execSync(`start ${url}`);
        });
      }
    }


    glob.onChange1 = function(event) {
        const value = parseInt(event.value);
        const dom = document.getElementById('SecondNum');
		const dom2 = document.getElementById('FirstNum');
		const dom2p = document.getElementById('Principado');
		          
        if (value == 0) {
            dom.style.display = null,
			dom2.style.display = null;
			dom2p.style.width = "45%";
            document.querySelector("[name='Meio']").innerText = (`+`);
			document.querySelector("[name='Informativo']").innerText = (`Exemple: 5 + 5 = 10`);
        } else if (value == 1) {
		    dom.style.display = null;
			dom2.style.display = null;
			dom2p.style.width = "45%";
			document.querySelector("[name='Meio']").innerText = (`-`);
			document.querySelector("[name='Informativo']").innerText = (`Exemple: 5 - 2 = 3`);
        } else if (value == 2) {
		    dom.style.display = null;
			dom2.style.display = null;
			dom2p.style.width = "45%";
			document.querySelector("[name='Meio']").innerText = (`x`);
			document.querySelector("[name='Informativo']").innerText = (`Exemple: 5 x 5 = 25`);
        } else if (value == 3) {
		    dom.style.display = null;
			dom2.style.display = null;
			dom2p.style.width = "45%";
			document.querySelector("[name='Meio']").innerText = (`÷`);
			document.querySelector("[name='Informativo']").innerText = (`Exemple: 10 ÷ 2 = 5`);
		} else if (value == 4) {
		    dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`Arrondit au nombre entier le plus proche, vers le haut ou vers le bas\nExemples:\n105.23 = 105\n105.50 = 106\n105.72 = 106`);
		} else if (value == 5) {
		    dom.style.display = null;
			dom2.style.display = null;
			dom2p.style.width = "45%";
			document.querySelector("[name='Meio']").innerText = (`AAS`);
			document.querySelector("[name='Informativo']").innerText = (`Arrondit à l'entier spécifiant le nombre de chiffres significatifs.\nExemples:\n105.5055465 AAS 3 = 106\n105.5055465 AAS 4 = 105.5\n105.5055465 AAS 6 = 105.506`);
		} else if (value == 6) {
		    dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`Nombre absolu\nExemples:\n105 = 105\n-105 = 105`);
		} else if (value == 7) {
		    dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`Arrondir vers le haut\nExemples:\n105.43 = 106\n105.01 = 106`);
		} else if (value == 8) {
		    dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`Arrondir vers le bas\nExemples:\n105.99 = 105\n105.01 = 105`);
		} else if (value == 9) {
		    dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`Calcule la factorielle de (Valeur 1)\nExemples:\n[ 3 ] 3×2×1= 6\n[ 4 ] 4×3×2×1 = 24\n[ 5 ] 5×4×3×2×1 = 120`);
		} else if (value == 10) {
		    dom.style.display = null;
			dom2.style.display = null;
			dom2p.style.width = "45%";
			document.querySelector("[name='Meio']").innerText = (`X , Y`);
			document.querySelector("[name='Informativo']").innerText = (`Renvoie la valeur de x élevé à y\nExemplos:\nx = 2, y = 3 | Resultado: 8`);
		} else if (value == 11) {
		    dom.style.display = null;
			dom2.style.display = null;
			dom2p.style.width = "45%";
			document.querySelector("[name='Meio']").innerText = (`X , Y`);
			document.querySelector("[name='Informativo']").innerText = (``);
		} else if (value == 12) {
		    dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`Renvoie le sinus de (Valeur 1) en radians`);
		} else if (value == 13) {
		    dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`Renvoie le cosinus de (Valeur 1) en radians`);
		} else if (value == 14) {
		    dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`Renvoie la tangente de l'angle (Valeur 1)`);
		} else if (value == 15) {
		    dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`Renvoie l'arc sinus de (Valeur 1)`);
		} else if (value == 16) {
		    dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`Renvoie l'arc cosinus de (Valeur 1)`);
		} else if (value == 17) {
		    dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`Renvoie l'arc tangente de (Valeur 1) sous forme de valeur numérique entre PI/2 et PI/2 radian`);
		} else if (value == 18) {
		    dom.style.display = null;
			dom2.style.display = null;
			dom2p.style.width = "45%";
			document.querySelector("[name='Meio']").innerText = (`% de`);
			document.querySelector("[name='Informativo']").innerText = (`Calcule en pourcentage\nExemples:\n25 % de 500 = 125`);
		} else if (value == 19) {
		    dom.style.display = null;
			dom2.style.display = null;
			dom2p.style.width = "45%";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`Calcule en pourcentage`);
		} else if (value == 20) {
		    dom.style.display = null;
			dom2.style.display = null;
			dom2p.style.width = "45%";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`Calcule en pourcentage`);
		} else if (value == 21) {
		    dom.style.display = "none";
			dom2.style.display = "none";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`3.141592653589793`);
		} else if (value == 22) {
		    dom.style.display = "none";
			dom2.style.display = "none";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`2.718281828459045`);
		} else if (value == 23) {
		    dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "96%";
			document.querySelector("[name='Meio']").innerText = (`√`);
			document.querySelector("[name='Informativo']").innerText = (`Racine carrée de (Valor 1)`);
		} else if (value == 24) {
		    dom.style.display = null;
			dom2.style.display = null;
			dom2p.style.width = "45%";
			document.querySelector("[name='Meio']").innerText = (`e`);
			document.querySelector("[name='Informativo']").innerText = (`Nombre aléatoire entre (Valor 1) et (Valor 2)`);
		} else if (value == 25) {
			dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`Convertir Fahrenheit(Valeur 1) en Celsius\nExemple: 100°F = 37,7°C`);
		} else if (value == 26) {
			dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`Convertir Celsius(Valeur 1) en Fahrenheit\nExemple: 100°C = 212°F`);
		} else if (value == 27) {
			dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`Convertir Celsius(Valeur 1) en Kelvin\nExemplo: 100°C = 373,15 K`);
		} else if (value == 28) {
			dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`Convertir Fahrenheit(Valeur 1) en Kelvin\nExemple: 100°F = 310,92 K`);
		} else if (value == 29) {
			dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`Convertir Kelvin(Valeur 1) en Celsius\nExemple: 100 K = -173,15°C`);
		} else if (value == 30) {
			dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`Convertir Kelvin(Valeur 1) en Fahrenheit\nExemple: 100 K = -279,67°F`);
		} else if (value == 31) {
			dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`racine cubique de (Valeur 1)`);
		} else {
                        dom.style.display = 'none';
		}
	    
		
    };
	glob.onChange1(document.getElementById('info'));

},

action: function(cache) {
	const data = cache.actions[cache.index];
	const FN = parseFloat(this.evalMessage(data.FirstNumber, cache).replace(/,/g, ''));
	const SN = parseFloat(this.evalMessage(data.SecondNumber, cache).replace(/,/g, ''));
	const info = parseInt(data.info);

	let result;
	switch(info) {
		case 0:
			result = FN + SN;
			break;
		case 1:
			result = FN - SN;
			break;
		case 2:
			result = FN * SN;
			break;
		case 3:
			result = FN / SN;
			break;
		case 4:
			result = Math.round(FN);
			break;
		case 5:
		    result = FN.toPrecision(SN);
			break;
		case 6:
			result = Math.abs(FN);
			break;
		case 7:
		    result = Math.ceil(FN);
			break;
		case 8:
		    result = Math.floor(FN);
			break;
		case 9:
		    function fact(x) {
                  if(x == 0) {
                    return 1;
                  }
                  if(x < 0 ) {
                    return undefined;
                  }
                  for(var i = x; --i; ) {
                    x *= i;
                  }
                  return x;
            }
			result = fact(FN);
			break;
		case 10:
		    result = Math.pow(FN, SN);
			break;
		case 11:
		    PO = 1 / SN
		    result = Math.pow(FN, PO);
			break;
		case 12:
		    result = Math.sin(FN);
			break;
		case 13:
			result = Math.cos(FN);
			break;
		case 14:
			result = Math.tan(FN);
			break;
		case 15:
			result = Math.asin(FN);
			break;
		case 16:
			result = Math.acos(FN);
			break;
		case 17:
			result = Math.atan(FN);
			break;
		case 18:
			PN = FN * SN;
			result = PN / 100;
			break;
		case 19:
		    PN = FN * SN;
			result = PN / 100 + FN;
			break;
		case 20:
		    DN = 100 - SN;
			PN = FN * DN;
			result = PN / 100;
			break;
		case 21:
		    result = Math.PI
			break;
		case 22:
		    result = Math.E
			break;
		case 23:
			result = Math.sqrt(FN);
			break;
		case 24:
			result = Math.floor(Math.random() * (SN - FN)) + FN;
			break;
		case 25:
			result = (FN - 32) * 5/9;
			break;
		case 26:
			result = (FN * 9/5) + 32;
			break;
		case 27:
			result = FN + 273.15;
			break;
		case 28:
			result = (FN - 32) * 5/9 + 273.15;
			break;
		case 29:
			result = FN - 273.15;
			break;
		case 30:
			result = (FN  - 273.15) * 9/5 + 32;
			break;
		case 31:
			result = Math.cbrt(FN);
			break;
		default:
			break;
	}
	
	if (result !== undefined) {
		const storage = parseInt(data.storage);
		const varName = this.evalMessage(data.varName, cache);
		this.storeValue(result, storage, varName, cache);
	}
	this.callNextAction(cache);
},


mod: function(DBM) {
}

};
