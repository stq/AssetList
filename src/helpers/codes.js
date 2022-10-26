export const AUD = 'AUD';
export const JPY = 'JPY';
export const USD = 'USD';
export const GBP = 'GBP';
export const EUR = 'EUR';
export const CAD = 'CAD';
export const CHF = 'CHF';
export const NZD = 'NZD';

export const CURRENCY_TO_COUNTRY = {
    AUD: "au",
    JPY: "jp",
    USD: "us",
    GBP: "gb",
    EUR: "eu",
    CAD: "ca",
    CHF: "ch",
    NZD: "nz"
}

export const MAJORPAIRS = [
    [EUR, USD ],
    [USD, JPY ],
    [GBP, USD ],
    [USD, CHF ],
    [USD, CAD ],
    [AUD, USD ],
    [NZD, USD ]
];

export const MINORPAIRS = [
    [EUR, GBP ],
    [EUR, JPY ],
    [GBP, JPY ],
    [GBP, CAD ],
    [CHF, JPY ],
    [EUR, AUD ],
    [NZD, JPY ]
]

export const ALLPAIRS = [
    [AUD, JPY],
    [EUR, CAD],
    [EUR, CHF],
    [GBP, AUD],
    ...MAJORPAIRS,
    ...MINORPAIRS
]

const SMARTFX_CURRENCIES = [ USD, EUR, GBP, JPY ];
export const SMARTFXPAIRS = ALLPAIRS.filter(pair => SMARTFX_CURRENCIES.includes(pair[0]) && SMARTFX_CURRENCIES.includes(pair[1]));

