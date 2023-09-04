import { Between } from "typeorm";
import { Tarefa } from "../models/Tarefa";
import promptSync from "prompt-sync";
import { Usuario } from "../models/Usuario";
import { Categoria } from "../models/Categoria";
const prompt = promptSync();

export class TarefaController {

  async create(
    descricao: string,
    prazo: string,
    categoriasIdcategoria: number,
    usuariosIdCriador: number,
    usuariosIdexecutor: number,
    situacao: string
  ): Promise<Tarefa | null> {
    let usuarioExecutor: Usuario | null = await Usuario.findOneBy({
      id: usuariosIdexecutor,
    });
    let categoria: Categoria | null = await Categoria.findOneBy({
      id: categoriasIdcategoria,
    });

    if (!usuarioExecutor) {
      console.log("ID do usuário executor não encontrado!");
    } else if (!categoria) {
      console.log("ID da categoria não encontrado");
    } else {
      return await Tarefa.create({
        descricao: descricao,
        prazo: prazo,
        categorias_idcategoria: categoriasIdcategoria,
        usuarios_idcriador: usuariosIdCriador,
        usuarios_idexecutor: usuariosIdexecutor,
        situacao: situacao,
      }).save();
    }
    return null;
  }

  async list(): Promise<Tarefa[]> {
    return await Tarefa.find();
  }

  async find(id: number): Promise<Tarefa | null> {
    return await Tarefa.findOneBy({ id });
  }

  async edit(
    tarefa: Tarefa,
    descricao: string,
    prazo: string,
    idCategoria: number,
    idExecutor: number,
    situacao: string
  ): Promise<Tarefa | null> {
    let categoria: Categoria | null = await Categoria.findOneBy({
      id: idCategoria,
    });
    let executor: Usuario | null = await Usuario.findOneBy({ id: idExecutor });

    if (!categoria) {
      console.log("Categoria não encontrada!");
    } else if (!executor) {
      console.log("Executor não encontrado");
    } else {
      tarefa.descricao = descricao;
      tarefa.prazo = prazo;
      tarefa.categorias_idcategoria = idCategoria;
      tarefa.usuarios_idexecutor = idExecutor;
      tarefa.situacao = situacao;
      tarefa.save();
      return tarefa;
    }
    return null;
  }

  async delete(tarefa: Tarefa): Promise<Tarefa> {
    tarefa.situacao = "I";
    await tarefa.save();
    return tarefa;
  }

  async listCategoria(idCategoria: number): Promise<Tarefa[]> {
    let tarefasCategoria = await Tarefa.find({
      where: {
        categorias_idcategoria: idCategoria,
      },
    });
    return tarefasCategoria;
  }

  async listTarefaSituacao(situacao: string): Promise<Tarefa[]> {
    let tarefasSituacao = await Tarefa.find({
      where: {
        situacao: situacao,
      },
    });
    return tarefasSituacao;
  }

  async listTarefaPeriodo(dataInicio: string, dataFim: string) {
    let tarefasPeriodo = await Tarefa.find({
      where: {
        prazo: Between(dataInicio, dataFim),
        situacao: "A" || "C" || "F",
      },
    });
    return tarefasPeriodo;
  }

  async listCriadas(idCriador: number): Promise<Tarefa[]> {
    let tarefasCriadas = await Tarefa.find({
      where: {
        usuarios_idcriador: idCriador,
      },
    });
    return tarefasCriadas;
  }

  async listExecutar(idExecutor: number): Promise<Tarefa[]> {
    let tarefasExecutar = await Tarefa.find({
      where: {
        usuarios_idexecutor: idExecutor,
      },
    });
    return tarefasExecutar;
  }
}
