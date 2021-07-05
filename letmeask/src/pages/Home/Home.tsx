import ilustrationImg from "../../assets/illustration.svg";
import logoImg from "../../assets/logo.svg";
import googleIconImg from "../../assets/google-icon.svg";
import "../../styles/auth.scss";
import { useHistory } from "react-router";
import { database } from "../../service/firebase";
import { FormEvent } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { Button } from "../../components/Button";

export function Home() {

    const history = useHistory();
    const { user, signInWithGoogle } = useAuth()
    const [rommCode, setRoomCode] = useState('');

    const handleCreateRoom = async () => {
        if (!user) {
            await signInWithGoogle()
        }

        history.push('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (rommCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref(`room/${rommCode}`).get();

        if (!roomRef.exists()) {
            alert("Room does not exist");
            return;
        }

        if(roomRef.val().endedAt){
            alert('Room already closed');
            return;
        }

        history.push(`rooms/${rommCode}`);
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
                    <form onSubmit={handleJoinRoom}>
                        <input type="text" placeholder="Digite o codigo da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={rommCode} />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    );
}