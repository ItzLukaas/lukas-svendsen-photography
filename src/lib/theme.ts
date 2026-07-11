/** Always apply dark theme before first paint */
export const themeInitScript = `(function(){try{var d=document.documentElement;d.setAttribute("data-theme","dark");d.style.colorScheme="dark";localStorage.removeItem("lukas-theme");}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;
