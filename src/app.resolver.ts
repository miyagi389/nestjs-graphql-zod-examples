import { Query, Resolver } from "@nestjs/graphql";
import { QueryWithZod } from "nestjs-graphql-zod";
import * as zod from "zod";

// OK
// const UserZod = zod.object({
//     name: zod.string().describe("The name of the user"),
//     age: zod.number().int().gt(10).describe("The age of the user."),
//     fields: zod.string().optional().array().optional().describe("The fields of the user"),
//     sortBy: zod.enum(["asc", "desc"]).describe("The sorting parameter of user.")
// }).describe("ExampleUser: Represents an example user instance.");

// NG: Error: Schema must contain uniquely named types but contains multiple types named "ExampleUser".
const UserZod = zod.object({
    name: zod.string().describe("The name of the user"),
    age: zod.number().int().gt(10).describe("The age of the user."),
    fields: zod.string().optional().array().optional().describe("The fields of the user"),
    sortBy: zod.enum(["asc", "desc"]).describe("The sorting parameter of user."),
    settings: zod.object({
        darkTheme: zod.boolean().optional().describe("The dark theme setting"),
        ratio: zod.number().describe("This will be float by default"),
        profile: zod.object({
            showImage: zod.boolean().describe("Indicates whether the user is showing images.")
        }).describe("UserProfileSetting: Represents user profile settings.")
    }).describe("ExampleUserSettings: The user settings.")
}).describe("ExampleUser: Represents an example user instance.");


@Resolver()
export class AppResolver {
    @QueryWithZod(UserZod)
    async getUser() {
        // You can simply return an object to be parsed and if the parsing is
        // successful, then the data will be returned, otherwise an error will
        // be thrown.

        // return {
        //     name: `User Name ${Date.now()}`,
        //     age: 15,
        //     fields: ["Field 1", "Field 2"],
        //     sortBy: "asc"
        // };
        return {
            name: `User Name ${Date.now()}`,
            age: 15,
            fields: ["Field 1", "Field 2"],
            sortBy: "asc",
            settings: {
                darkTheme: false,
                ratio: 2.5,
                profile: {
                    showImage: true
                }
            }
        };
    }
}
