import { useEffect, useState } from "react"


function App() {

    const [usuarios, setUsuarios] = useState([])


    const[nome, setNome] = useState("")
    const [idade, setIdade] = useState("")

    const[estaEditando, setEstaEditando] = useState(-1)

    function salvar(){ // atende tanto o inserir quanto o alterar.

            const usuario = {
            id: 0, 
            nome: nome,
            idade: idade
        }
        
        setNome("")
        setNome("")

        if(estaEditando == -1){
            usuario.id = usuarios.length + 1
            inserir(usuario)
        }else{
            usuario.id = estaEditando
            alterar(usuario)
            setEstaEditando(-1)
        }
    }


    function inserir(usuario){
        setUsuarios( usuarios.concat(usuario))
    }

    function alterar(usuario){
          const nova_lista = structuredClone(usuarios)

        for(let i = 0; i < nova_lista.length; i++){
            if(nova_lista[i].id == usuario.id){
                nova_lista[i] = usuario
                break
            }
        }

        setUsuarios(nova_lista)
    }

    function buscarTodos(){
        setUsuarios([
    { id: 1, nome: "Rodolfo", idade: 99999 },
    { id: 2, nome: "Silva", idade: 2 },
    { id: 3, nome: "ze", idade: 100  }
    ])
    }



    function remover(id){
        
        const nova_lista = structuredClone(usuarios)

        for(let i = 0; i < nova_lista.length; i++){
            if(nova_lista[i].id == id){
                nova_lista.splice(i, 1)
                break
            }
        }

        setUsuarios(nova_lista)

    }


    function editar(id){

        const usuario = usuarios.filter( i => i.id == id)[0]
        setNome(usuario.nome)
        setIdade(usuario.idade)
        setEstaEditando(usuario.id)
    }

    useEffect( ()=> { 
        buscarTodos()
    }, [] )
     
    return (
        <div>

            <h1>CRUD</h1>
            <p>Aprendendo a fazer CRUD no react</p>

            <hr/>

            <input value={nome} onChange={ e => setNome(e.target.value)} placeholder="Digite o nome..." />
            <br/>
            <input value={idade} onChange={ e => setIdade(e.target.value)}  placeholder="Digite a idade..."/>
            <br/>
            <button onClick={salvar}>Salvar</button>

            <hr/>

            <table border="">
            
                <tr>
                    <td>ID</td>
                    <td>nome</td>
                    <td>Idade</td>   
                    <td>Ações</td>                           
                </tr> 
                 {
                    usuarios.map(
                        i =>
                            <tr>
                                <td>{i.id}</td>
                                <td>{i.nome}</td>
                                <td>{i.idade}</td>   
                                <td>
                                    <button onClick={()=>editar(i.id)}>✒️ alterar</button>
                                    <button onClick={()=>remover(i.id)}>🗑️ excluir</button>
                                </td>                           
                        </tr>  
                    )
                 }

                  
            </table>
        </div>
    )
}

export default App
