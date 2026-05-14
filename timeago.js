/*
  TimeAgo Tumblr plugin
  https://mournstera.tumblr.com
  https://github.com/flipsewtf/Tumblr
  Version 2.0.0
  Based on @bychloethemes script
*/
(function () {
    const UNITS = [
        { label: 'now', limit: 10 },
        { label: 's', limit: 60, divisor: 1 },
        { label: 'm', limit: 3600, divisor: 60 },
        { label: 'h', limit: 86400, divisor: 3600 },
        { label: 'd', limit: 604800, divisor: 86400 },
        { label: 'w', limit: 2620800, divisor: 604800 },
        { label: 'mo', limit: 31449600, divisor: 2620800 },
        { label: 'y', limit: Infinity, divisor: 31449600 },
    ];

    const SHORT = { s: 'sec', m: 'min', h: 'hr', d: 'day', w: 'wk', mo: 'mo', y: 'yr' };
    const WORD = {
        s: 'second',
        m: 'minute',
        h: 'hour',
        d: 'day',
        w: 'week',
        mo: 'month',
        y: 'year',
    };
    const ONES = [
        '',
        'one',
        'two',
        'three',
        'four',
        'five',
        'six',
        'seven',
        'eight',
        'nine',
        'ten',
        'eleven',
        'twelve',
        'thirteen',
        'fourteen',
        'fifteen',
        'sixteen',
        'seventeen',
        'eighteen',
        'nineteen',
    ];
    const TENS = [
        '',
        '',
        'twenty',
        'thirty',
        'forty',
        'fifty',
        'sixty',
        'seventy',
        'eighty',
        'ninety',
    ];

    function toWords(n, spaces) {
        if (n < 20) return ONES[n];
        if (n < 100) {
            const t = TENS[Math.floor(n / 10)];
            const o = ONES[n % 10];
            return o ? (spaces ? t + ' ' + o : t + o) : t;
        }
        return 'out of range!';
    }

    function format(timestamp, settings) {
        const diff = Math.floor(Date.now() / 1000) - timestamp;

        const units = settings.months
            ? UNITS
            : UNITS.filter((u) => u.label !== 'mo').map((u) =>
                  u.label === 'w' ? { ...u, limit: 31449600 } : u,
              );

        let n = '';
        let unit = '';

        for (const u of units) {
            if (diff < u.limit) {
                unit = u.label;
                n = unit === 'now' ? '' : String(Math.floor(diff / u.divisor));
                break;
            }
        }

        if (settings.time === 'short' && SHORT[unit]) unit = SHORT[unit];
        if (settings.time === 'word' && WORD[unit]) unit = WORD[unit];

        if (n && settings.time !== 'letter') {
            unit += n !== '1' ? 's' : '';
        }

        if (n && settings.words) n = toWords(Number(n), settings.spaces);

        if (unit === 'now') return 'now';

        const core = settings.spaces
            ? settings.prefix + ' ' + n + ' ' + unit + ' ' + settings.suffix
            : settings.prefix + n + unit + settings.suffix;

        if (settings.ago) {
            return (core + (settings.spaces ? ' ago' : 'ago')).trim();
        }

        return core.trim();
    }

    function timeAgo(elements, options) {
        const settings = Object.assign(
            {
                time: 'letter',
                spaces: false,
                words: false,
                prefix: '',
                suffix: '',
                ago: false,
                months: true,
            },
            options,
        );

        elements.forEach((el) => {
            const ts = parseInt(el.dataset.timestamp ?? el.textContent, 10);
            if (isNaN(ts)) return;
            el.textContent = format(ts, settings);
        });
    }

    window.timeAgo = timeAgo;
})();
