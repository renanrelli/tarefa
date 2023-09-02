import promptSync from "prompt-sync";
import { Categoria } from "../models/Categoria";
import { CategoriaController } from "../controllers/CategoriaController";
const prompt = promptSync();

export class CategoriaMenu {
public controller: CategoriaController;

constructor(){
  this.controller = new CategoriaController();
}

public async show(){
  console.log('5 - Criar categoria');
  console.log('6 - Listar categorias');
  console.log('7 - Editar categorias');
  console.log('8 - Inativar categoria');
}

public async execute (input: string) {
  switch (input) {
    case '5':
      await this.create();
      break;
    case '6':
      await this.list();
      break;
    case '7':
      await this.edit();
      break;
    case '8':
      await this.delete();
      break;
  }
}

private async list(): Promise<void>{
  let categorias: Categoria[] = await this.controller.list();
  console.log(categorias);
}

private async create(): Promise<void>{
  let descricao: string = prompt('Categoria: ')
  let situacao: string = "A";

  let categoria: Categoria = await this.controller.create(descricao, situacao);

  console.log(`Categoria ID #${categoria.id} criado com sucesso!`);

}

private async edit(): Promise<void>{
  let id: number = Number(prompt('Qual é o ID?'))
  let categoria = await this.controller.find(id)

  if(categoria){
    let descricao = prompt(`Descrição (${categoria.descricao}):`);
    categoria = await this.controller.edit(categoria, descricao)
    console.log(`Usuário ID #${categoria.id} atualizado com sucesso`);

  }
  else{
    console.log('ID não encontrado');

  }

}
private async delete(): Promise<void>{
  let id: number = Number(prompt('Qual é o ID que você deseja inativar?'))
  let categoria = await this.controller.find(id)

  if(categoria){
    let situacao = 'I'
    categoria = await this.controller.delete(categoria, situacao)
    console.log(`Categoria ID #${categoria.id} inativado com sucesso!`);
  }
  else{
    console.log('ID não encontrado');

  }
}
}
