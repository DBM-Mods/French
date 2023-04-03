module.exports = {

name: "Canvas Draw Text on Image MOD",
section: "Image Editing",
meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

subtitle: function(data) {
	return `${data.text}`;
},

fields: ["storage","varName","x","y","fontPath","fontColor","fontSize","align","text","shadowtipo","shadowcor","blur","shadowh","shadowv",
"largura","larguramax","rotacionar","x2","y2","tipocor","gradiente","distancia","menulargura","bordatipo","borda","bordacor","bordagradiente"],

html: function(isEvent, data) {
	return `
	<div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/TheKingOfCampers/French/archive/refs/heads/main.zip">
  Mettre à jour</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/TheKingOfCampers/French">Github: Version 0.6</div>

	
	<table style="width:100%;">
		<tr>
			<td>
				<span class="dbminputlabel">Image sur laquelle écrire [Canvas]</span><br>
				<select id="storage" class="round" style="width: 90%" onchange="glob.refreshVariableList(this)">
					${data.variables[1]}
				</select>
			</td>
			<td>
				<span class="dbminputlabel">Nom de la variable</span><br>
				<input id="varName" class="round" type="text" list="variableList">
			</td>
		</tr>
	</table>
<br>

	<tab-system style="margin-top: 0;">
		<tab label="Texto" icon="align left">
				<div style="padding-top:12px">
		<span class="dbminputlabel">Texe</span><br>
			<textarea id="text" rows="10" placeholder="Insérez votre texte ici..." style="width: 100%; white-space: nowrap; resize: yes;"></textarea>
		</div></div>
	</tab>
		
	<tab label="Position" icon="move">
	<div style="padding-top:12px">
				<span class="dbminputlabel">Position du texte</span>
				<div style="width:100%;background:rgba(50,50,50,0.5);-webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;padding:8px 4px">
					<table style="width:100%">
						<tr>
							<td style="width:33% !important">
								<span class="dbminputlabel">Position X</span><br>
								<input id="x" class="round" type="text" value="0">
							</td>
							<td style="width:33% !important">
								<span class="dbminputlabel">Position Y</span><br>
								<input id="y" class="round" type="text" value="0">
							</td>
							<td style="width:33% !important">
								<span class="dbminputlabel">Alignement</span><br>
								<select id="align" class="round" style="width: 100%;">
									<option value="0" selected>En haut à gauche</option>
									<option value="1">En haut centré</option>
									<option value="2">En haut à droite</option>
									<option value="3">Milieu gauche</option>
									<option value="4">Milieu centré</option>
									<option value="5">Milieu droite</option>
									<option value="6">en bas à gauche</option>
									<option value="7">en bas centré</option>
									<option value="8">en bas à droite</option>
								</select>
							</td>
						</tr>
					</table>
				</div>
			</div>

		<div style="padding-top:12px">
		<span class="dbminputlabel">Rotation du texte</span>
		<div style="width:100%;background:rgba(50,50,50,0.5);-webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;padding:8px 4px">
		<table style="width:100%"><tr>
		<td style="width:33% !important">
		<span class="dbminputlabel">Rotation (degrés)</span><br>
			<input id="rotacionar" class="round" type="text" value="0">
		</td>

		<td style="width:33% !important">
		<span class="dbminputlabel">Angle de rotation X</span><br>
			<input id="x2" class="round" type="text" value="0">
		</td>

		<td style="width:33% !important">
		<span class="dbminputlabel">Angle de rotation Y</span><br>
			<input id="y2" class="round" type="text" value="0">
		</td>



		</tr></table></div></div>
	</tab>

	<tab label="Couleur" icon="flask">
		<div style="padding-top:12px">
			
		<span class="dbminputlabel">Type de couleur</span>
			<select id="tipocor" class="round" onchange="glob.onChange0(this)">
				<option value="2">Aucune</option>
				<option value="0" selected>Normal</option>
				<option value="1">En dégradé</option>
		</select>

		<div id="gradient" style="padding-top:15px">
			<span class="dbminputlabel">Dégradé</span>
			<textarea id="gradiente" name="gradientes" rows="8" style="width: 100%; white-space: nowrap; resize:yes"></textarea>
		</div>
	
		<div id="cor" style="padding-top:15px">
					<span class="dbminputlabel">Couleur du texte HEX / RGBA</span><br>
					<table style="width:100%"><tr><th><input value="#FFFFFF" id="fontColor" name="actionxinxyla" class="round" type="text" placeholder="Opcional"><th>
						<th style="width:40px;text-align:center;padding:4px"><a id="btr1" style="cursor:pointer" onclick="(function(){
		  					document.getElementById('fontColor').type = 'color'
		  					document.getElementById('btr1').style.display = 'none';
		  					document.getElementById('btr2').style.display = 'block';
		  				})()">
							<button class="tiny compact ui icon button">bouton</button></a><a id="btr2" style="cursor:pointer;display:none" onclick="(function(){
								document.getElementById('fontColor').type = 'text';
								document.getElementById('btr1').style.display = 'block';
								document.getElementById('btr2').style.display = 'none';
							})()">
							<button class="tiny compact ui icon button">Texte</button></a><th></tr></table>
							
				</div>
	
	</div>
	</tab>
	<tab label="Bordure" icon="block layout">
	<div style="padding-top:12px">
			
		<span class="dbminputlabel">Type de bordure</span><br>
			<select id="bordatipo" class="round" onchange="glob.onChange2(this)">
			<option value="0" selected>Aucune</option>
				<option value="1">Normal</option>
				<option value="2">En dégradé</option>
		</select>

<div id="bordadoxinxyla" style="padding-top:15px">
		<span class="dbminputlabel">Taille de la bordure</span><br>
		<input id="borda" class="round" type="text" placeholder="Requis"></div>

		<div id="gradienteborda" style="padding-top:15px">
			<span class="dbminputlabel">Dégradé</span>
			<textarea id="bordagradiente" rows="4" style="width: 100%; white-space: nowrap; resize:yes"></textarea>
		</div>
	
		<div id="corborda" style="padding-top:15px">
					<span class="dbminputlabel">Couleur de la bordure</span><br>
					<table style="width:100%"><tr><th><input value="#FFFFFF" id="bordacor" name="actionxinxyla" class="round" type="text" placeholder="Opcional"><th>
						<th style="width:40px;text-align:center;padding:4px"><a id="3btr1" style="cursor:pointer" onclick="(function(){
		  					document.getElementById('bordacor').type = 'color'
		  					document.getElementById('3btr1').style.display = 'none';
		  					document.getElementById('3btr2').style.display = 'block';
		  				})()">
							<button class="tiny compact ui icon button">Cor</button></a><a id="3btr2" style="cursor:pointer;display:none" onclick="(function(){
								document.getElementById('bordacor').type = 'text';
								document.getElementById('3btr1').style.display = 'block';
								document.getElementById('3btr2').style.display = 'none';
							})()">
							<button class="tiny compact ui icon button">Texto</button></a><th></tr></table>
							
				</div>
	
	</div>
	</tab>
	<tab label="Ombre" icon="cloud">
		<div style="padding-top:12px">
		<span class="dbminputlabel">Ombre</span><br>
		<select id="shadowtipo" class="round" onchange="glob.onChange3(this)">
		<option value="0" selected>Désactivé</option>
			<option value="1">Activé</option>
	</select>
	<div id="shadow" style="padding-top:15px">
	<table style="width:100%"><tr>
	<td style="width:100px">
	<span class="dbminputlabel">Tache d'ombre</span><br>
	<input id="blur" class="round" type="text" value="0" placeholder="Requerido">
	</td>
	<td style="width:100px"><span class="dbminputlabel">Angle de l'ombre (X)</span><br>
	<input id="shadowh" class="round" type="text" value="0" placeholder="Opcional"></td>
	<td style="width:100px"><span class="dbminputlabel">Angle de l'ombre (Y)</span><br>
	<input id="shadowv" class="round" type="text" value="0" placeholder="Opcional"></td>
	</tr></table>
	</div>
		
		<div id="corshadow" style="padding-top:15px">
		<span class="dbminputlabel">Couleur de l'ombre HEX / RGBA</span><br>
			<table style="width:100%"><tr><th><input value="#FFFFFF" id="shadowcor" name="actionxinxyla" class="round" type="text" placeholder="Insira um código HEX ou RGBA..."><th>
			<th style="width:40px;text-align:center;padding:4px"><a id="2btr1" style="cursor:pointer" onclick="(function(){
			document.getElementById('shadowcor').type = 'color'
			document.getElementById('2btr1').style.display = 'none';
			document.getElementById('2btr2').style.display = 'block';
			})()"><button class="tiny compact ui icon button">Bouton</button></a><a id="2btr2" style="cursor:pointer;display:none" onclick="(function(){
				document.getElementById('shadowcor').type = 'text';
				document.getElementById('2btr1').style.display = 'block';
				document.getElementById('2btr2').style.display = 'none';
				})()"><button class="tiny compact ui icon button">Texte</button></a><th></tr></table>

		
		</div>
		</div>
	</tab>
	<tab label="Police" icon="cogs">
		<div style="padding:12px 6px">
		<table style="width:100%"><tr>
		<td style="width:48%">
		<span class="dbminputlabel">Police du texte (Local/URL)</span><br>
			<input id="fontPath" class="round" type="text" value="fonts/">
		</td>
		<td style="width:48%">
		<span class="dbminputlabel">Taille du texte</span><br>
			<input id="fontSize" class="round" type="text" placeholder="Taille par défaut 10px">
		</td>
</tr></table><br>


<span class="dbminputlabel">Type de largeur</span>
<div style="width:100%;background:rgba(50,50,50,0.5);-webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;padding:8px 4px">
<select id="menulargura" class="round" onchange="glob.onChange1(this)">
<option value="0" selected>Désactivé</option>
<option value="1">Largeur Fixe</option>
<option value="2">Largeur maximale</option>
<option value="3">Largeur maximale sans retour à la ligne</option>
</select>

<div id="xinelas01" style="padding-top:12px">
<span class="dbminputlabel">Largeur Fixe</span><br>
<input id="largura" class="round" type="text" placeholder="Requis">
</div>
<div id="xinelas02" style="padding-top:12px">
<table style="width:100%"><tr>
<td style="width:50%">
<span class="dbminputlabel">Largeur maximale</span><br>
<input id="larguramax" class="round" type="text" placeholder="Requis">
</td>
<td style="width:50%">
<span class="dbminputlabel">Hauteur de distance</span><br>
<input id="distancia" class="round" type="text" placeholder="Optionnel">
</td>
</tr></table>
</div>

		</div></div>
	</tab>
</tab-system>

<style>
td{width:50%;padding:2px;}
</style>
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

	glob.onChange0 = function (event) {
		switch (parseInt(event.value)) {
		  case 0:
			gradient.style.display = 'none'
			cor.style.display = null
			break
		  case 1:
			gradient.style.display = null
			cor.style.display = 'none'
			break
			case 2:
				gradient.style.display = 'none'
				cor.style.display = 'none'
				break
		}
	  }
	  glob.onChange0(document.getElementById('tipocor'))

	  
	  glob.onChange3 = function (event) {
		switch (parseInt(event.value)) {
			case 0:
				corshadow.style.display = 'none'
				shadow.style.display = 'none'
				break
		  case 1:
			corshadow.style.display = null
			shadow.style.display = null
			break
		  case 2:
			corshadow.style.display = 'none'
			shadow.style.display = null
			break
		}
	  }
	  glob.onChange3(document.getElementById('shadowtipo'))

	  glob.onChange2 = function (event) {
		switch (parseInt(event.value)) {
			case 0:
				gradienteborda.style.display = 'none'
				corborda.style.display = 'none'
				bordadoxinxyla.style.display = 'none'
				break
		  case 1:
			gradienteborda.style.display = 'none'
			corborda.style.display = null
			bordadoxinxyla.style.display = null
			break
		  case 2:
			gradienteborda.style.display = null
			corborda.style.display = 'none'
			bordadoxinxyla.style.display = null
			break
		}
	  }
	  glob.onChange2(document.getElementById('bordatipo'))

	  glob.onChange1 = function (event) {
		switch (parseInt(event.value)) {
		  case 0:
			xinelas01.style.display = 'none'
			xinelas02.style.display = 'none'
			break
		  case 1:
			xinelas01.style.display = null
			xinelas02.style.display = 'none'
			break
			case 2:
				xinelas01.style.display = 'none'
				xinelas02.style.display = null
				break
				case 3:
					xinelas01.style.display = 'none'
					xinelas02.style.display = null
					break
		}
	  }
	  glob.onChange1(document.getElementById('menulargura'))

	glob.refreshVariableList(document.getElementById('storage'));
},

action: function(cache) {
	const Canvas = require('canvas');
	const data = cache.actions[cache.index];
	const fontPath = this.evalMessage(data.fontPath, cache);
	const fontName = fontPath.slice(fontPath.lastIndexOf("/")+1,fontPath.lastIndexOf("."))
	Canvas.registerFont(fontPath, {family:fontName})
	const storage = parseInt(data.storage);
	const varName = this.evalMessage(data.varName, cache);
	const imagedata = this.getVariable(storage, varName, cache);
	if(!imagedata) {
		this.callNextAction(cache);
		return;
	}
	const fontColor = this.evalMessage(data.fontColor, cache);
	const largura = this.evalMessage(data.largura, cache);
	const larguramax = this.evalMessage(data.larguramax, cache);
	const menulargura = this.evalMessage(data.menulargura, cache);
	const bordatipo = this.evalMessage(data.bordatipo, cache);
	const borda = this.evalMessage(data.borda, cache);
	const bordacor = this.evalMessage(data.bordacor, cache);
	const shadowtipo = this.evalMessage(data.shadowtipo, cache);
	var distancia = this.evalMessage(data.distancia, cache);

	let fontSize = parseInt(this.evalMessage(data.fontSize, cache));
	if (isNaN(fontSize)) {
		fontSize = 10;
	}
	let blur = parseInt(this.evalMessage(data.blur, cache));
	if (isNaN(blur)) {
		blur = 0;
	}
	let shadowh = parseInt(this.evalMessage(data.shadowh, cache));
	if (isNaN(shadowh)) {
		shadowh = 0;
	}
	let shadowv = parseInt(this.evalMessage(data.shadowv, cache));
	if (isNaN(shadowv)) {
		shadowv = 0;
	}
	if (data.distancia > 0) {distancia = (fontSize + parseInt(distancia))} else {distancia = fontSize + 2}

	const shadowcor = this.evalMessage(data.shadowcor, cache);
	const align = parseInt(data.align);
	const tipocor = parseInt(data.tipocor);
	const x = parseInt(this.evalMessage(data.x, cache));
	const y = parseInt(this.evalMessage(data.y, cache));
	const rotacionar = parseInt(this.evalMessage(data.rotacionar, cache));
	var x2 = this.evalMessage(data.x2, cache);
	var y2 = this.evalMessage(data.y2, cache);
	const text = this.evalMessage(data.text, cache);
	const image = new Canvas.Image();
	image.src = imagedata;
	const canvas = Canvas.createCanvas(image.width,image.height);
	const ctx = canvas.getContext('2d');
	ctx.drawImage(image, 0, 0, image.width, image.height);
	ctx.font = fontSize+"px "+fontName;
	switch(align) {
		case 0:
			ctx.textAlign = "left";
			ctx.textBaseline = "top";
			break;
		case 1:
			ctx.textAlign = "center";
			ctx.textBaseline = "top";
			break;
		case 2:
			ctx.textAlign = "right";
			ctx.textBaseline = "top";
			break;
		case 3:
			ctx.textAlign = "left";
			ctx.textBaseline = "middle";
			break;
		case 4:
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			break;
		case 5:
			ctx.textAlign = "right";
			ctx.textBaseline = "middle";
			break;
		case 6:
			ctx.textAlign = "left";
			ctx.textBaseline = "bottom"; 
			break;
		case 7:
			ctx.textAlign = "center";
			ctx.textBaseline = "bottom"; 
			break;
		case 8:
			ctx.textAlign = "right";
			ctx.textBaseline = "bottom"; 
	}

	if(x2 == "" || x2 == undefined){x2 = 0}
	if(y2 == "" || y2 == undefined){y2 = 0}

	if(rotacionar > 0){
	ctx.translate(image.width / 2, image.height / 2);
	ctx.rotate(rotacionar * Math.PI / 180)
	ctx.translate(-(image.width / 2), -(image.height / 2));
	ctx.translate(x2, y2)}

	if(shadowtipo == 1){
	ctx.shadowColor = shadowcor
	}

	ctx.shadowOffsetX = shadowh;
	ctx.shadowOffsetY = shadowv;
	ctx.shadowBlur = blur;

	if(bordatipo == 1) {
	ctx.lineWidth = borda
	ctx.strokeStyle = bordacor
	}
	if(bordatipo == 2) {
	ctx.lineWidth = borda
	eval(String(this.evalMessage(data.bordagradiente, cache)))
	ctx.strokeStyle = gradient
	}

	if(tipocor == 2) {
		ctx.fillStyle = "rgba(0,0,0,0)"
	} 
	if(tipocor == 1) {
		eval(String(this.evalMessage(data.gradiente, cache)))
		ctx.fillStyle = gradient;
	} 
	if(tipocor == 0 || tipocor == undefined) {
		ctx.fillStyle = fontColor
	}

	if (menulargura == 0 || menulargura == undefined || menulargura == 1){
	if (menulargura == 0 || menulargura == undefined){
	ctx.fillText(text, x, y)
	if(bordatipo == 1 || bordatipo == 2){ctx.strokeText(text, x, y)}
	}
	if (menulargura == 1){ 
	ctx.fillText(text, x, y, largura)
	if(bordatipo == 1 || bordatipo == 2){ctx.strokeText(text, x, y, largura)}
}}
		
	if (menulargura == 2){
	printAt(ctx, text, x, y, distancia, larguramax);
	function printAt(ctx, text, x, y, lineHeight, fitWidth) {
	fitWidth = fitWidth || 0;
	if (fitWidth <= 0) {
	ctx.fillText(text, x, y);
	if(bordatipo == 1 || bordatipo == 2){ctx.strokeText(text, x, y)}
	return;
	}
	for (var idx = 1; idx <= text.length; idx++) {
	var str = text.substr(0, idx);
	if (ctx.measureText(str).width > fitWidth) {
	ctx.fillText(text.substr(0, idx - 1), x, y);
	if(bordatipo == 1 || bordatipo == 2){ctx.strokeText(text.substr(0, idx - 1), x, y)}
	printAt(ctx, text.substr(idx - 1), x, y + lineHeight, lineHeight, fitWidth);
	return;
	}}
	ctx.fillText(text, x, y);
	if(bordatipo == 1 || bordatipo == 2){ctx.strokeText(text, x, y)}
	}}
	
	
	if (menulargura == 3) {
	printAt(ctx, text, x, y, distancia, larguramax);
	function printAt(ctx, text, x, y, lineHeight, fitWidth) {
	fitWidth = fitWidth || 0;
	if (fitWidth <= 0) {
	ctx.fillText(text, x, y)
	if(bordatipo == 1 || bordatipo == 2){ctx.strokeText(text, x, y)}
	return;}
	var words = text.split(' ');
	var currentLine = 0;
	var idx = 1;
	while (words.length > 0 && idx <= words.length)
	{   var str = words.slice(0,idx).join(' ');
	var w = ctx.measureText(str).width;
	if ( w > fitWidth )
	{if (idx==1)
	{idx=2;}
	ctx.fillText( words.slice(0,idx-1).join(' '), x, y + (lineHeight*currentLine) )
	if(bordatipo == 1 || bordatipo == 2){ctx.strokeText( words.slice(0,idx-1).join(' '), x, y + (lineHeight*currentLine) )}
	currentLine++;
	words = words.splice(idx-1);
	idx = 1;
	}
	else
	{idx++;}}
	if  (idx > 0)
	ctx.fillText( words.join(' '), x, y + (lineHeight*currentLine) )
	if(bordatipo == 1 || bordatipo == 2){ctx.strokeText( words.join(' '), x, y + (lineHeight*currentLine) )}
	}}	
			
	const result = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
	this.storeValue(result, storage, varName, cache);
	this.callNextAction(cache);
},

mod: function(DBM) {
}

};
