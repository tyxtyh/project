import React from 'react';
import './Reviews.css';

const Reviews = () => {
  const reviews = [
    {
      name: "Александр",
      surname: "Петров",
      date: "15 ноября 2024",
      text: "Отличный электротрицикл! Качество на высоте, доставка быстрая. Рекомендую всем, кто ищет надежный транспорт для города."
    },
    {
      name: "Мария",
      surname: "Сидорова",
      date: "8 ноября 2024",
      text: "Покупала грузовой трицикл для бизнеса. Очень довольна качеством и сервисом. Персонал помог с выбором и оформлением."
    },
    {
      name: "Дмитрий",
      surname: "Козлов",
      date: "2 ноября 2024",
      text: "Заказал спортивную модель. Превысил все ожидания! Скорость, маневренность - все на высоте. Спасибо за качественный продукт!"
    },
    {
      name: "Елена",
      surname: "Морозова",
      date: "28 октября 2024",
      text: "Покупала детский трицикл для сына. Безопасность и качество на первом месте. Ребенок в восторге, а я спокойна за его безопасность."
    },
    {
      name: "Сергей",
      surname: "Волков",
      date: "20 октября 2024",
      text: "Премиум модель оправдала все ожидания. Комфорт, дизайн, функциональность - все на высшем уровне. Стоит своих денег!"
    },
    {
      name: "Анна",
      surname: "Новикова",
      date: "12 октября 2024",
      text: "Туристический трицикл идеален для дальних поездок. Батарея держит долго, комфорт отличный. Рекомендую для путешествий!"
    }
  ];

  return (
    <section className="reviews" id="reviews">
      <div className="container">
        <h2 className="section-title">Отзывы наших клиентов</h2>
        
        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <div key={index} className="review-card">
              <div className="review-header">
                <div className="review-author">
                  <div className="author-avatar">
                    {review.name.charAt(0)}{review.surname.charAt(0)}
                  </div>
                  <div className="author-info">
                    <div className="author-name">
                      {review.name} {review.surname}
                    </div>
                    <div className="review-date">{review.date}</div>
                  </div>
                </div>
                <div className="review-rating">
                  ⭐⭐⭐⭐⭐
                </div>
              </div>
              <div className="review-text">
                {review.text}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Reviews;
