import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {BlogInterface} from "@/pages/api/blog-interface";
import {TextType} from "@/pages/api/blog-interface";

@Entity()
export class Blog extends BlogInterface{

    @PrimaryGeneratedColumn()
    page_id!: number;

    @Column("varchar", {length: 100})
    title!: string;

    @Column("varchar", {length: 40})
    author!: string;

    //@Column("date")
    //submission_date!: Date;
    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @Column("varchar", {length: 300})
    content!: string;


    @Column("simple-array")
    tags!: string[];

    @Column("mediumtext")
    text!: string;

    @Column({
        type: "int",
        unsigned: true
    })
    views!: number;

    @Column({
        type: "int",
        unsigned: true
    })
    likes!: number;

    @Column({
        type: "enum",
        enum: TextType,
        default: TextType.MARKDOWN
    })
    text_type!:TextType;

}