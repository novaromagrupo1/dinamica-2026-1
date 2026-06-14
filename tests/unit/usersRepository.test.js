const usersRepository = require('../../app/repositories/UsersRepository'); 
const User = require('../../app/models/User');

jest.mock('../../app/models/User');

test('Teste de Repository: Deve salvar o usuário com sucesso enviando os dados corretos ao Sequelize', async function() {
    let dadosParaSalvar = {
        name: 'Luan',
        email: 'luan@email.com',
        password: 'senha_criptografada_vinda_do_bcrypt' 
    };

    User.create.mockResolvedValue({ id: 1, ...dadosParaSalvar });

    let resultado = await usersRepository.save(dadosParaSalvar);

    expect(User.create).toHaveBeenCalledWith({
        name: 'Luan',
        email: 'luan@email.com',
        password: 'senha_criptografada_vinda_do_bcrypt'
    });

    expect(resultado).toHaveProperty('id');
    expect(resultado.name).toBe('Luan');
});

test('Teste de Repository: Deve listar todos os usuários cadastrados', async function() {

    let listaMock = [
        { id: 1, name: 'Paulo', email: 'paulo@email.com' },
        { id: 2, name: 'Luan', email: 'luan@email.com' }
    ];
    
    User.findAll.mockResolvedValue(listaMock);


    let usuarios = await usersRepository.list();

    expect(User.findAll).toHaveBeenCalledWith({ raw: true });
    expect(usuarios).toHaveLength(2);
    expect(usuarios[0].name).toBe('Paulo');
});