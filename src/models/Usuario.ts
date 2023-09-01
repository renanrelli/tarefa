import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tarefa } from "./Tarefa";


@Entity('usuarios')
export class Usuario extends BaseEntity{
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public nome: string;

  @Column()
  public senha: string;

  @Column()
  public email: string;

  @Column({
    type: 'char'
  })
  public situacao: string;

  @OneToMany(() => Tarefa, (tarefa) => tarefa.usuario_criador )
  public tarefaCriador: Promise<Tarefa[]>;

  @OneToMany(() => Tarefa, (tarefa) => tarefa.usuario_executor)
  public tarefaExecutor: Promise<Tarefa[]>;

}
