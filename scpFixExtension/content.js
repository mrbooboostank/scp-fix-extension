//console.log("SCP Extension ran!")

const dataHolder = document.createElement("div");
setAttr("theme", 0);
setAttr("themeFinished", false);
setAttr("logoFinished", false);
setAttr("titleFinished", false);
setAttr("subtitleFinished", false);

//console.log("dataHolder is:")
//console.log(dataHolder)

const region = ((document.location.href).split("//")[1]).split("/")[0];

// Currently only supports the English region
// Most common to least common order
// Themes are case-sensitive
// 0 = default theme
const themesList = [
"Black-Highlighter",
"blankstyle",
"AZASTYLE",
"Simple Yonder",
"broken-masquerade" ,
"flopstyle-dark",
"cyberpunk",
"calamity"
];

const regionToSaveString = {
	"scp-wiki.wikidot.com": "engRegion",
	"05command.wikidot.com": "o5cRegion",
	"scp-int.wikidot.com": "intRegion",
	"scp-ru.wikidot.com": "rusRegion",
	"ko.scp-wiki.net": "korRegion",
	"scp-wiki-cn.wikidot.com": "chiRegion",
	"fondationscp.wikidot.com": "freRegion",
	"scp-wiki.net.pl": "polRegion",
	"lafundacionscp.wikidot.com": "spaRegion",
	"scp-th.wikidot.com": "thaRegion",
	"scp-jp.wikidot.com": "japRegion",
	"scp-wiki-de.wikidot.com": "gerRegion",
	"fondazionescp.wikidot.com": "itaRegion",
	"scp-ukrainian.wikidot.com": "ukrRegion",
	"scp-pt-br.wikidot.com": "porRegion",
	"scp-cs.wikidot.com": "czeRegion",
	"scp-zh-tr.wikidot.com": "trcRegion",
	"scp-vn.wikidot.com": "vieRegion",
	"scp-un.wikidot.com": "uliRegion"
}

const regionString = regionToSaveString[region]

// This and the noSpace function should probably be replaced later
// Try replacing them with a list and see if referencing
// Elements within said list from the asynchronous thread works properly
const themesDataHolder = document.createElement("div");
					
//Start loading user data instantly for later
chrome.storage.sync.get([regionString], function(result) {
	// This function runs asynchronously, but it can communicate with
	// the content script through document elements
	// document.getElementById doesn't work for some reason
	const themesList = result[regionString].themes
	for (const [key, value] of Object.entries(themesList)) {
		const id = regionString + noSpace(key);
		themesDataHolder.setAttribute(id + "logo", themesList[key].logo);
		themesDataHolder.setAttribute(id + "title", themesList[key].title);
		themesDataHolder.setAttribute(id + "subtitle", themesList[key].subtitle);
		//console.log(themesDataHolder)
	}
});

const logoAttr = "logo";
const titleAttr = "title";
const subtitleAttr = "subtitle";

// This is specifically needed so the theme detection knows when to stop
const logoElemDefault = "#header"


function noSpace(string) {
	return string.replace(/\s/g, '')
}


function titleFunc(themeNum, newText) {
	let scanElemString;
	let elem;
	switch(parseInt(themeNum)) {
		case 5: // Broken Masquerade
		case 4: // Simple Yonder
		case 0: // Default
			scanElemString = "#header h1 a span"
			elem = getElem(scanElemString);
			if (elem != null && !getBoolAttr("titleFinished")) {
				let oldText = elem.innerHTML;
				elem.innerHTML = newText;
				console.log("Replaced \"" + oldText + "\" with \"" + newText + "\"")
				setAttr("titleFinished", true)
			}
			break;
		//case 8: // Calamity
		case 2: // Blankstyle
		case 3: // AZASTYLE
		case 1: // Black Highlighter
		case 6: // Flopstyle Dark
			scanElemString = "#header h1 a"
			elem = getElem(scanElemString)
			if (elem != null && !getBoolAttr("titleFinished")) {
				elem.style.setProperty('--header-title', "\'" + newText + "\'");
				console.log("Set title to " + "\"" + newText + "\"")
				setAttr("titleFinished", true)
			}
			break;
	}
}


function subtitleFunc(themeNum, newText) {
	let scanElemString;
	let elem;
	let oldText;
	switch(parseInt(themeNum)) {
		case 4: // Simple Yonder
		case 0: // Default
			scanElemString = "#header h2 span"
			elem = getElem(scanElemString);
			if (elem != null && !getBoolAttr("subtitleFinished")) {
				oldText = elem.innerHTML;
				elem.innerHTML = newText;
				console.log("Replaced \"" + oldText + "\" with \"" + newText + "\"")
				setAttr("subtitleFinished", true)
			}
			break;
		//case 8: // Calamity
		case 1: // Black Highlighter
			scanElemString = "#header h2 span"
			elem = getElem(scanElemString)
			if (elem != null && !getBoolAttr("subtitleFinished")) {
				elem.style.setProperty('--header-subtitle', "\'" + newText + "\'");
				console.log("Set subtitle to " + "\"" + newText + "\"")
				setAttr("subtitleFinished", true)
			} 
			break;
		case 2: // Blankstyle
		case 3: // AZASTYLE
		case 6: // Flopstyle Dark
			scanElemString = "#header h2"
			elem = getElem(scanElemString)
			if (elem != null && !getBoolAttr("subtitleFinished")) {
				elem.style.setProperty('--header-subtitle', "\'" + newText + "\'");
				console.log("Set subtitle to " + "\"" + newText + "\"")
				setAttr("subtitleFinished", true)
			}
			break;
		case 5: // Broken Masquerade
			scanElemString = "#header h2 span"
			elem = getElem(scanElemString)
			if (elem != null && !getBoolAttr("subtitleFinished")) {
				// addRule works while insertRule doesn't, though addRule is deprecated
				document.styleSheets[0].addRule('#header h2 span::before','content: "'+newText+'" !important;');
				elem.style.setProperty('content', "\'" + newText + "\'");
				console.log("Set subtitle to " + "\"" + newText + "\"")
				setAttr("subtitleFinished", true)
			}
			break;
	}
}


function logoFunc(themeNum, newLogo) {
	let scanElemString;
	let elem;
	
	switch(parseInt(themeNum)) {
		case 5: // Broken Masquerade
		case 4: // Simple Yonder
		case 0: // Default
			scanElemString = logoElemDefault
			elem = getElem(scanElemString);
			if (elem != null && !getBoolAttr("logoFinished")) {
				let oldLogo = elem.style.background;
				let convertedNewLogo = "url(\'" + newLogo + "\')"
				elem.setAttribute("style", "background-image: " + convertedNewLogo +  " !important;")
				console.log("Set SCP logo to: \"" + newLogo + "\"")
				setAttr("logoFinished", true)
			}
			break;
		case 2: // Blankstyle
		case 3: // AZASTYLE
		case 6: // Flopstyle Dark
			scanElemString = "#extra-div-1"
			elem = getElem(scanElemString);
			if (elem != null && !getBoolAttr("logoFinished")) {
				let oldLogo = elem.style.background;
				let convertedNewLogo = "url(\'" + newLogo + "\')"
				elem.setAttribute("style", "background-image: " + convertedNewLogo +  " !important;")
				console.log("Set SCP logo to: \"" + newLogo + "\"")
				setAttr("logoFinished", true)
			}
			break;
		case 1: // Black Highlighter
			scanElemString = "#header"
			elem = getElem(scanElemString);
			if (elem != null && !getBoolAttr("logoFinished")) {
				let oldLogo = elem.style.background;
				let convertedNewLogo = "url(\'" + newLogo + "\')"
				elem.setAttribute("style", "--logo-image: " + convertedNewLogo +  " !important; " + "--lgurl: " + convertedNewLogo +  " !important;")
				console.log("Set SCP logo to: \"" + newLogo + "\"")
				setAttr("logoFinished", true)
			}
			break;
		/*case 8: // Calamity
			scanElemString = "#extra-div-1"
			const scanElemString2 = "#extra-div-2"
			elem = getElem(scanElemString);
			const elem2 = getElem(scanElemString2);
			if (elem != null && elem2 != null && !getBoolAttr("logoFinished")) {
				let oldLogo = elem.style.background;
				let convertedNewLogo = "url(\'" + newLogo + "\')"
				elem.setAttribute("style", "background-image: " + convertedNewLogo +  " !important;")
				elem2.setAttribute("style", "background-image: " + convertedNewLogo +  " !important;")
				console.log("Set SCP logo to: \"" + newLogo + "\"")
				setAttr("logoFinished", true)
			}*/
	}
}


function determineTheme() {
	const themeFinished = getBoolAttr("themeFinished");
	if (!themeFinished) {
		// If the theme info hasn't loaded before the logo wants to be set,
		// then that means we're on the default theme
		if (getElem(logoElemDefault) != null) {
			const themeNum = getAttr("theme")
			setAttr("themeFinished", true)
			if (themeNum == 0) {
				console.log("Current theme is: " + "default")
			}
			else {
				console.log("Current theme is: " + themesList[themeNum - 1])
			}
		}
		else {
			// Determine theme
			const styleElems = getElem("head").querySelectorAll("style")
			//console.log(styleElems)
			for (let style of styleElems) {
				for (var i = 0; i < themesList.length; i++) {
					// Do i + 1 because the default theme should equal 0
					// The Default theme is only detected by no theme
					// being found through iteration
					
					const desiredTheme = themesList[i];
					const bestTheme = getAttr("theme")
					
					if (style.innerHTML.includes(desiredTheme) && i + 1 > bestTheme) {
						setAttr("theme", i + 1)
					}
				}
			}
		}
	}
}

function numToTheme(themeNum, doNoSpace) {
	if (themeNum > 0) {
		let name = themesList[themeNum - 1]
		if (doNoSpace) {
			return noSpace(name)
		}
		return name
	}
	return "default"
}

function updateElems() {
	const themeFinished = getBoolAttr("themeFinished"); 
	determineTheme()
	if (themeFinished) {
		const themeNum = getAttr("theme")
		const themeId = regionString + numToTheme(themeNum, true);
		logoFunc(themeNum, themesDataHolder.getAttribute(themeId + "logo"));
		titleFunc(themeNum, themesDataHolder.getAttribute(themeId + "title"));
		subtitleFunc(themeNum, themesDataHolder.getAttribute(themeId + "subtitle"));
	}
}


function getAttr(string) {
	return dataHolder.getAttribute(string);
}

function getBoolAttr(string) { 
	return dataHolder.getAttribute(string) === "true"; // Convert string back to boolean
}


function setAttr(key, value) {
	dataHolder.setAttribute(key, value)
}


function getElem(string) {
	return document.querySelector(string);
}


// This function allows the extension to react to the DOM loading in time
let mutationObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
		updateElems()
    });
});


// Starts listening for changes in the root HTML element of the page.
mutationObserver.observe(document.documentElement, {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true
});


// Update elements if the user changes settings after the page loads
chrome.storage.sync.onChanged.addListener(function (changes, namespace) {
	let changedItems = Object.keys(changes);
	
	for (let item of changedItems) {
		const curItem = changes[item]
		if (typeof curItem === "object") {
			// console.log("New user settings detected!")
			const curRegion = curItem.newValue;
			if (curRegion.url === region) {
				const themeNum = getAttr("theme")
				const curTheme = numToTheme(themeNum, false)
				const themeAttrId = regionString + noSpace(curTheme)
				
				themesDataHolder.setAttribute(themeAttrId + "logo", curRegion.themes[curTheme][logoAttr]);
				themesDataHolder.setAttribute(themeAttrId + "title", curRegion.themes[curTheme][titleAttr]);
				themesDataHolder.setAttribute(themeAttrId + "subtitle", curRegion.themes[curTheme][subtitleAttr]);
				
				setAttr("logoFinished", false)
				setAttr("titleFinished", false)
				setAttr("subtitleFinished", false)
				break;
			}
		}
	}
	
	updateElems()
});


// Remove mutationObserver when the script's finished
document.addEventListener('DOMContentLoaded', function() {
	mutationObserver.disconnect()
	console.log("SCP Wiki Remove Gay Logo Extension finished!")
})