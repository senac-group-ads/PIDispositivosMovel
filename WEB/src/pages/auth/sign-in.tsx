import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export function SignIn() {
    return (
        <div className="flex flex-col items-center gap-8">
            <Helmet title="Sign in" />
            <h2 className="font-light text-[25px]">Bem-vindo</h2>

            <form className="space-y-4" >
                <div className="space-y-2 w-[30rem]">
                    <Input className="bg-muted-foreground/40 text-muted-foreground" id="Email" placeholder="E-mail" type="text" />
                </div>
                <div className="w-[30rem]">
                    <Input className="bg-muted-foreground/40 text-muted-foreground" id="Senha" placeholder="Senha" type="password" />
                </div>
                <Button className="w-full" type="submit">ENTRAR</Button>
            </form>
            <p>Não tem cadastro? <Link to={"/sign-up"} className="hover:text-muted-foreground text-destructive">Clique aqui</Link> e se cadastre agora</p>
        </div>
    )
}