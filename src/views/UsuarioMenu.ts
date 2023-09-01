import promptSync from "prompt-sync";
import { Usuario } from "../models/Usuario";
import { UsuarioController } from "../controllers/UsuarioController";
const prompt = promptSync();

export class UsuarioMenu {
public controller: UsuarioController;

constructor(){
  this.controller = new UsuarioController();
}

public async show(){
  console.log('1 - Criar usuário');
  console.log('2 - Listar usuários');
  console.log('3 - Editar usuário');
  console.log('4 - Inativar usuário');
}

public async execute (input: string) {
  switch (input) {
    case '1':
      await this.create();
      break;
    case '2':
      await this.list();
      break;
    case '3':
      await this.edit();
      break;
    case '4':
      await this.delete();
      break;
  }
}

private async list(): Promise<void>{
  let usuarios: Usuario[] = await this.controller.list();
  console.log(usuarios);
}

private async create(): Promise<void>{
  let nome: string = prompt('Nome:')
  let senha: string = prompt('Senha:')
  let email: string = prompt('Email:')
  let situacao: string = "A";

  let usuario: Usuario = await this.controller.create(nome,senha,email,situacao);

  console.log(`Usuário ID #${usuario.id} criado com sucesso!`);

}

private async edit(): Promise<void>{
  let id: number = Number(prompt('Qual é o ID?'))
  let usuario = await this.controller.find(id)

  if(usuario){
    let nome = prompt(`Nome (${usuario.nome}):`);
    let senha = prompt(`Senha (${usuario.senha}):`);
    let email = prompt(`Email (${usuario.email}):`);

    usuario = await this.controller.edit(usuario,nome,senha,email)
    console.log(`Usuário ID #${usuario.id} atualizado com sucesso`);

  }
  else{
    console.log('ID não encontrado');

  }

}
private async delete(): Promise<void>{
  let id: number = Number(prompt('Qual é o ID que você deseja inativar?'))
  let usuario = await this.controller.find(id)

  if(usuario){
    let situacao = 'I'
    usuario = await this.controller.delete(usuario, situacao)
    console.log(`Usuário ID #${usuario.id} inativado com sucesso!`);
  }
  else{
    console.log('ID não encontrado');

  }
}
}
