import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { useToast } from "@/components/ui/use-toast"


import { Button } from "@/components/ui/button"
import {Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignupValidation } from "@/lib/validation"
import Loader from "@/components/shared/Loader"
import { Link, useNavigate } from "react-router-dom"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"

const SignupForm = () => {
  const { toast } = useToast();
  const {checkAuthUser}  = useUserContext(); 
  const navigate = useNavigate();

  const {mutateAsync : createUserAccount, isPending: isCreatingUser} = useCreateUserAccount();

  const { mutateAsync: signInAccount } = useSignInAccount();


  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    const newUser = await createUserAccount(values);

    if(!newUser) {
      return toast({title: 'Sign up failed. Please try again.'})
    }


    const session = await signInAccount({
      email: values.email,
      password: values.password,
    })

    if(!session) {
      return toast({title: 'Sign up failed. Please try again.'})
    }

    const isLoggedIn = await checkAuthUser();

    if(isLoggedIn){
      form.reset();

      navigate('/');
    } else{
      return toast({title: 'Sign up failed. Please try again.'})
    
    }
  }
  return (
    <Form {...form}>
      <div className="w-full flex-center flex-col">
        <img src="/assets/images/logo t5.png" alt="Logo" className="w-16 h-16 md:w-24 md:h-24 mb-4" />

        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Create a new account</h2>
        <p className="text-light-3 text-sm md:text-base text-center mb-8">To use VibeHub, please enter your details</p>
      




        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full">
        <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormDescription className="text-light-3 text-sm">
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" placeholder="Choose a username" {...field} />
                </FormControl>
                <FormDescription className="text-light-3 text-sm">
                  This is your unique username.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" placeholder="Enter your email" {...field} />
                </FormControl>
                <FormDescription className="text-light-3 text-sm">
                  Please Enter a Valid Email Address
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" placeholder="Create a password" {...field} />
                </FormControl>
                <FormDescription className="text-light-3 text-sm">
                  Password must be at least 8 characters
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary w-full mt-4">
            {isCreatingUser ? (
              <div className="flex-center gap-2">
                <Loader />
                Loading...
              </div>
            ): "Sign up"}
          </Button>

          <p className="text-sm text-light-2 text-center mt-4">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-primary-500 font-semibold hover:underline">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </Form>

  )
}

export default SignupForm
