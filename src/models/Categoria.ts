import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tarefa } from "./Tarefa";



@Entity('categorias')
export class Categoria extends BaseEntity{
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public descricao: string;

  @Column({
    type: 'char'
  })
  public situacao: string;

  @OneToMany(() => Tarefa, (tarefa) => tarefa.categoria)
  public tarefa: Promise<Tarefa[]>;

}
