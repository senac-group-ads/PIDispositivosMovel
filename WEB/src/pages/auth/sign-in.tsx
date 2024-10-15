import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const signInSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

type SignInSchema = z.infer<typeof signInSchema>

export function SignIn() {
    const { register, handleSubmit } = useForm<SignInSchema>()

    function handleSignIn({ email, password }: SignInSchema) {
        try {
            console.log(email, password)
        } catch (err) {
            toast.error('erro')
        }
    }

    return (
        <div className="flex flex-col items-center gap-8">
            <Helmet title="Sign in" />
            <h2 className="font-light text-[25px]">Bem-vindo</h2>

            <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4" >
                <div className="space-y-2 w-[30rem]">
                    <Input className="bg-muted-foreground/40 text-muted-foreground" id="Email" placeholder="E-mail" type="text" {...register('email')} />
                </div>
                <div className="w-[30rem]">
                    <Input className="bg-muted-foreground/40 text-muted-foreground" id="Senha" placeholder="Senha" type="password" {...register("password")} />
                </div>
                <Button className="w-full" type="submit">ENTRAR</Button>
            </form>
            <p>Não tem cadastro? <Link to={"/sign-up"} className="hover:text-muted-foreground text-destructive">Clique aqui</Link> e se cadastre agora</p>
        </div>
    )
}