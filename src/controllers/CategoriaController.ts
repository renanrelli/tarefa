import { Categoria } from "../models/Categoria";
import promptSync from 'prompt-sync';
const prompt = promptSync();

export class CategoriaController {

  async list ():Promise<Categoria[]>{
    return await Categoria.find();
  };

  async create(descricao: string, situacao: string): Promise<Categoria>{
    return await Categoria.create({
      descricao,
      situacao
    }).save();
  };

  async find(id: number): Promise<Categoria|null>{
    return await Categoria.findOneBy({id})
  };

  async edit(categoria: Categoria, descricao: string): Promise<Categoria>{
    categoria.descricao = descricao
    await categoria.save();
    return categoria;
  };

  async delete(categoria : Categoria, situacao: string): Promise<Categoria>{
    categoria.situacao = situacao
    await categoria.save();
    return categoria;
  };

}
