import {AppDataSource} from "./data-source";
import type {NextApiRequest, NextApiResponse} from 'next'
import { Blog } from "./blog"

export class BlogController {

    private blogRepository = AppDataSource.getRepository(Blog)

    // async all(request: Request, response: Response, next: NextFunction) {
    //     return this.blogRepository.find()
    // }

    async get_page_by_id(request: NextApiRequest, response: NextApiResponse) {
        // console.log("get_page_by_id", request.query)
        const page_id = parseInt(<string>request.query.id!)

        const user = await this.blogRepository.findOne({
            where: { page_id } as any
        })
        // console.log(`get_page_by_id res = ${JSON.stringify(user)}`)

        if (!user) {
            return `unknown page: id = ${page_id}`
        }
        return user
    }
    create_new(request: NextApiRequest, response: NextApiResponse){
        // console.log("create_new", request.body);
        const {page_info} = request.body;
        const insert_data = new Blog();
        insert_data.likes = 0;
        insert_data.tags = page_info.tags;
        insert_data.views = 0;
        insert_data.text = "";
        insert_data.title = page_info.title;
        insert_data.author = page_info.author;
        insert_data.content = page_info.content;
        insert_data.text_type = page_info.text_type;

        return this.blogRepository.insert(insert_data);
    }

    async updateText(request: NextApiRequest, response: NextApiResponse) {
        const { page_id, text } = request.body;

        return this.blogRepository
            .createQueryBuilder()
            .update(Blog)
            .set({text: text})
            .where("page_id = :page_id", {page_id: page_id})
            .execute();
    }
    //
    // async remove(request: Request, response: Response, next: NextFunction) {
    //     const id = parseInt(request.params.id)
    //
    //     let userToRemove = await this.blogRepository.findOneBy({ id })
    //
    //     if (!userToRemove) {
    //         return "this user not exist"
    //     }
    //
    //     await this.blogRepository.remove(userToRemove)
    //
    //     return "user has been removed"
    // }

}