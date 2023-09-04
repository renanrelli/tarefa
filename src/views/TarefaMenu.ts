import promptSync from "prompt-sync";
const prompt = promptSync();
import { Tarefa } from "../models/Tarefa";
import { TarefaController } from "../controllers/TarefaController";
import { Categoria } from "../models/Categoria";

export class TarefaMenu {
  private usuarioLogin: number;

  async idUsuarioLogado(id: number) {
    this.usuarioLogin = id;
  }

  public controller: TarefaController;

  constructor() {
    this.controller = new TarefaController();
  }

  public async show() {
    console.log("9 - Criar tarefa");
    console.log("10 - Listar todas tarefas");
    console.log("11 - Editar tarefa");
    console.log("12 - Inativar tarefa");
    console.log("13 - Listar tarefas por categoria");
    console.log("14 - Listar tarefas por situação");
    console.log("15 - Listar tarefas por período");
    console.log("16 - Listar tarefas criadas por você");
    console.log("17 - Listar tarefas para serem feitas por você");
  }

  public async execute(input: string) {
    switch (input) {
      case "9":
        await this.create();
        break;
      case "10":
        await this.list();
        break;
      case "11":
        await this.edit();
        break;
      case "12":
        await this.delete();
        break;
      case "13":
        await this.listCategoria();
        break;
      case "14":
        await this.listSituacao();
        break;
      case "15":
        await this.listPeriodo();
        break;
      case "16":
        await this.listCriadas();
        break;
      case "17":
        await this.listExecutar();
        break;
    }
  }

  private async showCategorias(){
    let categorias = Categoria.find()
    console.log(categorias);
  }
  private async create() {
    console.log(this.usuarioLogin);

    let descricao = prompt("Digite a descrição da tarefa: ");
    let prazo = prompt("Informe o prazo da tarefa (aaaa-mm-dd): ");
    let situacao = prompt(
      "Informe a situação (A (à fazer), F (fazendo), C (concluída)): ");
    console.log(`Categorias disponíveis: `);
    this.listCategoria()
    let idCategoria = Number(prompt("Digite o ID da categoria: "));
    let idExecutor = Number(
      prompt("Digite o ID do usuário para executar a tarefa: ")
    );

    let tarefa: Tarefa | null = await this.controller.create(
      descricao,
      prazo,
      idCategoria,
      this.usuarioLogin,
      idExecutor,
      situacao
    );
  }

  private async list(): Promise<void> {
    let tarefas: Tarefa[] = await this.controller.list();
    console.log(tarefas);
  }

  private async edit(): Promise<void> {
    let id: number = Number(prompt("Qual é o ID?"));
    let tarefa = await this.controller.find(id);

    if (tarefa) {
      let descricao = prompt(`Descrição (${tarefa.descricao}): `);
      let prazo = prompt(`Prazo (${tarefa.prazo}) aaaa-mm-dd: `);
      let situacao = prompt(
        `Situação (${tarefa.situacao}) A ((à fazer), F (fazendo), C (concluída) ou I (inativa)) :`
      );
      let idCategoria = Number(
        prompt(`ID da categoria (${tarefa.categorias_idcategoria}): `)
      );
      let idExecutor = Number(
        prompt(`ID do executor (${tarefa.usuarios_idexecutor}): `)
      );
      await this.controller.edit(
        tarefa,
        descricao,
        prazo,
        idCategoria,
        idExecutor,
        situacao
      );
    }
  }

  private async delete(): Promise<void> {
    let id: number = Number(prompt("Qual é o ID?"));
    let tarefa = await this.controller.find(id);

    if (tarefa) {
      await this.controller.delete(tarefa);
      console.log(`Tarefa ID ${tarefa.id} inativada com sucesso!`);
    } else {
      console.log(`Nenhuma tarefa com o ID ${id} foi encontrada!`);
    }
  }

  private async listCategoria(): Promise<void> {
    let categoria: number = Number(prompt("Qual é o ID da categoria?"));
    let tarefas: Tarefa[] = await this.controller.listCategoria(categoria);
    if (tarefas.length >= 1) {
      console.log(tarefas);
    } else {
      console.log("Nenhuma tarefa com o id foi encontrada");
    }
  }

  private async listSituacao(): Promise<void> {
    let situacao: string = prompt(
      "Digite a situação da tarefa: A à fazer, F fazendo, C concluída ou I inativa: "
    ).toUpperCase();

    let tarefasSituacao: Tarefa[] = await this.controller.listTarefaSituacao(
      situacao
    );

    if (tarefasSituacao.length >= 1) {
      console.log(tarefasSituacao);
    } else {
      console.log("Nenhuma tarefa com a situação informada foi encontrada");
    }
  }

  private async listPeriodo() {
    let primeiraData: string = prompt("Informe a primeira data: aaaa-mm-dd: ");
    let ultimaData: string = prompt("Informe a última data: aaaa-mm-dd: ");

    let tarefasPrazo: Tarefa[] = await this.controller.listTarefaPeriodo(
      primeiraData,
      ultimaData
    );

    if (tarefasPrazo.length >= 1) {
      console.log(tarefasPrazo);
    } else {
      console.log("Nenhuma tarefa com o prazo informado foi encontrado");
    }
  }

  private async listExecutar() {
    let tarefasExecutar = await this.controller.listExecutar(this.usuarioLogin)

    if (tarefasExecutar.length >= 1) {
      console.log(tarefasExecutar);
    } else {
      console.log("Nenhuma tarefa para você executar");
    }
  }

  private async listCriadas() {
    let tarefasCriadas = await this.controller.listCriadas(this.usuarioLogin)

    if (tarefasCriadas.length >= 1) {
      console.log(tarefasCriadas);
    } else {
      console.log("Nenhuma tarefa criada por você");
    }
  }
}
