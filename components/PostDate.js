import {format, parseISO, toDate} from 'date-fns';

export const PostDate = ({dateString}) => {
    const date = parseISO(dateString);
    return(
            <time dateTime={dateString}>{format(date, 'MMMM d, yyyy')}</time>
    );
}
export default PostDate;