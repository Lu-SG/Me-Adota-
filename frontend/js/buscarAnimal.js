
async function buscarDados()
{
    
    const id_usuario_txt = document.getElementById('id_usuario'); 
    const id_usuario = Number(id_usuario_txt.value); 
    try { 
        const response = await fetch(`http://localhost:3001/api/usuarios/${id_usuario}`, { 
            method: 'GET', // Ajustado para GET 
            headers: { 'Content-Type': 'application/json' } 
        }); 
        if (response.ok) 
            { 
                const compatibilidade = await response.json(); 
                const resultadoDiv = document.getElementById('resultado'); 
                resultadoDiv.innerHTML = '';
                compatibilidade.forEach(animal => { 
                    const animalDiv = document.createElement('div'); 
                    animalDiv.classList.add('animal'); // Adiciona a classe CSS
                    animalDiv.innerHTML = ` 
                    <h2>${animal.nome}</h2> 
                    <p>Idade: ${animal.idade}</p> 
                    <p>Espécie: ${animal.especie}</p> 
                    <p>Raça: ${animal.raca}</p>
                    <p>Sexo: ${animal.sexo}</p> 
                    <p>Porte: ${animal.porte}</p> 
                    <p>Localização: ${animal.rua}, ${animal.numero}, ${animal.complemento}, ${animal.cidade} - ${animal.estado}</p> 
                    <p>Data do Resgate: ${animal.data_resgate}</p>
                    <p>Convive bem com outro animais: ${animal.convivencia}</p>
                    <p>Possui Doença Crônica: ${animal.doenca_cronica}</p>
                    <p>Possui necessidade Especial: ${animal.necessidade_especial}</p>
                    <p>Necessita muita atenção: ${animal.necessidade_atencao}</p>
                    <p>Compatibilidade: ${animal.compatibilidade}</p> `;
                    resultadoDiv.appendChild(animalDiv);
                }); 
                } 
                else 
                { 
                    alert("Erro ao buscar compatibilidade."); 
                } 
            } catch (err) { 
                console.error("Erro ao buscar compatibilidade:", err); 
            }





}






document.getElementById("buscarAnimal").addEventListener("click", buscarDados);