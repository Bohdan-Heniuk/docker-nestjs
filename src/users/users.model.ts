import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({'tableName': 'users'})
export class User extends Model {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true})
    email: string;

    @Column({type: DataType.STRING, unique: true})
    username: string;

    @Column({type: DataType.STRING})
    password: string
}