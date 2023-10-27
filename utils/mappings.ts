export function getWojewodztwoFromTerytId(terytId: string) {
    switch (terytId) {
        case '2':
        case '02':
            return 'dolnośląskie';
        case '24':
            return 'śląskie';
        case '16':
            return 'opolskie';
        case '30':
            return 'wielkopolskie';
        case '32':
            return 'zachodniopomorskie';
        case '26':
            return 'świętokrzyskie';
        case '4':
        case '04':
            return 'kujawsko-pomorskie';
        case '20':
            return 'podlaskie';
        case '18':
            return 'podkarpackie';
        case '12':
            return 'małopolskie';
        case '22':
            return 'pomorskie';
        case '28':
            return 'warmińsko-mazurskie';
        case '10':
            return 'łódzkie';
        case '14':
            return 'mazowieckie';
        case '6':
        case '06':
            return 'lubelskie';
        case '8':
        case '08':
            return 'lubuskie';
    }
}

export function getTerytIdFromWojewodztwo(wojewodztwo: string) {
    const lowerCaseWojewodztwo = wojewodztwo.toLowerCase();
    switch (lowerCaseWojewodztwo) {
        case 'dolnośląskie':
            return '2';
        case 'śląskie':
            return '24';
        case 'opolskie':
            return '16';
        case 'wielkopolskie':
            return '30';
        case 'zachodniopomorskie':
            return '32';
        case 'świętokrzyskie':
            return '26';
        case 'kujawsko-pomorskie':
            return '4';
        case 'podlaskie':
            return '20';
        case 'podkarpackie':
            return '18';
        case 'małopolskie':
            return '12';
        case 'pomorskie':
            return '22';
        case 'warmińsko-mazurskie':
            return '28';
        case 'łódzkie':
            return '10';
        case 'mazowieckie':
            return '14';
        case 'lubelskie':
            return '6';
        case 'lubuskie':
            return '8';
        default:
            return '0';
    }
}

export function convertFromUt8ToPolish(province: string) {
    const lowerCaseProvince = province.toLowerCase();
    if (lowerCaseProvince.includes('dolno')) {
        province = 'dolnośląskie';
    } else if (lowerCaseProvince.includes('ma') && lowerCaseProvince.includes('polskie')) {
        province = 'małopolskie'
    } else if (lowerCaseProvince.includes('okrzyskie')) {
        province = 'świętokrzyskie'
    } else if (lowerCaseProvince.includes('mazurskie')) {
        province = 'warmińsko-mazurskie'
    } else if (lowerCaseProvince.includes('zkie')) {
        province = 'łódzkie'
    } else if (lowerCaseProvince.includes('kie') && lowerCaseProvince.length === 7) {
        province = "śląskie"
    }
    return province.toLowerCase();
}