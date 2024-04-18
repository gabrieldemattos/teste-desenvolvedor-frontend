interface ErrorMessageProps {
  error: string;
}

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return <p className="error-message">{error}</p>;
};

export default ErrorMessage;
