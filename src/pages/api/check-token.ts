export function check_edit_token(token: any){
    return token === process.env.EDIT_TOKEN;
}