import { Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { JoinColumn, OneToOne } from "typeorm";

@Table({'tableName': "banned_users"})
export class BannedUser extends Model {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @OneToOne(() => User)
    @JoinColumn()
    @Column({type: DataType.STRING, unique: true})
    user_id: string;

    @Column({type: DataType.STRING})
    ban_reason: string;

}