import { type JSX } from 'react';
import ImageButton from './ImageButton.tsx';
import GifButton from './GifButton.tsx';
import PollButton from './PollButton.tsx';
import EmojiButton from './EmojiButton.tsx';
import ScheduleButton from './ScheduleButton.tsx';
import LocationButton from './LocationButton.tsx';

const MediaButtons = (): JSX.Element => {
    return (
        <div className="flex items-center space-x-4 py-3 border-t border-gray-200 dark:border-gray-700 mt-2 mb-3">
            <ImageButton />
            <GifButton />
            <PollButton />
            <EmojiButton />
            <ScheduleButton />
            <LocationButton />
        </div>
    );
};

export default MediaButtons;
