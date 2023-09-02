import { Between } from "typeorm";
import { Tarefa } from "../models/Tarefa";
import promptSync from 'prompt-sync';
import { Usuario } from "../models/Usuario";
import { Categoria } from "../models/Categoria";
const prompt = promptSync();

export class TarefaController{

  async create(descricao: string, prazo: string, categoriasIdcategoria: number,usuariosIdCriador: number, usuariosIdexecutor: number): Promise<Tarefa>{

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
      usuarios_idcriador: usuariosIdCriador,
      usuarios_idexecutor: usuariosIdexecutor,
      situacao: 'A'
    }).save();

  }

  async list (): Promise<Tarefa[]>{
    return await Tarefa.find();
  }

  async find(id: number): Promise<Tarefa|null>{
    return await Tarefa.findOneBy({id})
  }

  async edit(tarefa: Tarefa, descricao: string, prazo: string, idCategoria: number, idExecutor: number): Promise<Tarefa>{
    let categoria: Categoria | null = await Categoria.findOneBy({ id: idCategoria });
    let executor: Usuario | null = await Usuario.findOneBy({ id: idExecutor });

    if (! categoria) {
      throw new Error('Categoria não encontrada!');
    }
    if(! executor){
      throw new Error('Executor não encontrado')
    }

    tarefa.descricao = descricao;
    tarefa.prazo = prazo;
    tarefa.categorias_idcategoria = idCategoria;
    tarefa.usuarios_idexecutor = idExecutor;
    tarefa.save()
    return tarefa;

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
