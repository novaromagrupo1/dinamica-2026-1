const userController = require('../../app/controllers/UsersController');
const User = require('../../app/models/User');
const bcrypt = require('bcrypt');

jest.mock('../../app/models/User');
jest.mock('bcrypt');

test('Teste de Cadastro: Deve falhar quando as senhas forem diferentes', async function() {
    let req = {
        body: {
            name: 'Paulo',
            email: 'paulo@email.com',
            password: 'senha_comum',
            confirm_password: 'outra_senha'
        }
    };
    
    let dadosRenderizados = null;
    let res = {
        render: function(view, dados) {
            dadosRenderizados = dados;
        }
    };

    bcrypt.hash.mockResolvedValue('hash_qualquer');
    User.create.mockResolvedValue({});

    await userController.save(req, res);

    expect(dadosRenderizados).toHaveProperty('error');
    expect(dadosRenderizados.error.message).toBe('Os campos senha e confirmar senha são diferentes.');
    
});

test('Teste de Cadastro: Deve salvar o usuário com sucesso e a senha criptografada', async function() {

    let req = {
        body: {
            name: 'Luan',
            email: 'luan@email.com',
            password: '123',
            confirm_password: '123'
        }
    };

    bcrypt.hash.mockResolvedValue('senha_hasheada_123');
    
    let rotaRedirecionada = '';
    let res = {
        redirect: function(url) {
            rotaRedirecionada = url;
        }
    };

    await userController.save(req, res);

    expect(User.create).toHaveBeenCalledWith({
        name: 'Luan',
        email: 'luan@email.com',
        password: 'senha_hasheada_123'
    });

    expect(rotaRedirecionada).toBe('/users');
});