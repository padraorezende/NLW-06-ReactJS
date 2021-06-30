import ilustrationImg from "../assets/illustration.svg";
import logoImg from "../assets/logo.svg";
import googleIconImg from "../assets/google-icon.svg";
import "../styles/auth.scss";
import { Button } from "../components/button";
import { useHistory } from "react-router";
import { auth, firebase } from "../service/firebase";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useAuth } from "../hooks/useAuth";

export function Home() {

    const history = useHistory();
    const { user, signInWithGoogle } = useAuth()

    const handleCreateRoom = async () => {
        if (!user) {
            await signInWithGoogle()
        }

        history.push('/rooms/new');
    }

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
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form>
                        <input type="text" placeholder="Digite o codigo da sala" />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    );
}