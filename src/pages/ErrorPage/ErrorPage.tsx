import { Button } from "flowbite-react";
// import gif from "../../assets/giphy.gif";

import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <div className="flex justify-center py-10">
        {/* <img src={gif} alt="" /> */}
      </div>
      <Link to="/">
        <div className="flex justify-center py-10">
          <Button>Go Home</Button>
        </div>
      </Link>
    </div>
  );
};

export default ErrorPage;