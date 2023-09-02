import { Between } from "typeorm";
import { Tarefa } from "../models/Tarefa";
import promptSync from 'prompt-sync';
import { Usuario } from "../models/Usuario";
import { Categoria } from "../models/Categoria";
const prompt = promptSync();

export class TarefaController{

  public usuarioLogin: Usuario;

  async usuarioLogado(user: Usuario){
    this.usuarioLogin = user;
  }

  async create(descricao: string, prazo: string, categoriasIdcategoria: number, usuariosIdexecutor: number): Promise<Tarefa>{
    console.log(this.usuarioLogin);
    let usuarioExecutor: Usuario | null = await Usuario.findOneBy({ id: usuariosIdexecutor });

    if (! usuarioExecutor) {
      throw new Error('ID do usuário executor não encontrado!');
    }

    let categoria: Categoria | null = await Categoria.findOneBy({id: categoriasIdcategoria})

    if(!categoria){
      throw new Error('ID da categoria não encontrado')
    }
     return await Tarefa.create({
      descricao: descricao,
      prazo: prazo,
      categorias_idcategoria: categoriasIdcategoria,
      // usuarios_idcriador: this.usuarioLogin.id,
      usuarios_idexecutor: usuariosIdexecutor,
      situacao: 'A'
    }).save();

  }

  async list (){
    let tarefas = await Tarefa.find();
    console.table(tarefas);
    return;
  }

  async edit(){
    let id = Number(prompt('Qual o ID?'));
    let tarefa: Tarefa | null = await Tarefa.findOneBy({id: id});

    if(tarefa){
      tarefa.descricao = prompt(`Descricao (${tarefa.descricao}):`);
      tarefa.categorias_idcategoria = Number(prompt(`ID da categoria (${tarefa.categoria})`));
      tarefa.prazo = prompt(`Prazo (${tarefa.prazo}):`);
      tarefa.situacao = prompt(`Situação: (${tarefa.situacao}) A (à fazer), F (fazendo), C (concluída) ou I (inativa')`).toUpperCase();
      await tarefa.save();
      console.log('Tarefa atualizado com sucesso!')
    } else {
      console.log('Tarefa não encontrado!');

    }
  };

  async delete(){
    let id = Number(prompt('Qual o ID?'));
    let result = await Tarefa.delete({id: id})
    if (result.affected && result.affected > 0){
      console.log('Tarefa deletada com sucesso!')
    } else (
      console.log('ID da tarefa não encontrado!')
    )
    };

    async listCategoria(){
      let categoria: number = Number(prompt('Digite o número da categoria 1 - Trabalho, 2 - Estudo, 3 - Moradia, 4 - Startup: '));
      let tarefasCategoria = await Tarefa.find({
        where: {
          categorias_idcategoria: categoria,
        }
    })
    if(tarefasCategoria.length >= 1){
      console.log(tarefasCategoria);
    } else {
      console.log('Nenhuma tarefa com o id foi encontrada');
    }
  }

  async listTarefaSituacao(){
    let situacao: string = prompt('Digite a situação da tarefa: A à fazer, F fazendo, C concluída ou I inativa: ').toUpperCase();
    let tarefasCategoria = await Tarefa.find({
      where: {
          situacao: situacao,
      }
  })
  if(tarefasCategoria.length >= 1){
    console.log(tarefasCategoria);
  } else {
    console.log('Nenhuma tarefa com a situação informada foi encontrada');
  }
}

async listTarefaPeriodo(){
  let primeiraData: string = prompt('Informe a primeira data: aaaa-mm-dd: ')
  let ultimaData: string = prompt('Informe a última data: aaaa-mm-dd: ')
  let tarefasCategoria = await Tarefa.find({
    where: {
      prazo: Between(
        primeiraData,
        ultimaData
      )
    }
})
if(tarefasCategoria.length >= 1){
  console.log(tarefasCategoria);
} else {
  console.log('Nenhuma tarefa com o prazo informado foi encontrado');
}
}
}
