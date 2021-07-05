import { ReactNode } from "react";
import cx from "classnames";
import "./styles.scss";

type QuestionProps = {
    content: string;
    author:{
        name: string;
        avatar:string;
    }
    children?: ReactNode;
    isHighLigthed?: boolean;
    isAnsewered?: boolean;
}

export function Question({content, author, children, isHighLigthed=false,
    isAnsewered=false}: QuestionProps) { 
    return (
        <div className={cx('question',{ansewered: isAnsewered},{highLigthed: isHighLigthed && !isAnsewered})}>
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    );
}