/**
 * Add objects in bundles based on which scene the asset is used on
 */
const assetBundles = [{
    name: 'load-screen',
    assets: [
        {
            name: 'loadingImage',
            srcs: '/assets/images/load-image.jpg',
        },
    ],
},
{
    name: 'game-screen',
    assets: [
        {
            name: 'amber',
            srcs: '/assets/images/amber.png',
        },
        {
            name: 'diamond',
            srcs: '/assets/images/diamond.png',
        },
        {
            name: 'gold',
            srcs: '/assets/images/gold.png',
        },
        {
            name: 'opal',
            srcs: '/assets/images/opal.png',
        },
        {
            name: 'backgroundImage',
            srcs: '/assets/images/background.jpg',
        }
    ],
}];