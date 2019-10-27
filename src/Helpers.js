import generate from 'nanoid/generate';

export const nanoPwd = (length = 12) => {
    return generate('23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnpqrstwxyz-_$^+*#!?%&@=()<>/', length);
};

export const nanoUid = (length = 12) => {
    return generate('1234567890abcdef', length);
};

export const pwdStrength = password => {
    return [
        /.{8,}/,
        /([0-9]+)/,
        /[_\-$^+*#!?%&@=()<>\/]/,
        /([a-z\u00E0-\u00FC])+/,
        /([A-Z\u00C0-\u00DC])+/
    ]
    .map(check => check.test(password) ? 20 : 0)
    .reduce((a, b) => a + b, 0);
};

export const copyToClipboard = async str => {
    if ('clipboard' in navigator) {
        return await navigator.clipboard.writeText(str);
    }

    const range = document.createRange();
    range.selectNodeContents(document.body);
    document.getSelection().addRange(range);

    function listener(e) {
        e.clipboardData.setData("text/plain", str);
        e.preventDefault();
    }

    document.addEventListener("copy", listener);
    document.execCommand("copy");
    document.removeEventListener("copy", listener);

    document.getSelection().removeAllRanges();
};

export const tooltip = (node, text) => {
    if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
        return;
    }

    const tooltip = document.createElement('div');
    tooltip.textContent = text;
    tooltip.className = 'tooltip';

    function position() {
        const { right, bottom, width } = node.getBoundingClientRect();

        tooltip.style.top = `${bottom + tooltip.offsetHeight - 12}px`;
        tooltip.style.left = `${right - (width / 2) - (tooltip.offsetWidth / 2)}px`;
    }

    function append() {
        document.body.appendChild(tooltip);
        tooltip.style.opacity = 0;
        setTimeout(() => tooltip.style.opacity = 1);
        position();
    }

    function remove() {
        tooltip.remove();
    }

    node.addEventListener('mouseenter', append);
    node.addEventListener('mouseleave', remove);

    return {
        update(text) {
            tooltip.textContent = text;
            position();
        },

        destroy() {
            tooltip.remove();
            node.removeEventListener('mouseenter', append);
            node.removeEventListener('mouseleave', remove);
        }
    };
};
