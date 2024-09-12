import Background from "../components/ui/Background";

const NotAuthorized = () => {
  return (
    <Background>
        <div className="bg-white shadow-md rounded-lg p-8 max-w-lg text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            403 - Not Authorized
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            You do not have permission to access this page.
          </p>
          <a
            href="/"
            className="text-blue-500 hover:text-blue-700 underline"
          >
            Go back to the homepage
          </a>
        </div>
    </Background>
  );
};

export default NotAuthorized;
