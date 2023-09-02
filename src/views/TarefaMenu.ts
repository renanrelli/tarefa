import promptSync from "prompt-sync";
const prompt = promptSync();
import { Tarefa } from "../models/Tarefa";
import { TarefaController } from "../controllers/TarefaController";

export class TarefaMenu{

  private usuarioLogin: number;

  async idUsuarioLogado(id: number){
    this.usuarioLogin = id;
  }

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
        await this.list();
        break;
      case '11':
        await this.edit();
        break;
      case '12':


    }
  }

  private async create(){
    console.log(this.usuarioLogin);

    let descricao = prompt('Digite a descrição da tarefa: ')
    let prazo = prompt('Informe o prazo da tarefa (aaaa-mm-dd): ')
    let idCategoria = Number(prompt('Digite o ID da categoria: '))
    let idExecutor = Number(prompt('Digite o ID do usuário para executar a tarefa: '))

    let tarefa: Tarefa = await this.controller.create(descricao, prazo, idCategoria, this.usuarioLogin, idExecutor);
  }

  private async list(): Promise<void>{
    let tarefas: Tarefa[] = await this.controller.list();
    console.log(tarefas);
  }

  private async edit(){
    let id: number = Number(prompt('Qual é o ID?'))
    let tarefa = await this.controller.find(id)

    if(tarefa){
    let descricao = prompt(`Descrição (${tarefa.descricao}): `);
    let prazo = prompt(`Prazo (${tarefa.prazo}) aaaa-mm-dd: `)
    let idCategoria = Number(prompt(`ID da categoria (${tarefa.categorias_idcategoria}): `))
    let idExecutor = Number(prompt(`ID do executor (${tarefa.usuarios_idexecutor}): `))
    await this.controller.edit(tarefa, descricao, prazo, idCategoria, idExecutor)

    }
  }

}
