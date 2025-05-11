import { useEffect, useState, useRef } from 'react';
import './style.css';
import api from '../../services/api';

function Home() {
  const [users, setUsers] = useState([]); // Estado para armazenar os usuários

  const inputName = useRef(); // Referências para os inputs
  const inputAge = useRef();
  const inputEmail = useRef();

  // Função para buscar usuários
  async function getUsers() {
    const usersFromApi = await api.get('/usuarios');
    setUsers(usersFromApi.data);
  }

  // Função para cadastrar usuários
  async function creatUsers() {
    try {
      const user = {
        name: inputName.current.value,
        age: inputAge.current.value,
        email: inputEmail.current.value,
      };

      // Verifica se todos os campos estão preenchidos
      if (!user.name || !user.age || !user.email) {
        alert('Por favor, preencha todos os campos!');
        return;
      }

      // Faz a requisição para cadastrar o usuário
      await api.post('/usuarios', user);

      // Limpa os campos após o cadastro
      inputName.current.value = '';
      inputAge.current.value = '';
      inputEmail.current.value = '';

      // Atualiza a lista de usuários
      getUsers();
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      alert('Erro ao cadastrar usuário. Tente novamente.');
    }
  }

  // Função para deletar usuários
  async function deleteUsers(id_user) {
    try {
      await api.delete(`/usuarios/${id_user}`); // Faz a requisição para excluir o usuário
      getUsers(); // Atualiza a lista de usuários após a exclusão
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      alert('Erro ao excluir usuário. Tente novamente.');
    }
  }

  // Executa ao carregar o componente
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <form>
        <h1>Cadastro de Usuários</h1>
        <input type="text" name="nome" placeholder="nome" ref={inputName} />
        <input type="number" name="idade" placeholder="idade" ref={inputAge} />
        <input type="email" name="email" placeholder="email" ref={inputEmail} />
        <button type="button" className="btn-cadastrar" onClick={creatUsers}>
          Cadastrar
        </button>
      </form>

      {users.map((user) => (
        <div key={user.id_user} className="card">
          <p>
            Nome: <span>{user.name}</span>
          </p>
          <p>
            Idade: <span>{user.age}</span>
          </p>
          <p>
            Email: <span>{user.email}</span>
          </p>
          <button
            className="btn-excluir"
            onClick={() => deleteUsers(user.id_user)}
          >
            Excluir
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
