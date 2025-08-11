import * as z from "zod"

export const SignupValidation = z.object({
    name: z.string().min(2, {message: 'Too short'}),
    username: z.string().min(2, {message: 'Too short'}).max(50),
    email: z.string().email(),
    password: z.string().min(8, {message: 'Too short'}),
})

export const SigninValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8, {message: 'Too short'}),
})

export const PostValidation = z.object({
    caption: z.string().min(5).max(2200),
    location: z.string().min(2).max(100),
    tags: z.string(),
})