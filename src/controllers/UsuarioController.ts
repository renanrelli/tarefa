import { Usuario } from "../models/Usuario";

import promptSync from 'prompt-sync';
const prompt = promptSync();

export class UsuarioController{

  async login(): Promise<boolean>{
    const emailUsuario = prompt('Digite seu email:');
    const senhaUsuario = prompt('Digite sua senha:');

    let loginOk = await Usuario.find({
      where: {
          email: emailUsuario,
          senha: senhaUsuario,
          situacao: 'A'
      },
  })

  if(loginOk.length >= 1){
    return true
  } else{
    return false
  }

  }

  async create(nome: string, senha: string, email: string, situacao: string){
    return await Usuario.create({
      nome,
      senha,
      email,
      situacao
    }).save();
  }

  async list (): Promise<Usuario[]>{
    return await Usuario.find();

  }

  async find(id: number): Promise<Usuario|null>{
    return await Usuario.findOneBy({id})
  }

  async edit(usuario: Usuario, nome: string, senha: string, email: string): Promise<Usuario>{
    usuario.nome = nome,
    usuario.senha = senha,
    usuario.email = email,
    await usuario.save()
    return usuario
  };

  async delete(usuario: Usuario, situacao: string): Promise<Usuario>{
    usuario.situacao = situacao
    await usuario.save()
    return usuario
}
}
