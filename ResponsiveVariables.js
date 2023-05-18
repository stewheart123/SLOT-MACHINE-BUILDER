/**
 * Use variables here to determine the desktop and mobile sizes
 * Variables update when the page is
 *
 */

let headerHeight;
let footerHeight;
let gameAreaPanelWidth;
let gameAreaPanelHeight;
let gameContainerYOffset;
let titleFontSize;
let titleYOffset;
let headerContainerWidth;
let gameUIPanelWidth;

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
  gameUIPanelWidth = 600;

  if (window.innerWidth < 768) {
    titleFontSize = 36;
    gameAreaPanelWidth = window.innerWidth - 20;
    gameUIPanelWidth = window.innerWidth - 20;
    console.log(window.innerWidth - 20);
  }
  if (window.innerWidth < 1701) {
    gameContainerYOffset = 100;
    gameAreaPanelHeight = window.innerHeight - (footerHeight + headerHeight);
    headerContainerWidth = window.innerWidth / 2;
    titleYOffset = headerHeight / 2;
  }
}

window.addEventListener("resize", handleResize);
