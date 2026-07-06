import { Helmet } from 'react-helmet-async';

const SEO = (metadata: {
  title: string;
  description: string;
  name: string;
  type: string;
}) => {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <meta name="description" content={metadata.description} />
      {/* End standard metadata tags */}
      {/* Facebook tags */}
      <meta property="og:type" content={metadata.type} />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      {/* End Facebook tags */}
    </Helmet>
  );
};

export default SEO;
