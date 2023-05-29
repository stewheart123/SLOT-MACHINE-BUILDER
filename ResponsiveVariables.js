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
let menuModalHeight;
let maskHeight;
let maskYPos;

handleResize();

function handleResize() {
  headerHeight = 100;
  footerHeight = 100;
  maskHeight = window.innerHeight - footerHeight;
  maskYPos = 0;
  gameAreaPanelWidth = 600;
  gameAreaPanelHeight = window.innerHeight - footerHeight;
  gameContainerYOffset = 0;
  titleFontSize = 50;
  titleYOffset = 100;
  headerContainerWidth = window.innerWidth / 2 - gameAreaPanelWidth;
  gameUIPanelWidth = 600;
  menuModalHeight = gameUIPanelWidth;

  if (window.innerWidth < 768) {
    titleFontSize = 36;
    gameAreaPanelWidth = window.innerWidth - 20;
    gameUIPanelWidth = window.innerWidth - 20;
  }
  if (window.innerWidth < 1701) {
    gameContainerYOffset = 100;
    gameAreaPanelHeight = window.innerHeight - (footerHeight + headerHeight);
    headerContainerWidth = window.innerWidth / 2;
    titleYOffset = headerHeight / 2;
    maskHeight = window.innerHeight - (footerHeight + headerHeight);
    maskYPos = 100;
  }
}

window.addEventListener("resize", handleResize);
