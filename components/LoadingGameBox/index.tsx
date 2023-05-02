import { AiOutlinePaperClip } from 'react-icons/ai';
import { ElipsisLoader } from '../ElipsisLoader';

interface MessageBoxInterface {
  message: string;
  link?: string;
}
export const LoadingMessageBox = ({ message, link }: MessageBoxInterface): JSX.Element => {
  return (
    <div className="text-onyx flex flex-col items-center justify-center">
      <p>{message}</p>
      {link ? (
        <button
          className="flex flex-row rounded-md border-box border-2 p-1 border-onyx active:bg-onyx active:text-skin justify-center items-center relative w-48"
          onClick={(e) => {
            e.preventDefault();
            navigator.clipboard.writeText(link);
          }}
        >
          <p className="mr-8 overflow-hidden flex">{link}</p>{' '}
          <AiOutlinePaperClip className="flex position absolute right-1" />
        </button>
      ) : null}
      <ElipsisLoader />
    </div>
  );
};
