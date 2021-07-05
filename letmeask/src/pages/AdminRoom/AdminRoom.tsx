import { useHistory, useParams } from "react-router-dom";
import LogoImg from "../../assets/logo.svg"
import { Button } from "../../components/Button";
import { Question } from "../../components/Question";
import { RoomCode } from "../../components/RoomCode";
// import { useAuth } from "../../hooks/useAuth";
import { useRoom } from "../../hooks/useRoom";
import "../../styles/room.scss";
import deleteImg from "../../assets/delete.svg"
import checkImg from "../../assets/check.svg"
import answerImg from "../../assets/answer.svg"
import { database } from "../../service/firebase";




type RoomParams = {
    id: string;
}

export function AdminRoom() {
    // const { user } = useAuth();
    const params = useParams<RoomParams>();
    const history = useHistory()
    const roomId = params.id;
    const { title, questions } = useRoom(roomId)

    async function handleEndRoom() {
        await database.ref(`/rooms/${roomId}`).update({
            endedAt: new Date(),
        })

        history.push('/');
    }

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm("Tem certeza que voce deseja excluir esta pergunta?")) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    async function handleCheckQuestionAsAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnsewered: true,
        });
    }

    async function handleHighLightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighLigthed: true,
        });
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={LogoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button isOutLined={true} onClick={handleEndRoom}>Encerrar Sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} perguta(s)</span>}
                </div>

                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question key={question.id} content={question.content} author={question.author} isAnsewered={question.isAnsewered} isHighLigthed={question.isHighLigthed}>
                                {!question.isAnsewered && (
                                    <>
                                        <button type="button" onClick={() => handleCheckQuestionAsAnswered(question.id)}>
                                            <img src={checkImg} alt="Marcar pergunta como respondida" />
                                        </button>
                                        <button type="button" onClick={() => handleHighLightQuestion(question.id)}>
                                            <img src={answerImg} alt="Dar destaque a pergunta" />
                                        </button>
                                    </>
                                )}
                                <button type="button" onClick={() => handleDeleteQuestion(question.id)}>
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>

                            </Question>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}