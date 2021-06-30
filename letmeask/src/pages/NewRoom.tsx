import ilustrationImg from "../assets/illustration.svg";
import logoImg from "../assets/logo.svg";
import "../styles/auth.scss";
import { Button } from "../components/button";
import { Link } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";


export function NewRoom() {
    // const { user } = useAuth();

    return (
        <div id="page-auth">
            <aside>
                <img src={ilustrationImg} alt="Ilustracao simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire suas duvida da sua audiencia em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <h2>Criar uma nova sala</h2>
                    <form>
                        <input type="text" placeholder="Nome da sala " />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}