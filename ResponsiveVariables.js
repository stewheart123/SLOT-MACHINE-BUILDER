/**
 * Use variables here to determine the desktop and mobile sizes
 *
 */

console.log(window.innerWidth);

let headerHeight = 100;
let footerHeight = 100;
let gameAreaPanelWidth = 600;
let gameAreaPanelHeight = window.innerHeight - footerHeight;
let gameContainerYOffset = 0;
let titleFontSize = 50;
let titleYOffset = 100;
let headerContainerWidth = window.innerWidth / 2 - gameAreaPanelWidth;
let gameUIPanelWidth = window.innerWidth / 2;

handleResize();

function handleResize() {
  headerHeight = 100;
  footerHeight = 100;
  gameAreaPanelWidth = 600;
  gameAreaPanelHeight = window.innerHeight - footerHeight;
  gameContainerYOffset = 0;
  titleFontSize = 50;
  titleYOffset = 100;
  headerContainerWidth = window.innerWidth / 2 - gameAreaPanelWidth;
  gameUIPanelWidth = window.innerWidth / 2;

  if (window.innerWidth < 768) {
    titleFontSize = 36;
    gameUIPanelWidth = window.innerWidth;
  }
  if (window.innerWidth < 1701) {
    gameContainerYOffset = 100;
    gameAreaPanelHeight = window.innerHeight - (footerHeight + headerHeight);
    headerContainerWidth = window.innerWidth / 2;
    titleYOffset = headerHeight / 2;
  }
}

window.addEventListener("resize", handleResize);
