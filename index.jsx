import { useEffect, useState, useRef} from 'react'//react hooks
import './style.css'
import api from '../../services/api'

function Home() { //função sempre começa com letra maiuscula

  const [users, setUsers] = useState([]) //useState é um hook do react que serve para criar variaveis de estado, o primeiro valor é o valor inicial e o segundo é a função que vai alterar esse valor

  const inputName = useRef() //useRef é um hook do react que serve para criar uma referencia a um elemento do DOM, nesse caso o input de nome
  const inputAge = useRef() //useRef é um hook do react que serve para criar uma referencia a um elemento do DOM, nesse caso o input de idade
  const inputEmail = useRef() //useRef é um hook do react que serve para criar uma referencia a um elemento do DOM, nesse caso o input de email

  async function getUsers() {
    const usersFromApi = await api.get('/usuarios')
    setUsers(usersFromApi.data)
  }

  async function creatUsers() {
    try {
      const user = {
        name: inputName.current.value, // Obtém o valor do input
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

  useEffect(() => { //tudo que estiver dentro do useEffect vai ser executado quando o site carregar
     getUsers()
  }, [])

  return (
    <div className="container">
      <form>
        <h1>Cadastro de Usuários</h1>
          <input type="text" name="nome" placeholder='nome' ref={inputName}/>
          <input type="number" name="idade" placeholder='idade' ref={inputAge}/>
          <input type="email" name="email" placeholder='email' ref={inputEmail}/>
        <button type="button" className="btn-cadastrar" onClick={creatUsers}>Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id_user} className="card">
          <p>Nome: <span>{user.name}</span></p>
          <p>Idade: <span>{user.age}</span></p>
          <p>Email: <span>{user.email}</span></p>
          <button className="btn-excluir">Excluir</button>
        </div>
      ))}
    </div>
  )
}

export default Home
