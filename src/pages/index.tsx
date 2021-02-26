import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import { ChallengeBox } from '../components/ChallengeBox';
import styles from '../styles/pages/Home.module.css';

import Head from 'next/head';
import { CountdownProvider } from '../contexts/CountdownContext';
import { GetServerSideProps } from 'next';
import { ChallengeProvider } from '../contexts/ChallengesContext';

interface HomeProps {
  level: number
  currentExperience: number
  challengesCompleted: number
}

export default function Home({ level, challengesCompleted, currentExperience }: HomeProps) {
  return (
    <ChallengeProvider
      level={level}
      currentExperience={currentExperience}
      challengesCompleted={challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <ChallengeBox />
            <div>

            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengeProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { level, currentExperience, challengesCompleted } = context.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}