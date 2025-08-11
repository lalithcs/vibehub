import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { useToast } from "@/components/ui/use-toast"


import { Button } from "@/components/ui/button"
import {Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SigninValidation, SignupValidation } from "@/lib/validation"
import Loader from "@/components/shared/Loader"
import { Link, useNavigate } from "react-router-dom"
import {  useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"

const SigninForm = () => {
  const { toast } = useToast();
  const {checkAuthUser, isPending: isUserLoading}  = useUserContext(); 
  const navigate = useNavigate();

  const { mutateAsync: signInAccount } = useSignInAccount();


  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    })

    if(!session) {
      return toast({title: 'Sign in failed. Please try again.'})
    }

    const isLoggedIn = await checkAuthUser();

    if(isLoggedIn){
      form.reset();
      console.log('NAVIGATING')
      navigate('/');
    } else{
      return toast({title: 'Sign up failed. Please try again.'})
    
    }
  }
  return (
    <Form {...form}>
      <div className="w-full flex-center flex-col">
        <img src="/assets/images/logo t5.png" alt="Logo" className="w-16 h-16 md:w-24 md:h-24 mb-4" />

        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Log in to your account</h2>
        <p className="text-light-3 text-sm md:text-base text-center mb-8">Welcome back, please enter your details</p>
      




        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full">
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
                  <Input type="password" className="shad-input" placeholder="Enter your password" {...field} />
                </FormControl>
                <FormDescription className="text-light-3 text-sm">
                  Enter your password
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary w-full mt-4">
            {isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader />
                Loading...
              </div>
            ): "Sign in"}
          </Button>

          <p className="text-sm text-light-2 text-center mt-4">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-primary-500 font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>

  )
}

export default SigninForm
