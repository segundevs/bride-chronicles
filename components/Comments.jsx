import {DiscussionEmbed} from "disqus-react";

const DisqusComments = ({ id, title, slug }) => {
  const disqusShortname = "blissdavid"
  const disqusConfig = {
    url: `https://bride-chronicles.vercel.app/details/${slug}`,
    identifier: id,
    title: title
  }
  return (
    <div style={{marginTop: '50px'}}>
      <DiscussionEmbed
        shortname={disqusShortname}
        config={disqusConfig}
      />
    </div>
  )
}
export default DisqusComments;