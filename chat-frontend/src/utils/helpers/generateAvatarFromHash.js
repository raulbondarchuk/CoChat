import tinycolor from 'tinycolor2';

const getCorrectIndex = number => {
    if (number > 255) {
        return 255;
    }
    if (number < 0) {
        return 0;
    }
    return number;
};

export default (hash) => {
    const [r, g, b] = hash
        .substr(0, 3)
        .split('')
        .map(char => getCorrectIndex(char.charCodeAt(0)));

    return {
        color: tinycolor({ r, g, b })
        .lighten(10)
        .saturate(10)
        .toHexString(),
        colorLighten: tinycolor({ r, g, b })
            .lighten(40)
            .saturate(20)
            .toHexString(),
    };
};
