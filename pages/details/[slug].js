import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useRouter } from "next/router";
import DisqusComments from "../../components/Comments";
import { BsArrowLeft } from "react-icons/bs";

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
    content_type: "bridalChronicles",
  });

  return {
    props: {
      data: res?.items[0]?.fields,
      id: res?.items[0],
      slug: slug,
    },
  };
}
