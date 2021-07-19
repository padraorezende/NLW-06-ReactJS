import { Head } from 'next/document'
import { CompletedChallenges } from '../components/CompletedChallanges/CompletedChallenges'
import { Countdown } from '../components/Countdown/Countdown'
import { ExperienceBar} from '../components/ExperienceBar/ExperienceBar'
import { Profile } from '../components/Profile/Profile'
import  styles from '../styles/home.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Incio | move.it</title>
      </Head>
      
      <ExperienceBar />

      <section>
        <div>
          <Profile/>
          <CompletedChallenges />
          <Countdown/>
        </div>
        <div>

        </div>
      </section>
    </div>
  )
}
