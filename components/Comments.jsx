import {DiscussionEmbed} from "disqus-react";

const DisqusComments = ({ id, title, slug }) => {
  const disqusShortname = "blisspraise"
  const disqusConfig = {
    url: `https://engagedliving.vercel.app/details/${slug}`,
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