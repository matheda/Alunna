import { ImageColors } from './imageColors';
import { differenceInHours, differenceInMinutes, differenceInSeconds, format, isYesterday, parseISO } from 'date-fns';

export function secondsToHms(d: number) {
  d = Number(d);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);
  return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
};

export function nFormatter(num: number) {
  const replaceFun = (value: number, letter: string) => {
    return (
      (num / value).toFixed(1).replace(/\.0$/, '').replace('.', ',') +
      `${letter}`
    );
  };

  if (num >= 1000000000) return replaceFun(1000000000, 'B');
  if (num >= 1000000) return replaceFun(1000000, 'M');
  if (num >= 1000) return replaceFun(1000, 'K');

  return num;
};

export function findTags(value: string) {
  let regexp = /\B\#\w\w+\b/g;
  let result = value.match(regexp);

  if (result) {
    result = result.map(s => s.trim());
    return result;
  }

  return [];
};

export async function getProminent(url: string) {
  if (!url) return '#020102';

  const colors: any = await ImageColors.getColors(url, {
    fallback: '#852FD9',
  });

  if (colors.platform === 'android') return colors.average;

  return colors.background;
};

export const urlRegex =
  /(https?:\/\/|www\.)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.(xn--)?[a-z0-9-]{2,20}\b([-a-zA-Z0-9@:%_\+\[\],.~#?&\/=]*[-a-zA-Z0-9@:%_\+\]~#?&\/=])*/i;


export function hasWhiteSpace(value: string) {
  return /\s/g.test(value);
};

export function atFormatter(value: any) {

  const pointer = value ?? new Date().toISOString();

  const inMinutes = differenceInMinutes(new Date(), parseISO(pointer))
  const inSeconds = differenceInSeconds(new Date(), parseISO(pointer))
  const inHours = differenceInHours(new Date(), parseISO(pointer))

  const isYester: boolean = isYesterday(pointer);

  if (inMinutes < 1) return inSeconds + 's'
  if (inMinutes <= 59) return inMinutes + 'm'
  if (inMinutes <= 720) return inHours + 'h ago'
  if (isYester) return 'Yesterday ' + format(parseISO(pointer), 'HH') + 'h'
  // if (inMinutes <= 1440) return format(parseISO(pointer), 'HH:mm')

  return format(parseISO(pointer), 'MMM dd')
};