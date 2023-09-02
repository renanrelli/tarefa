import { hash } from "bcrypt";
import bcrypt from 'bcrypt';
import { Usuario } from "../models/Usuario";

import promptSync from 'prompt-sync';
const prompt = promptSync();


export class UsuarioController{

  public usuarioLogin: Usuario | null;

  async login(): Promise<Usuario|null>{
    const emailUsuario = prompt('Digite seu email:');
    const senhaUsuario = prompt('Digite sua senha:');

    let loginOk = await Usuario.findOne({
      where: {
          email: emailUsuario,
          situacao: 'A'
      },
    })

    if(loginOk){
      const match = await bcrypt.compare(senhaUsuario, loginOk.senha);
      if(match){
        this.usuarioLogin = loginOk
        return loginOk
      }else {
        return null
      }
    } else{
      return null
    }
  }

  async create(nome: string, senha: string, email: string, situacao: string){
    const passwordHash = await hash(senha, 8);

    return await Usuario.create({
      nome,
      senha: passwordHash,
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
    usuario.senha = await hash(senha, 8),
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
