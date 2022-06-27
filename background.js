// Find a way to do this without copy-pasting

chrome.runtime.onInstalled.addListener(() => {
  // Establish default values:
  chrome.storage.sync.set({
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
  }, function() {
	console.log("Installation successful!")
  })
  
});



function makeRegion(url, themes) {
	return region = {
		url: url,
		themes: themes
	};
}


function makeTheme(niceName, logo, title, subtitle) {
	return theme = {
		niceName: niceName,
		logo: logo,
		title: title,
		subtitle: subtitle
	};
}


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