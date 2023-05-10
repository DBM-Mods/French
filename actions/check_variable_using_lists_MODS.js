module.exports = {

  name: "Check Variable Using Lists MOD",
  section: "Conditions",
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data, presets) {
    return `${presets.getConditionsText(data)}`;
  },

  fields: ["storage", "varName", "comparison", "list","varName2","branch"],


  html(isEvent, data) {
    return `
  <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/French/archive/refs/heads/main.zip">Mettre à jour</div>
  <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/French">Github: Version 0.1</div>
  
<retrieve-from-variable allowSlashParams dropdownLabel="Type de Variable" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></retrieve-from-variable>

<br><br><br>

<div style="padding-top: 8px;">
	<div style="float: left; width: 100%;">
		<span class="dbminputlabel">Type de comparaison</span><br>
		<select id="comparison" class="round" onchange="glob.onComparisonChanged(this)">
      <option value="0">Est égale à l'un des éléments de la liste</option>
      <option value="1">Comprend un des éléments de la liste</option>
		</select>
	</div>


<div style="float: left; width: 100%;"><br>
<div style="float: left; width: 35%;">
		<span class="dbminputlabel">Liste</span><br>
			<select id="list" class="round" onchange="glob.onComparisonChanged2(this)">
      ${data.lists[isEvent ? 1 : 0]}
			</select><br>
		</div>
		<div id="varNameContainer2" style=" float: right; width: 60%;">
		<span class="dbminputlabel">Nom de la variable</span><br>
			<input id="varName2" class="round" type="text" list="variableList"><br>
		</div>
</div>

<br><br><br><br>


<hr class="subtlebar">
<br>
<br>
<div>
<conditional-input id="branch" style="padding-top: 8px;"></conditional-input></div>

<style>
  xinspace{padding:5px 0px 0px 0px;display:block}
  .dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
  .dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}
  </style>`;
  },


  preInit(data, formatters) {
    return formatters.compatibility_2_0_0_iftruefalse_to_branch(data);
  },



  init() {
    const { glob, document } = this;
	
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


    glob.onComparisonChanged2 = function (event) {
      if (event.value < "7") {
        document.getElementById("varNameContainer2").style.display = "none";
      } else {
        document.getElementById("varNameContainer2").style.display = null;

      }
    };

    glob.onComparisonChanged2(document.getElementById("list"));
  



  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const type = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);
    const variable = this.getVariable(type, varName, cache);
    const storage2 = parseInt(data.list, 10);
    const varName2 = this.evalMessage(data.varName2, cache);
    const list = await this.getList(storage2, varName2, cache);
    let result = false;

    const val1 = variable;
    const compare = parseInt(data.comparison, 10);
    let val2 = this.evalMessage(data.value, cache);
    let val3 = this.evalMessage(data.value2, cache);
    if (compare !== 6) val2 = this.evalIfPossible(val2, cache);
    switch (compare) {
        case 0:
            result = list.toString().includes(val1);
        break;
        case 1:
          const conditionslist = list
          result = conditionslist.some(elx => val1.includes(elx));
        break;
    }

    this.executeResults(result, data?.branch ?? data, cache);
  },



  modInit(data) {
    this.prepareActions(data.branch?.iftrueActions);
    this.prepareActions(data.branch?.iffalseActions);
  },


  mod() {},
};
