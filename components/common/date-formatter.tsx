import { parseISO, format } from 'date-fns'

type Props = {
  dateString?: string
  date?: Date
}

const DateFormatter = ({ dateString, date }: Props) => {

  if (date) return <time dateTime={dateString}>{format(date, 'LLLL	d, yyyy')}</time>
  else return <>{dateString ? dateString : ""}</>
  // return <>{dateString}</>
  // return <time dateTime={dateString}>{format(date, 'LLLL	d, yyyy')}</time>
}

export default DateFormatter
