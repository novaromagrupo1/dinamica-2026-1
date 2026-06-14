const gerarParcelas = require('../../app/repositories/Parcelas.js');

test('Teste de Parcelas valor: 100, parcelas: 4', function() {
    let parcelas = gerarParcelas(100, 4, '2024/09/16');

    expect(parcelas).toHaveLength(4);
    expect(parcelas[1].valor).toBe(25);
    expect(parcelas[1].data).toBe('2024-11-16');

    let soma = parcelas.reduce((acc, parcela) => acc + parcela.valor, 0);

    expect(soma).toBe(100);
});

test('Teste de Parcelas valor: 100, parcelas: 3', function() {
  let parcelas = gerarParcelas(100, 3, '2024/09/16');

  expect(parcelas).toHaveLength(3);
  
  let soma = parcelas.reduce((acc, parcela) => acc + parcela.valor, 0);
  expect(soma).toBeCloseTo(100, 1);
});