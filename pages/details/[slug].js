import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useRouter } from "next/router";
import DisqusComments from "../../components/Comments";
import { BsArrowLeft } from "react-icons/bs";
import {
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "next-share";

const Details = ({ data, id, slug }) => {
  const { content, title, excerpt, author, quote } = data;

  const date = data?.date.split("T")[0].split("-").reverse().join("-");
  const router = useRouter();

  return (
    <div className="details">
      <div className="back" onClick={() => router.push("/")}>
        <BsArrowLeft />
      </div>
      <h2>{title}</h2>
      <p className="excerpt">{excerpt}</p>
      <div className="details_img">
        <img
          src={`https://${data?.featuredImage?.fields?.file?.url}`}
          alt={title}
        />
      </div>
      <div className="details_content">
        {documentToReactComponents(content)}
      </div>
      <span className="author">
        Posted by <strong>{author}</strong> on {date}
      </span>
      <div className="social">
        <p className="social_text">Enjoyed it? Please share</p>
        <div className="social_icons">
          <FacebookShareButton
            url={`https://bride-chronicles.vercel.app/details/${slug}`}
            quote={quote}
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TelegramShareButton
            url={`https://bride-chronicles.vercel.app/details/${slug}`}
            title={title}
          >
            <TelegramIcon size={32} round />
          </TelegramShareButton>
          <TwitterShareButton
            url={`https://bride-chronicles.vercel.app/details/${slug}`}
            title={title}
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>

          <WhatsappShareButton
            url={`https://bride-chronicles.vercel.app/details/${slug}`}
            title={title}
            separator=":: "
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </div>
      </div>
      <DisqusComments id={id?.sys?.id} title={title} slug={slug} />
    </div>
  );
};

export default Details;

export async function getServerSideProps(context) {
  const client = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
  });

  const {
    params: { slug },
  } = context;

  const res = await client.getEntries({
    "fields.slug": slug,
    content_type: "wedding",
  });

  return {
    props: {
      data: res?.items[0]?.fields,
      id: res?.items[0],
      slug: slug,
    },
  };
}
