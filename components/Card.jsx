import { useRouter } from 'next/router';


const Card = ({ item }) => {

  const router = useRouter();
  const date = item.fields.date.split('T')[0].split('-').reverse().join('-');

  return (
    <div className="card_container">
      <div className="img_container">
        <img src={`https://${item?.fields?.thumbnail?.fields?.file?.url}`} alt={item.fields.title} className="event-img" />
      </div>
      <h4 className='date'>{date}</h4>
      <div className="event-details">
        <h2>{item.fields.title}</h2>
        <p>{item.fields.excerpt.substring(0, 80)}...</p>
        <div className="card_footer">
          <span>
            <strong>Author: </strong> 
            <em>{item.fields.author}</em>
          </span>
          <button onClick={() => router.push(`/details/${item.fields.slug}`)} className="btn">See more</button>
        </div>
        
      </div>
    </div>
  )
}

export default Card