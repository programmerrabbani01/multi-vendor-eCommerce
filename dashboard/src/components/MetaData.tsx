import { Helmet } from "react-helmet";

interface MetaDataProps {
  title: string;
}

const MetaData: React.FC<MetaDataProps> = ({ title }) => {
  return (
    <>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{title}</title>
        </Helmet>
      </div>
    </>
  );
};

export default MetaData;
