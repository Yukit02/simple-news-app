/* eslint-disable jsx-a11y/alt-text */
import styles from "./index.module.scss";
import moment from "moment";
import Props from "../types";

const PickupArticle: React.FC<Props> = ({ articles }) => {
  const getTime = (publishedAt: string): string|number => {
    const time = moment(publishedAt || moment.now()).fromNow().slice(0, 1)

    return time == "a" ? 1 : time
  }
  return (
    <section className={styles.pickup}>
      <h1 className={styles.article__heading}>PickUp</h1>
      {articles.map((article, index) => {
        return (
          <a href={article.url} key={index} target="_blank" rel="noopener noreferrer">
            <article className={styles.article__main}>
              <div className={styles.article__title}>
                <p>{article.title}</p>
                <p className={styles.article__time}>
                  {getTime(article.publishedAt)}時間前
                </p>
              </div>
              {article.urlToImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={index}
                  src={article.urlToImage}
                  className={styles.article__img}
                />
              )}
            </article>
          </a>
        );
      })}
    </section>
  );
};

export default PickupArticle;