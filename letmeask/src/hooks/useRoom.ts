import { useEffect } from "react";
import { useState } from "react";
import { database } from "../service/firebase";
import { useAuth } from "./useAuth";

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isHighLigthed: boolean;
    isAnsewered: boolean;
    likes: Record<string, {
        authorId:string;
    }>

}>

type QuestionType = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isHighLigthed: boolean;
    isAnsewered: boolean;
    likeCount: number;
    likeId: string | undefined;
}

export function useRoom(roomId: string){
    const {user} = useAuth();
    const [questions, setQuestions] = useState<QuestionType[]>([])
    const [title, setTitle] = useState('');

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.on('value', room => {
            const databaseRoom = room.val();
            const FirebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

            const parseQuestions = Object.entries(FirebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighLigthed: value.isHighLigthed,
                    isAnsewered: value.isAnsewered,
                    likeCount: Object.values(value.likes ?? {}).length,
                    likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],

                }
            })

            setTitle(databaseRoom.title);
            setQuestions(parseQuestions)
        })

        return () => {
            roomRef.off('value');
        }
    }, [roomId, user?.id]);

    return{questions, title}
    
}