import ilustrationImg from "../../assets/illustration.svg";
import logoImg from "../../assets//logo.svg";
import "../../styles/auth.scss";
import { Button } from "../../components/Button";
import { Link, useHistory } from "react-router-dom";
import { FormEvent } from "react";
import { useState } from "react";
import { database } from "../../service/firebase";
import { useAuth } from "../../hooks/useAuth";


export function NewRoom() {
    const { user } = useAuth();
    const history = useHistory()
    const [newRoom, setNewRoom] = useState('');


    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if(newRoom.trim() === ''){
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })

        history.push(`/room/${firebaseRoom.key}`)
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
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input type="text"
                            placeholder="Nome da sala "
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom} />
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