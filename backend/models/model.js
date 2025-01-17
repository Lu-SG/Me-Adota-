import { executeQuery } from './db.js';

// Função para buscar todos os animais
export async function getAnimals() {
    const query = `SELECT * FROM animais`;
    try {
        const result = await executeQuery(query);
        return result.rows; // Retorna todos os animais
    } catch (err) {
        console.error("Erro ao buscar animais:", err);
        throw err;
    }
}

// Função para adicionar um novo animal
export async function addAnimal(animal) {
    const foto = Buffer.from(animal.foto, 'base64');
    
    
    const query = `
        INSERT INTO animais (nome, idade, especie, raca, sexo, porte, numero, rua, cidade, estado, complemento, data_resgate, convivencia, doenca_cronica, necessidade_especial, necessidade_atencao, foto, mime_type, desc_necessidade, bairro)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)`;
    const params = [
        animal.nome,
        animal.idade,
        animal.especie,
        animal.raca,
        animal.sexo,
        animal.porte,
        animal.numero,
        animal.rua,
        animal.cidade,
        animal.estado,
        animal.complemento,
        animal.data_resgate,
        animal.convivencia,
        animal.doenca_cronica,
        animal.necessidade_especial,
        animal.necessidade_atencao,
        foto,
        animal.mime_type,
        animal.desc_necessidade,
        animal.bairro
    ];
    try {
        await executeQuery(query, params);
        console.log("Animal cadastrado com sucesso!");
    } catch (err) {
        console.error("Erro ao cadastrar animal:", err);
        throw err;
    }
}

export async function addUser(user) {
    const query = `
        INSERT INTO usuarios(nome, email, telefone, senha, estado, cidade, bairro, rua, numero, complemento, especie_desejada, porte_desejado, sexo_desejado, aceita_necessidade_especial, aceita_doenca_cronica, ja_tem_outros_animais, tem_tempo_pro_animal )
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)`;
    const params = [
        user.nome,
        user.email,
        user.telefone,
        user.senha,
        user.estado,
        user.cidade,
        user.bairro,
        user.rua,
        user.numero,
        user.complemento,
        user.especie_desejada,
        user.porte_desejado,
        user.sexo_desejado,
        user.aceita_necessidade_especial,
        user.aceita_doenca_cronica,
        user.ja_tem_outros_animais,
        user.tem_tempo_pro_animal,
    ];
    try {
        await executeQuery(query, params);
        console.log("Usuário cadastrado com sucesso!");
    } catch (err) {
        console.error("Erro ao cadastrar Usuário:", err);
        throw err;
    }
}


// Função para buscar um animal por ID
export async function findAnimalById(id_animal) {
    const query = `SELECT * FROM animais WHERE id_animal = $1`;
    const params = [id_animal];
    try {
        const result = await executeQuery(query, params);
        return result.rows[0]; // Retorna o primeiro animal encontrado
    } catch (err) {
        console.error("Erro ao buscar animal por ID:", err);
        throw err;
    }
}

export async function getUsers() {
    const query = `SELECT * FROM usuarios`;
    try {
        const result = await executeQuery(query);
        return result.rows; // Retorna todos os animais
    } catch (err) {
        console.error("Erro ao buscar usuarios:", err);
        throw err;
    }
}
export async function getUsuarioByEmail(email) { 
    const query = `SELECT * FROM usuarios WHERE email = $1`;
    const params = [email];
    try {
        const result = await executeQuery(query, params);
        
        return result.rows[0]; // Retorna o primeiro usuário encontrado
        
    
    } catch (err) {
        console.error("Erro ao buscar usuário por email:", err);
        throw err;
    }
}

export function calcularCompatibilidade(usuario, animal) { 
    let pontos = 0;

    if(animal.foto)
    {
        animal.foto = animal.foto.toString('base64');
    }



    if(usuario.tem_tempo_pro_animal === 'nao' && animal.necessidade_atencao === 'sim')
    {
        return -1000;
    }

    if(usuario.ja_tem_outros_animais === 'sim' && animal.convivencia === 'nao')
    {
        return -1000;
    }

    if (usuario.especie_desejada === animal.especie) 
    {
        pontos += 20; 
    }
    else
    {
        pontos -= 20;
    }


    if (usuario.porte_desejado === animal.porte)
    {
        pontos += 10; 
    }
    else
    {
        pontos -= 10;
    }

    if (usuario.sexo_desejado === animal.sexo)
    {
        pontos += 5; 
    }
    else
    {
        pontos -= 5;
    }


    if (usuario.aceita_necessidade_especial === animal.necessidade_especial)
    {
        pontos += 10; 
    }
    else
    {
        if(usuario.aceita_necessidade_especial === 'sim' && animal.necessidade_especial ==='nao')
        {
            pontos += 10;
        }
        
    }









    
    if (usuario.aceita_doenca_cronica === 'sim' && animal.doenca_cronica === 'sim')
    {
        pontos += 10; 
    }
    
    if(usuario.aceita_doenca_cronica === 'nao' && animal.doenca_cronica === 'nao')
    {
        pontos += 5;
    }
    
    if(usuario.aceita_doenca_cronica === 'sim' && animal.doenca_cronica === 'nao')
    {
        pontos += 5;
    }




    if(usuario.ja_tem_outros_animais === animal.convivencia)
    {
        pontos += 5;
    }

    if(usuario.ja_tem_outros_animais === 'nao' && animal.convivencia === 'sim')
    {
        pontos += 5;
    }



    if(usuario.tem_tempo_pro_animal === 'sim' && animal.necessidade_atencao === 'sim')
    {
        pontos += 5;
    }

    if(usuario.tem_tempo_pro_animal === 'sim' && animal.necessidade_atencao === 'nao')
    {
        pontos += 5;
    }
    return pontos;
}


// Função para encontrar um usuário pelo email
export async function findUserByEmail(email, senha) {
  try {
    const query = `SELECT * FROM usuarios WHERE email = $1 AND senha = $2`;
    const params = [email, senha];

    // Realiza uma consulta SQL na tabela 'usuarios'
    const result = await executeQuery(query, params);
    return result.rows[0];
  } catch (error) {
    console.error('Erro ao encontrar usuário por email e senha:', error);
    throw error;
  }
};

export async function getDadosByEmail(email){
    try{
        const query =`SELECT * FROM usuarios WHERE email = $1;`;
        const params = [email];

        const result = await executeQuery(query, params);
        return  result.rows[0];
    } catch (error) {
        console.error('Erro ao buscar dados do usuário por Email.', error);
        throw error;
    }
}

export async function updateUsuarioByEmail(user){
    try{
        const query = `UPDATE usuarios SET telefone = $1, estado = $2, cidade = $3, bairro = $4, rua = $5, numero = $6, complemento = $7, especie_desejada = $8, porte_desejado = $9, sexo_desejado = $10, aceita_necessidade_especial = $11, aceita_doenca_cronica = $12, ja_tem_outros_animais = $13, tem_tempo_pro_animal = $14 WHERE email = $15`;
        const params = [
            user.telefone, user.estado, user.cidade, user.bairro, user.rua, user.numero, user.complemento, user.especie_desejada, user.porte_desejado, user.sexo_desejado, user.aceita_necessidade_especial, user.aceita_doenca_cronica, user.ja_tem_outros_animais, user.tem_tempo_pro_animal, user.email];
    
            
        const result = await executeQuery(query, params);
        return result;

        }
        catch(error)
        {
            console.error('Erro ao Atualizar Dados.', error);
            throw error;
        }
}

export async function deleteUserByEmail(email){
    try{
        const query = `DELETE FROM usuarios WHERE email = $1`;
        const params = [ email ];

        const result = await executeQuery(query, params);
        return result;
    }catch(error){
        console.error('Erro ao excluir Conta.', error);
        throw error;
    }
}

export async function updateAnimalById(animal){
    try{
        const query = `UPDATE animais SET nome = $1, idade = $2, especie = $3, raca = $4, sexo = $5, porte = $6, numero = $7, rua = $8, cidade = $9, estado = $10, complemento = $11, data_resgate = $12, convivencia = $13, doenca_cronica = $14, necessidade_especial = $15, necessidade_atencao = $16, desc_necessidade = $17, bairro = $18 WHERE id_animal = $19`;
        const params = [animal.nome, animal.idade, animal.especie, animal.raca, animal.sexo, animal.porte,   
            animal.numero, animal.rua, animal.cidade,   animal.estado, animal.complemento, 
            animal.data_resgate, animal.convivencia, animal.doenca_cronica, animal.necessidade_especial, 
            animal.necessidade_atencao, animal.desc_necessidade, animal.bairro, animal.id_animal]
    
            
        const result = await executeQuery(query, params);
        return result;

        }
        catch(error)
        {
            console.error('Erro ao Atualizar Dados.', error);
            throw error;
        }
}

export async function deleteAnimalById(id_animal){
    try{
        const query = `DELETE FROM animais WHERE id_animal = $1`;
        const params = [ id_animal ];

        const result = await executeQuery(query, params);
        return result;
    }catch(error){
        console.error('Erro ao excluir Animal.', error);
        throw error;
    }
}

