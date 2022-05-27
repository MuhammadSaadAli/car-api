import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    email : string;

    @Column()
    password: string;

    // All of these are TypeOrm hook
    @AfterInsert()
    afterInsert(){
        console.log(`After Insert id : ${this.id}`)
    }

    @AfterUpdate()
    afterUpdate(){
        console.log(`After Update id : ${this.id}`)
    }

    @AfterRemove()
    afterRemove(){
        console.log(`After Remove id : ${this.id}`)
    }
}