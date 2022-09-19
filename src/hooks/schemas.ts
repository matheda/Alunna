import { string } from 'zod';

const MIN_USERNAME_LEGTH: number = 3;
const MAX_USERNAME_LEGTH: number = 16;

const MIN_NAME_LEGTH: number = 1;
const MAX_NAME_LEGTH: number = 48;

export const restrictedUsernames = new Set([
  'admin',
  'administrator',
  'help',
  'mod',
  'moderator',
  'root',
  'support',
  'home',
  'explorer',
  'discover',
  'profile'
])

export const replyTextSchema = string()
  .min(1, 'Post must include text.')
  .max(128, 'Post text is too long.');

export const postTextSchema = string()
  .min(1, 'Post must include text.')
  .max(256, 'Post text is too long.');

export const baseUsernameSchema = string()
  .min(MIN_USERNAME_LEGTH, `Username must be longer than ${MIN_USERNAME_LEGTH} characters`)
  .max(MAX_USERNAME_LEGTH, `Username cannot be longer than ${MAX_USERNAME_LEGTH} characters.`)
  // alphanumeric characters, underscore
  .regex(/[A-Z0-9][A-Z0-9]+$/i, 'Invalid characters in username')

export const usernameSchema = baseUsernameSchema.refine((s) => {
  return !restrictedUsernames.has(s.toLowerCase())
}, 'This username is unavailable.');

export const passwordSchema = string()
  .min(6, 'Password must be longer than 6 characters')
  .max(64)
  .nonempty();

export const nameSchema = string()
  .min(MIN_NAME_LEGTH, `Name must be longer than ${MIN_NAME_LEGTH} characters.`)
  .max(MAX_NAME_LEGTH, `Name cannot be longer than ${MAX_NAME_LEGTH} characters.`);

export const locationSchema = string().max(64, 'Location is too long.').optional().default('');

export const bioSchema = string().max(128, 'Bio is too long.').optional().default('');

export const avatarSchema = string().url().max(256, 'Avatar is too long.').default('');

export const linkSchema = string().max(64, 'Link is too long.').optional().default('');

export const emailSchema = string()
  .max(128, 'Email is too long.')
  .email('Enter a valid email address');

export const birthdaySchema = string().optional();
