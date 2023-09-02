import promptSync from "prompt-sync";
const prompt = promptSync();
import { Tarefa } from "../models/Tarefa";
import { TarefaController } from "../controllers/TarefaController";

export class TarefaMenu{

  public controller: TarefaController;

  constructor(){
    this.controller = new TarefaController()
  }

  public async show(){
    console.log('9 - Criar tarefa');
    console.log('10 - Listar todas tarefas');
    console.log('11 - Editar tarefa');
    console.log('12 - Inativar tarefa');
    console.log('13 - Listar tarefas por categoria');
    console.log('14 - Listar tarefas por situação');
    console.log('15 - Listar tarefas por período');
    console.log('16 - Listar tarefas criadas por você');
    console.log('17 - Listar tarefas para serem feitas por você');
  }

  public async execute (input: string) {
    switch (input) {
      case '9':
        await this.create();
        break;
      case '10':
        // await this.list();
        break;
      case '11':

    }
  }

  private async create(){
    let descricao = prompt('Digite a descrição da tarefa: ')
    let prazo = prompt('Informe o prazo da tarefa (aaaa-mm-dd): ')
    let idCategoria = Number(prompt('Digite o ID da categoria: '))
    let idExecutor = Number(prompt('Digite o ID do usuário para executar a tarefa: '))

    let tarefa: Tarefa = await this.controller.create(descricao, prazo, idCategoria, idExecutor);

  }

}
