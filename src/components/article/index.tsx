import styles from "./index.module.scss";
import moment from "moment";
import Props from "../types";

const Article: React.VFC<Props> = ({ articles, title }) => {
  const time = (publishedAt: string): string => {
    return moment(publishedAt || moment.now()).fromNow().slice(0, 1);
  }

  const articleTitle = (): string => {
    return title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()
  }

  return (
    <section className={styles.article}>
      <div className={styles.article__heading}>
        <h1>{articleTitle()}</h1>
      </div>

      {articles.map((article, index) => {
        return (
          <a href={article.url} key={index} target="_blank" rel="noopener noreferrer">
            <article className={styles.article__main}>
              <div className={styles.article__title}>
                <p>
                  {article.title}
                </p>

                <p className={styles.article__time}>
                  {time(article.publishedAt)}時間前
                </p>
              </div>

              {article.urlToImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={index}
                  src={article.urlToImage}
                  className={styles.article__img}
                  alt={`${article.title} image`}
                />
              )}
            </article>
          </a>
        );
      })}
    </section>
  );
};

export default Article;