import { Helmet } from "react-helmet-async";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem 
} from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/api/sign-up";
import { signIn } from "@/api/sign-in"

const signUpSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    passwordConfirm: z.string(),
    numero: z.string(),
    cep: z.string().min(8),
    roleBody: z.string().default('Tutor'),
    contato: z.string(),
    avataBody: z.string().optional()
})

type SignUnSchema = z.infer<typeof signUpSchema>

export function SignUp() {
    const { register, handleSubmit, control } = useForm<SignUnSchema>()
    const navigation = useNavigate()

    const { mutateAsync: signUpUser } = useMutation({
        mutationFn: signUp
    })

    const { mutateAsync: signInUser } = useMutation({
        mutationFn: signIn
    })

    async function handleSignUn({ email, password, passwordConfirm, cep, contato, name, numero, roleBody }: SignUnSchema) {
        if ( password !== passwordConfirm ) {
            toast.error('A senha não confere', {
                duration: 5000
            })
            return
        }
        try {
            await signUpUser({ email, password, cep, contato, name, numero, roleBody })

            await signInUser({ email, password })
            navigation('/')
        } catch (err) {
            toast.error('erro')
        }
    }

    return (
        <div className="flex flex-col items-center gap-8">
            <Helmet title="Sign in" />
            <h2 className="font-light text-[25px]">Bem-vindo ao cadastro de usuario</h2>

            <form onSubmit={handleSubmit(handleSignUn)} className="space-y-2" >
                <div className="space-y-2 w-[30rem]">
                    <Input className="bg-muted-foreground/40 text-muted-foreground" id="name" placeholder="Nome" type="text" {...register('name')} />
                </div>
                <div className="space-y-2 w-[30rem]">
                    <Input className="bg-muted-foreground/40 text-muted-foreground" id="Email" placeholder="E-mail" type="text" {...register('email')} />
                </div>
                <div className="w-[30rem]">
                    <Input className="bg-muted-foreground/40 text-muted-foreground" id="password" placeholder="Senha" type="password" {...register("password")} />
                </div>
                <div className="w-[30rem]">
                    <Input className="bg-muted-foreground/40 text-muted-foreground" id="passwordConfirme" placeholder="Confirmar senha" type="password" {...register("passwordConfirm")} />
                </div>
                <Controller
                    control={control}
                    name="roleBody"
                    render={( {field: { onChange, value } }) => (
                        <Select onValueChange={onChange} defaultValue={value}>
                            <SelectTrigger className="bg-muted-foreground/40 text-muted-foreground">
                                <SelectValue placeholder="Escolha qual seu tipo de usuario" />
                            </SelectTrigger>
                            <SelectContent className="bg-muted-foreground text-primary-foreground">
                                <SelectItem value="Ong">Ong</SelectItem>
                                <SelectItem value="Tutor">Tutor</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
                <div className="space-y-2 w-[30rem]">
                    <Input className="bg-muted-foreground/40 text-muted-foreground" id="cep" placeholder="Cep" type="text" {...register('cep')} />
                </div>
                <div className="space-y-2 w-[30rem]">
                    <Input className="bg-muted-foreground/40 text-muted-foreground" id="number" placeholder="Número" type="text" {...register('numero')} />
                </div>
                <div className="space-y-2 w-[30rem]">
                    <Input className="bg-muted-foreground/40 text-muted-foreground" id="phone" placeholder="Contato" type="text" {...register('contato')} />
                </div>
                <Button className="w-full" type="submit">ENTRAR</Button>
            </form>
            <Link to={"/sign-in"} className="hover:text-muted-foreground">Voltar ao login</Link>
        </div>
    )
}