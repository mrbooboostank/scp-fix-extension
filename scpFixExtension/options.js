//chrome.storage.sync.clear()
/*
Domains to languages:
https://scp-wiki.wikidot.com/ = English
https://05command.wikidot.com/ = 05 Command Admin Site
https://scp-int.wikidot.com/ = International
https://scp-ru.wikidot.com/ = Russian
https://ko.scp-wiki.net/ = Korean
https://scp-wiki-cn.wikidot.com/ = Chinese
https://fondationscp.wikidot.com/ = French
https://scp-wiki.net.pl/ = Polish
https://lafundacionscp.wikidot.com/ = Spanish
https://scp-th.wikidot.com/ = Thai
https://scp-jp.wikidot.com/ = Japanese
https://scp-wiki-de.wikidot.com/ = German
https://fondazionescp.wikidot.com/ = Italian
https://scp-ukrainian.wikidot.com/ = Ukrainian
https://scp-pt-br.wikidot.com/ = Portuguese
https://scp-cs.wikidot.com/ = Czech
https://scp-zh-tr.wikidot.com/ = Traditional Chinese
https://scp-vn.wikidot.com/ = Vietnamese
https://scp-un.wikidot.com/ = Underrepresented Languages Incubator
*/
let timer = null;

let lastRegion = null;
let lastTheme = null;

// Saves options to chrome.storage
let regionBox = getElem("regionBox")
let themeBox = getElem("themeBox")
let logoBox = getElem("logoBox")
let titleBox = getElem("titleBox")
let subtitleBox = getElem("subtitleBox")

const engRegionDefault = makeRegion(
"scp-wiki.wikidot.com",
{"default": makeTheme("Default (SCP-Sigma-9)", "https://scp-wiki.wdfiles.com/local--files/component:theme/logo.png", "SCP Foundation", "Secure, Contain, Protect"),
"Black-Highlighter": makeTheme("Black Highlighter", "https://nu-scptheme.github.io/Black-Highlighter/img/logo.svg", "SCP Foundation", "SECURE, CONTAIN, PROTECT"),
"blankstyle": makeTheme("Blankstyle", chrome.runtime.getURL("custom43Head.png"), "R&C SITE-43", "SUBVERTING COMMON PRACTICE"),
"AZASTYLE": makeTheme("Azastyle", "https://scp-wiki.wdfiles.com/local--files/theme%3Apaperstack/lgtrans.png", "SCP FOUNDATION", "SECURE - CONTAIN - PROTECT"),
"Simple Yonder": makeTheme("Simple Yonder", "https://scp-wiki.wdfiles.com/local--files/theme%3Asimple-yonder/logo.png", "SCP Foundation", "Secure, Contain, Protect"),
"broken-masquerade": makeTheme("Broken Masquerade", "https://scp-wiki.wdfiles.com/local--files/theme%3Abroken-masquerade/new_scp_logo.png", "SCP Foundation", "Safety Continues in Public"),
"flopstyle-dark": makeTheme("Flopstyle: DARK", "https://scp-wiki.wdfiles.com/local--files/welcome-to-delta-t/Delta-t-transparent.png", "TEMPORAL SITE-01", "SUSTAINING CHRONOLOGICAL PREDICTABILITY")}
)

const o5cRegionDefault = makeRegion(
"05command.wikidot.com",
{"default": makeTheme("Default (SCP-Sigma-9)", "https://scp-wiki.wdfiles.com/local--files/component:theme/logo.png", "O5 Command", "Administration and Management")}
)

const intRegionDefault = makeRegion(
"scp-int.wikidot.com",
{"default": makeTheme("Default (SCP-Sigma-9)", "https://grombald.github.io/Common-Theme/img/int/scp-logo-int-small.png", "International Translation Archive", "of the SCP Foundation")}
)

const rusRegionDefault = makeRegion(
"scp-ru.wikidot.com",
{"default": makeTheme("Default (SCP-Sigma-9)", "https://scp-wiki.wdfiles.com/local--files/component:theme/logo.png", "SCP Foundation", "Russian Branch")}
)

const korRegionDefault = makeRegion(
"ko.scp-wiki.net",
{"default": makeTheme("Default (SCP-Sigma-9)", "https://scpko.wdfiles.com/local--files/component%3Atheme/logo.png", "SCP 재단", "확보, 격리, 보호")}
)

const chiRegionDefault = makeRegion(
"scp-wiki-cn.wikidot.com",
{"default": makeTheme("Default (SCP-Sigma-9)", "https://sigma9.scpwikicn.com/cn/img/logo.png", "SCP基金会", "控制，收容，保护")}
)

const freRegionDefault = makeRegion(
"fondationscp.wikidot.com",
{"default": makeTheme("Default (SCP-Sigma-9)", "https://grombald.github.io/Common-Theme/svg/header-logo.svg", "Fondation SCP", "Sécuriser, Contenir, Protéger")}
)

const polRegionDefault = makeRegion(
"scp-wiki.net.pl",
{"default": makeTheme("Default (SCP-Sigma-9)", "https://scp-pl.wdfiles.com/local--files/component%3Atheme/scp-pl.png", "Fundacja SCP", "Polska Filia SCP")}
)

const spaRegionDefault = makeRegion(
"lafundacionscp.wikidot.com",
{"default": makeTheme("Default (SCP-Sigma-9)", "https://lafundacionscp.wdfiles.com/local--files/component%3Atheme/logo.png", "La Fundación SCP", "Rama Hispanohablante")}
)

const thaRegionDefault = makeRegion(
"scp-th.wikidot.com",
{"default": makeTheme("Default (SCP-Sigma-9)", "https://scp-th.wdfiles.com/local--files/component%3Atheme/logo_th.png", "สถาบัน SCP", "ควบคุม, กักกัน, ป้องกัน")}
)

const japRegionDefault = makeRegion(
"scp-jp.wikidot.com",
{"default": makeTheme("Default (SCP-Sigma-9)", "https://scp-jp.wdfiles.com/local--files/component%3Atheme/logo.png", "SCP財団", "確保、収容、保護")}
)

const gerRegionDefault = makeRegion(
"scp-wiki-de.wikidot.com",
{"default": makeTheme("Default (SCP-Sigma-9)", "https://grombald.github.io/Common-Theme/svg/header-logo.svg", "SCP Foundation", "auf Deutsch")}
)

const itaRegionDefault = makeRegion(
"fondazionescp.wikidot.com",
{"default": makeTheme("Default (SCP-Sigma-9)", "https://scp-wiki.wdfiles.com/local--files/component:theme/logo.png", "Fondazione SCP", "Branca Italiana - SCP Foundation")}
)

const ukrRegionDefault = makeRegion(
"scp-ukrainian.wikidot.com",
{"default": makeTheme("Default (SCP-Sigma-9)", "https://scp-ukrainian.wdfiles.com/local--files/component%3Atheme/logo.png", "SCP Foundation", "Ukrainian branch")}
)

const porRegionDefault = makeRegion(
"scp-pt-br.wikidot.com",
{"default": makeTheme("Default (SCP-Sigma-9)", "https://scp-pt-br.wdfiles.com/local--files/component:theme/logo.png", "Fundação SCP", "Filial Lusófona")}
)

const czeRegionDefault = makeRegion(
"scp-cs.wikidot.com",
{"default": makeTheme("Default (SCP-Sigma-9)", "https://grombald.github.io/Common-Theme/svg/header-logo.svg", "SCP Nadace", "Česká Větev SCP Nadace")}
)

const trcRegionDefault = makeRegion(
"scp-zh-tr.wikidot.com",
{"default": makeTheme("Default (SCP-Sigma-9)", "https://scp-zh-tr.wdfiles.com/local--files/component%3Atheme-new/logo.png", "SCP基金會", "控制，收容，保護")}
)

const vieRegionDefault = makeRegion(
"scp-vn.wikidot.com",
{"default": makeTheme("Default (SCP-Sigma-9)", "https://scp-vn.wdfiles.com/local--files/component%3Atheme/logo-vn-100", "Tổ Chức SCP", "Quản thúc, Lưu trữ, Bảo vệ")}
)

const uliRegionDefault = makeRegion(
"scp-un.wikidot.com",
{"default": makeTheme("Default (SCP-Sigma-9)", "https://scp-un.wdfiles.com/local--files/component:theme/scp-logo-uli_header.png", "SCP Foundation", "Underrepresented Languages Incubator")}
)


const regionsDefault = {
	"eng": engRegionDefault,
	"o5c": o5cRegionDefault,
	"int": intRegionDefault,
	"rus": rusRegionDefault,
	"kor": korRegionDefault,
	"chi": chiRegionDefault,
	"fre": freRegionDefault,
	"pol": polRegionDefault,
	"spa": spaRegionDefault,
	"tha": thaRegionDefault,
	"jap": japRegionDefault,
	"ger": gerRegionDefault,
	"ita": itaRegionDefault,
	"ukr": ukrRegionDefault,
	"por": porRegionDefault,
	"cze": czeRegionDefault,
	"trc": trcRegionDefault,
	"vie": vieRegionDefault,
	"uli": uliRegionDefault
}

let regionsUser = {
	"eng": "",
	"o5c": "",
	"int": "",
	"rus": "",
	"kor": "",
	"chi": "",
	"fre": "",
	"pol": "",
	"spa": "",
	"tha": "",
	"jap": "",
	"ger": "",
	"ita": "",
	"ukr": "",
	"por": "",
	"cze": "",
	"trc": "",
	"vie": "",
	"uli": ""
}

// Populate regionBox
for (const [key, value] of Object.entries(regionsDefault)) {
	let curOption = document.createElement("option");
	curOption.value = key;
	curOption.text = value.url;
	regionBox.add(curOption)
}


function fillThemeBox(region) {
	for (const [key, value] of Object.entries(region.themes)) {
		let curOption = document.createElement("option");
		curOption.value = key;
		curOption.text = value.niceName;
		themeBox.add(curOption)
	}
}

let saveButton = getElem("save")
let loadButton = getElem("load")
let loadAndSaveButton = getElem("loadAndSave")


function getElem(string) {
	return document.getElementById(string);
}


function clearThemeBox() {
	let selectBox = themeBox;
	while (selectBox.options.length > 0) {
		selectBox.remove(0);
	}
}


function makeTheme(niceName, logo, title, subtitle) {
	return theme = {
		niceName: niceName,
		logo: logo,
		title: title,
		subtitle: subtitle
	};
}


function makeRegion(url, themes) {
	return region = {
		url: url,
		themes: themes
	};
}


function saveOptions() {
  chrome.storage.sync.set({
	lastRegion: lastRegion,
	lastTheme: lastTheme,
	  
    engRegion: regionsUser["eng"],
    o5cRegion: regionsUser["o5c"],
	intRegion: regionsUser["int"],
	rusRegion: regionsUser["rus"],
	korRegion: regionsUser["kor"],
	chiRegion: regionsUser["chi"],
	freRegion: regionsUser["fre"],
	polRegion: regionsUser["pol"],
	spaRegion: regionsUser["spa"],
	thaRegion: regionsUser["tha"],
	japRegion: regionsUser["jap"],
	gerRegion: regionsUser["ger"],
	itaRegion: regionsUser["ita"],
	ukrRegion: regionsUser["ukr"],
	porRegion: regionsUser["por"],
	czeRegion: regionsUser["cze"],
	trcRegion: regionsUser["trc"],
	vieRegion: regionsUser["vie"],
	uliRegion: regionsUser["uli"],
  }); // Don't add a function parameter here so loadAndSave() can overwrite this status message
	startStatusTimer("Options saved!")
}


function loadDefaults() {
	// Deep copy
	regionsUser = JSON.parse(JSON.stringify(regionsDefault));
	const curRegion = regionsUser[regionBox.value]
	const curTheme = curRegion.themes[themeBox.value];
    logoBox.value = curTheme.logo;
    titleBox.value = curTheme.title;
    subtitleBox.value = curTheme.subtitle;
	startStatusTimer("Defaults loaded!")
}


function loadAndSave() {
	loadDefaults()
	saveOptions()
	startStatusTimer("Defaults loaded and saved!")
}


function startStatusTimer(message) {
	clearTimeout(timer);
	// Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = message;
    timer = window.setTimeout(function() {
      status.textContent = '';
	  saveButton.blur()
	  loadButton.blur()
	  loadAndSaveButton.blur()
    }, 950);
}

// Restores select box state using the preferences
// stored in chrome.storage.
function loadOptions() {
  // Establish default values:
  chrome.storage.sync.get({
	lastRegion: "eng",
	lastTheme: "default",
	  
    engRegion: engRegionDefault,
    o5cRegion: o5cRegionDefault,
	intRegion: intRegionDefault,
	rusRegion: rusRegionDefault,
	korRegion: korRegionDefault,
	chiRegion: chiRegionDefault,
	freRegion: freRegionDefault,
	polRegion: polRegionDefault,
	spaRegion: spaRegionDefault,
	thaRegion: thaRegionDefault,
	japRegion: japRegionDefault,
	gerRegion: gerRegionDefault,
	itaRegion: itaRegionDefault,
	ukrRegion: ukrRegionDefault,
	porRegion: porRegionDefault,
	czeRegion: czeRegionDefault,
	trcRegion: trcRegionDefault,
	vieRegion: vieRegionDefault,
	uliRegion: uliRegionDefault
  }, function(result) {
	lastRegion = result.lastRegion;
	lastTheme = result.lastTheme;
	  
	regionsUser["eng"] = result.engRegion
	regionsUser["o5c"] = result.o5cRegion
	regionsUser["int"] = result.intRegion
	regionsUser["rus"] = result.rusRegion
	regionsUser["kor"] = result.korRegion
	regionsUser["chi"] = result.chiRegion
	regionsUser["fre"] = result.freRegion
	regionsUser["pol"] = result.polRegion
	regionsUser["spa"] = result.spaRegion
	regionsUser["tha"] = result.thaRegion
	regionsUser["jap"] = result.japRegion
	regionsUser["ger"] = result.gerRegion
	regionsUser["ita"] = result.itaRegion
	regionsUser["ukr"] = result.ukrRegion
	regionsUser["por"] = result.porRegion
	regionsUser["cze"] = result.czeRegion
	regionsUser["trc"] = result.trcRegion
	regionsUser["vie"] = result.vieRegion
	regionsUser["uli"] = result.uliRegion
	
	regionBox.value = lastRegion
	
	// Has to use regionsDefault otherwise the theme order breaks
	fillThemeBox(regionsDefault[lastRegion]);
	themeBox.value = lastTheme
	
	const curTheme = regionsUser[lastRegion].themes[lastTheme];
	
	logoBox.value = curTheme.logo;
	titleBox.value = curTheme.title;
	subtitleBox.value = curTheme.subtitle;
  });
}

// default parameters don't work inside .addEventListener
document.addEventListener('DOMContentLoaded', loadOptions);

function updateRegion() {
	console.log("Region change detected!")
	const curRegion = regionsDefault[regionBox.value]
	lastRegion = regionBox.value;
	clearThemeBox();
	fillThemeBox(curRegion);
	updateTheme()
	chrome.storage.sync.set({
		lastRegion: lastRegion,
	})
}

function updateTheme() {
	console.log("Theme change detected!")
	const curRegion = regionsUser[regionBox.value]
	const curTheme = curRegion.themes[themeBox.value];
	lastTheme = themeBox.value;
	logoBox.value = curTheme.logo
	titleBox.value = curTheme.title
	subtitleBox.value = curTheme.subtitle
	chrome.storage.sync.set({
		lastTheme: lastTheme,
	})
}

function updateOptions() {
	console.log("Option change detected!")
	const curRegion = regionsUser[regionBox.value]
	const curTheme = curRegion.themes[themeBox.value];
	curTheme.logo = logoBox.value;
	curTheme.title = titleBox.value;
	curTheme.subtitle = subtitleBox.value;
}

saveButton.addEventListener('click', saveOptions);
loadButton.addEventListener('click', loadDefaults);
loadAndSaveButton.addEventListener('click', loadAndSave);

regionBox.addEventListener('change', updateRegion);
themeBox.addEventListener('change', updateTheme);

logoBox.addEventListener('change', updateOptions);
titleBox.addEventListener('change', updateOptions);
subtitleBox.addEventListener('change', updateOptions);

/*let buttonsList = document.getElementById('buttons').getElementsByClassName("button")
for (var i = 0; buttonsList[i]; i++) {
	buttonsList[i].addEventListener('click', saveOptions);
}*/