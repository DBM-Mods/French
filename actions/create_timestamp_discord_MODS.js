module.exports = {
  name: 'Create Timestamp Discord MOD',
  section: 'Other Stuff',
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[Tempest - 321400509326032897]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },


  subtitle(data) {
    const info = ['Tempo Curto', 'Muito tempo', 'Data abreviada', 'Data longa', 'Data longa com tempo curto', 'Data longa com dia da semana e horário curto', 'Relativo'];
    const prse = parseInt(data.saida);

    if (data.descriptionx) {
      desccor = data.descriptioncolor;
    } else {
      desccor = "none";
    }

    return data.description
      ? `<font style="color:${desccor}">${data.description}</font>`
      : `<font style="color:${desccor}">${info[prse]}</font>`
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName, 'Data'];
  },

  fields: ["date", "saida", "storage", "varName", "modo", "description", "descriptionx", "descriptioncolor", "iffalse", "iffalseVal"],

  html(_isEvent, data) {
    return `
  <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/French/archive/refs/heads/main.zip">Mettre à jour</div>
  <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/French">Github: Version 0.2</div>

  <style>
    .dbmmodsbr1 {
      position: absolute;
      bottom: 0px;
      border: 0px solid rgba(50,50,50,0.7);
      background: rgba(0,0,0,0.7);
      color: #999;
      padding: 5px;
      left: 0px;
      z-index: 999999;
      cursor: pointer
    }

    .dbmmodsbr2 {
      position: absolute;
      bottom: 0px;
      border: 0px solid rgba(50,50,50,0.7);
      background: rgba(0,0,0,0.7);
      color: #999;
      padding: 5px;
      right: 0px;
      z-index: 999999;
      cursor: pointer
    }
  </style>

  <div id="flutuador" style="padding:0px 0px 15px 0px">
    <table style="width:100%;"><tr>
      <td>
        <span class="dbminputlabel">Description de l'action</span>
        <br>
        <input type="text" class="round" id="description" placeholder="Laisser vide pour désactiver">
      </td>
      <td style="padding:0px 0px 0px 10px;width:70px">
        <div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px">
          <dbm-checkbox id="descriptionx" label="Couleur"></dbm-checkbox>
        </div>
        <br>
        <input type="color" value="#ffffff" class="round" id="descriptioncolor">
      </td>
    </table>
  </div>

  <span class="dbminputlabel">Format</span>
  <select id="modo" class="round" onchange="glob.change(this)">
    <option value="0">Date</option>
    <option value="1">Horodatage</option>
    <option value="2">Horodatage millisecondes</option>
  </select>

  <br>

  <span class="dbminputlabel" id="text">Date</span>
  <input id="date" class="round" style="width: 100%;" type="text" placeholder="Laisser vide pour une nouvelle date">

  <br>

  <span class="dbminputlabel">Temps</span>
  <select id="saida" class="round">
    <option value="0" selecionado>Heures et minutes (HH/MM)</option>
    <option value="1">Heures, minutes et secondes (HH/MM/SS)</option>
    <option value="2">Jours, mois et années (DD/MM/YYYY - nombre)</option>
    <option value="3">Jours, mois et années (DD/MM/YYYY - texte)</option>
    <option value="4">DD/MM/YYYY + HH/MM</option>
    <option value="5">Jours + DD/MM/YYYY + HH/MM</option>
    <option value="6">Relatif</option>
  </select>

  <br>

  <div style="float: left; width: 40%">
    <span class="dbminputlabel">En cas d'érreur</span>
    <select id="iffalse" class="round" onchange="glob.onComparisonChanged(this)">
        <option value="0" selecionado>Continuer</option>
        <option value="1">Arrêter</option>
        <option value="2">Sauter à l'action</option>
        <option value="3">Ignorer les actions</option>
        <option value="4">Aller à l'action ancré</option>
    </select>
  </div>

  <div id="iffalseContainer" style="display: none; float: right; width: 55%;">
    <span id="xinelas" class="dbminputlabel">Para</span>
    <br>
    <input id="iffalseVal" class="round" name="actionxinxyla" type="text">
  </div>

  <br><br><br>

  <div style="float: left; width: 35%; padding-top: 8px;">
    <span class="dbminputlabel">Stocker dans</span>
    <select id="storage" class="round" onchange="glob.variableChange(this, 'varNameContainer')">
      ${data.variables[1]}
    </select>
  </div>

  <div id="varNameContainer" style="float: right; display: none; width: 60%; padding-top: 8px;">
    <span class="dbminputlabel">Nom de la variable</span><br>
    <input id="varName" class="round" type="text">
  </div>;
  
 <style>
  xinspace{padding:5px 0px 0px 0px;display:block}
  .dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
  .dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}
  </style>`;
  },

  init() {
    const { glob, document } = this;
    glob.variableChange(document.getElementById('storage'), 'varNameContainer');

    const xinelaslinks = document.getElementsByClassName("xinelaslink");
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

    glob.onComparisonChanged = function (event) {
      if (event.value > "1") {
        document.getElementById("iffalseContainer").style.display = null;
      } else {
        document.getElementById("iffalseContainer").style.display = "none";
      }

      if (event.value == "2") {
        document.querySelector("[id='xinelas']").innerText = (`Numéro de l'action`);
      }

      if (event.value == "3") {
        document.querySelector("[id='xinelas']").innerText = (`Nombres d'actions`);
      }

      if (event.value == "4") {
        document.querySelector("[id='xinelas']").innerText = (`Nom de l'action`);
      }
    }

    glob.onComparisonChanged(document.getElementById("iffalse"));

    glob.change = function (event) {
      if (event.value == "0") {
        document.getElementById("text").innerText = "Date";
      } else {
        document.getElementById("text").innerText = "Horodatage";
      }
    };

    glob.change(document.getElementById("modo"));
  },

  action(cache) {
    const data = cache.actions[cache.index];
    const moment = require("moment");
    const saida = parseInt(data.saida, 10);
    const modo = parseInt(data.modo);
    const time = this.evalMessage(data.date, cache) || new Date();
    let date;

    switch (modo) {
      case 0:
        date = moment(time, "DD/MM/YYYY HH:mm:ss").format("X");
        break;
      case 1:
        date = moment(time, "X").format("X");
        break;
      case 2:
        date = moment(time, "x").format("X");
        break;
    }

    if (date == "Invalid date") {
      return this.executeResults(false, data, cache);
    }

    switch (saida) {
      case 0:
        result = `<t:${date}:t>`;
        break;
      case 1:
        result = `<t:${date}:T>`;
        break;
      case 2:
        result = `<t:${date}:d>`;
        break;
      case 3:
        result = `<t:${date}:D>`;
        break;
      case 4:
        result = `<t:${date}:f>`;
        break;
      case 5:
        result = `<t:${date}:F>`;
        break;
      case 6:
        result = `<t:${date}:R>`;
        break;
    }

    const storage = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);
    this.storeValue(result, storage, varName, cache);

    this.callNextAction(cache);
  },

  mod() {},
};