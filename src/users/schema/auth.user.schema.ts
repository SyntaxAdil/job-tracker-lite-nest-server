import { Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    collection:"user",
    strict:false
})
export class AuthUser{}
export const AuthUserSchema= SchemaFactory.createForClass(AuthUser)

