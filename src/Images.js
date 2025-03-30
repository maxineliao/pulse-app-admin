const images = import.meta.glob('./assets/images/*.{png,jpg,jpeg,svg}', {eager: true});
const PlayerImages = Object.fromEntries(
    Object.entries(images).map(([key, value]) => {
        const fileName = key.split('/').pop().replace(/\.\w+$/, '');
        return [ fileName, value.default ];
    })
);

export default PlayerImages;