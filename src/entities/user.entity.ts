import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";

@Entity({ name: "users" })
// @Index("idx_firstname", ["firstname"])
@Index("idx_lastname_firstname", ["lastname", "firstname"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;
}
