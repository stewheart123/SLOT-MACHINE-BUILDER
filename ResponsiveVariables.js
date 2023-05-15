console.log(window.innerWidth);

let headerHeight = 200;
let footerHeight = 250;
let gameAreaPanelWidth = 500;
let gameAreaPanelHeight = window.innerHeight - headerHeight;
let titleFontSize = 50;
let titleYOffset = headerHeight / 4;

if(window.innerWidth < 768) {
    console.log('mobile mode');
    headerHeight = 100;
    footerHeight = 200;
    gameAreaPanelWidth = window.innerWidth - 40;
    gameAreaPanelHeight = window.innerHeight - (headerHeight + footerHeight);
    titleFontSize = 36;
    titleYOffset = headerHeight / 2;
}