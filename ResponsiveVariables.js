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
let headerContainerWidth = (window.innerWidth / 2 ) - gameAreaPanelWidth; 
let gameUIPanelWidth = window.innerWidth / 2;

if(window.innerWidth < 768) {
    console.log('mobile mode');
    gameContainerYOffset = 100;
    footerHeight = 100;
    gameAreaPanelWidth = window.innerWidth - 40;
    gameAreaPanelHeight = window.innerHeight - (footerHeight + headerHeight);
    titleFontSize = 36;
    titleYOffset = headerHeight / 2;
    headerContainerWidth = window.innerWidth / 2; 
    gameUIPanelWidth = window.innerWidth;
}