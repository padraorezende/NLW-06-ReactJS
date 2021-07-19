import styles from './styles.module.scss'

export function CompletedChallenges(){
    return (
        <div className ={styles.completedChallengesContainer}>
            <span>Desafios completos</span>
            <span></span>
        </div>
    );
}