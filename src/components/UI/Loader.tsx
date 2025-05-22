import { type JSX } from 'react';
import Spinner from './Spinner';

interface LoaderProps {
  fullScreen?: boolean;
  text?: string;
  spinnerSize?: 'sm' | 'md' | 'lg';
  spinnerColor?: 'primary' | 'secondary' | 'white';
}

const Loader = ({
  fullScreen = false,
  text = 'Loading...',
  spinnerSize = 'md',
  spinnerColor = 'primary'
}: LoaderProps): JSX.Element => {

  // Base container classes
  const containerClasses = "flex flex-col items-center justify-center";

  // Add fullScreen classes if needed
  const fullScreenClasses = fullScreen
    ? "fixed inset-0 bg-white bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-80 z-50"
    : "p-4";

  return (
    <div className={`${containerClasses} ${fullScreenClasses}`}>
      <Spinner size={spinnerSize} color={spinnerColor} />
      {text && (
        <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm font-medium">
          {text}
        </p>
      )}
    </div>
  );
};

export default Loader;
