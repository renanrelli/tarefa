import { Between } from "typeorm";
import { Tarefa } from "../models/Tarefa";
import promptSync from 'prompt-sync';
const prompt = promptSync();

export class TarefaController{

  async create(){
    let descricao: string = prompt('Descrição: ')
    let categorias_idcategoria: number = Number(prompt('Categoria: 1 - Trabalho, 2 - Estudo, 3 - Moradia, 4 - Startup: '))
    let prazo: string = prompt('Digite o prazo: aaaa-mm-dd: ')
    let situacao: string = prompt('Digite a situação: A (à fazer), F (fazendo), C (concluída) ou I (inativa): ');

    let tarefa = await Tarefa.create({
      descricao,
      categorias_idcategoria,
      prazo,
      situacao,
    }).save();

    console.log(`Tarefa ID #${tarefa.id} criado com sucesso!`)
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
