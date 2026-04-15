const { processText } = require('./process');

test('format number', () => {
    const result = processText("+79000000000");
    expect(result).toContain("+1");
});