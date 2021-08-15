import Head from "next/head";
import { useRouter } from "next/router";
import Article from '../../components/article'
import Nav from '../../components/nav'
import MainLayout from "../../layouts/index";
import styles from "../../styles/Home.module.scss";
import WeatherNews from "../../components/weather-news";
import PickupArticle from "../../components/pickup-article";

function Topic(props) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <Head>
        <title>Simple News - {props.title.toUpperCase()}</title>
      </Head>
      <div className={styles.contents}>
        <div className={styles.nav} >
          <nav>
            <Nav />
          </nav>
        </div>
        <div className={styles.blank} />
        <div className={styles.main} style={{marginRight:"10%"}}>
          <Article title={props.title} articles={props.topicArticles} />
        </div>

        <div className={styles.aside}>
          <WeatherNews weatherNews={props.weatherNews} />
          <PickupArticle articles={props.pickupArticles} />
        </div>
      </div>
    </MainLayout>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const pageSize = 5;
  const sortBy = "popularity"

  const topicRes = await fetch(
    `https://newsapi.org/v2/top-headlines?country=jp&category=${params.id}&country=jp&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
  );
  const topicJson = await topicRes.json();
  const topicArticles = await topicJson.articles;

  const title = params.id;

  // OpenWeatherMapの天気の情報を取得
  const weatherRes = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=35.4122&lon=139.4130&units=metric&exclude=hourly,minutely&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
  );
  const weatherJson = await weatherRes.json();
  const weatherNews = weatherJson;

  // NewsAPIのピックアップ記事の情報を取得
  const pickupKeyword = "software";
  const pickupRes = await fetch(
    `https://newsapi.org/v2/everything?q=${pickupKeyword}&language=jp&sortBy=${sortBy}&pageSize=${pageSize}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
  );
  const pickupJson = await pickupRes.json();
  const pickupArticles = pickupJson?.articles;

  return {
    props: { topicArticles, title, weatherNews, pickupArticles },
    revalidate: 60 * 10,
  };
}

export default Topic;