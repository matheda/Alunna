import React from 'react';
import Svg, { G, Path, Rect, PathProps } from 'react-native-svg';

import { colors } from '../themes';

interface IconProps extends PathProps {
  color?: any;
  size?: number;
  isLiked?: boolean;
}

const EyeOff: React.FC<IconProps> = ({
  size, color
}) => {
  return (
    <Svg
      fill="none"
      width={size || 20} height={size || 20}
      viewBox="0 0 24 24"
      stroke={color || colors.teal}
      strokeWidth={1.4}
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.875 18.825A10.05 10.05 0 0 1 12 19c-4.478 0-8.268-2.943-9.543-7A9.97 9.97 0 0 1 4.02 8.971m5.858.908a3 3 0 1 1 4.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88 6.59 6.59m7.532 7.532 3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0 1 12 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 0 1-4.132 5.411m0 0L21 21"
      />
    </Svg>
  )
}


const Eye: React.FC<IconProps> = ({
  size, color
}) => {
  return (
    <Svg
      fill="none"
      width={size || 20} height={size || 20}
      viewBox="0 0 24 24"
      stroke={color || colors.teal}
      strokeWidth={1.4}
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
      />
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </Svg>
  )
}

const Verified: React.FC<IconProps> = ({
  size, color
}) => {
  return (
    <Svg width={size || 16} height={size || 16} viewBox="0 0 16 16">
      <G data-name={143}>
        <Path
          d="M7 .314a1.751 1.751 0 012 0c1.428 1 1.121.908 2.89.9a1.688 1.688 0 011.62 1.133c.542 1.618.351 1.368 1.786 2.363a1.592 1.592 0 01.619 1.829c-.551 1.611-.553 1.3 0 2.921a1.592 1.592 0 01-.619 1.829c-1.434.995-1.244.745-1.786 2.363a1.69 1.69 0 01-1.619 1.131c-1.769-.006-1.462-.1-2.89.9a1.749 1.749 0 01-2 0c-1.429-1-1.121-.909-2.89-.9a1.69 1.69 0 01-1.621-1.131c-.541-1.62-.355-1.369-1.787-2.363A1.593 1.593 0 01.085 9.46c.551-1.612.553-1.3 0-2.921A1.593 1.593 0 01.7 4.71c1.431-.993 1.245-.741 1.787-2.363a1.688 1.688 0 011.622-1.13c1.764.005 1.453.107 2.89-.9"
          fill={color || colors.purple}
          fillRule="evenodd"
        />
        <G
          transform="rotate(45 .908 12.656)"
          fill="#fff">
          <Rect
            data-name="Ret\xE2ngulo 6"
            width={1.238}
            height={7.426}
            rx={0.619}
            transform="rotate(180 2.2 3.713)"
          />
          <Rect
            width={1.1}
            height={4.4}
            rx={0.55}
            transform="rotate(90 -.964 5.364)"
          />
        </G>
      </G>
    </Svg>
  );
}

const ArrowLeft: React.FC<IconProps> = ({
  color
}) => {
  return (
    <Svg fill="none" width={16.5} height={16.5} viewBox="0 0 24 24" stroke={color || colors.betaThick}>
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 19L3 12M3 12L10 5M3 12L24 12"
      />
    </Svg>
  )
}

const Heart: React.FC<IconProps> = ({
  color
}) => {
  return (
    <Svg width={16.5} height={16.5} viewBox="0 0 17.636 16.167">
      <Path
        d="M8.818 2.524C7.357-1.443 0-.854 0 5.146c0 2.989 2.249 6.967 8.818 11.02 6.57-4.053 8.818-8.031 8.818-11.02 0-5.965-7.348-6.613-8.818-2.622z"
        fill={color || colors.blue}
      />
    </Svg>
  );
}

const House: React.FC<IconProps> = ({
  color
}) => {
  return (
    <Svg width={16.5} height={16.5} viewBox="0 0 18.563 18.563">
      <Path
        d="M12.375 15.469a3.094 3.094 0 113.094 3.094 3.094 3.094 0 01-3.094-3.094zM0 15.469a3.094 3.094 0 113.094 3.094A3.094 3.094 0 010 15.469zM12.375 3.094a3.094 3.094 0 113.094 3.094 3.094 3.094 0 01-3.094-3.094zM0 3.094a3.094 3.094 0 113.094 3.093A3.094 3.094 0 010 3.094z"
        fill={color || colors.blue}
      />
    </Svg>
  );
}

const Rain: React.FC<IconProps> = ({
  color
}) => {
  return (
    <Svg width={9.95} height={19} viewBox="0 0 10.661 18.813">
      <Path
        d="M10.631 6.452a.313.313 0 00-.284-.181H6.631l3.667-5.79A.313.313 0 0010.033 0H5.016a.314.314 0 00-.28.173l-4.7 9.406a.314.314 0 00.28.454H3.54L.027 18.377a.314.314 0 00.529.324L10.587 6.787a.314.314 0 00.044-.335z"
        fill={color || colors.blue}
      />
    </Svg>
  );
}

const Likes: React.FC<IconProps> = ({
  isLiked,
  ...props
}) => {
  return (
    <Svg width={16.8} height={15} viewBox="0 0 19 17.552">
      <Path
        d="M9.5 3.128C8.008-.921.5-.32.5 5.804c0 3.048 2.3 7.111 9 11.248 6.7-4.137 9-8.2 9-11.248 0-6.088-7.5-6.752-9-2.676z"
        {...props}
      />
    </Svg>
  );
}

const Search: React.FC<IconProps> = ({
  color
}) => {
  return (
    <Svg width={17} height={17} fill="none" viewBox="0 0 24 24" stroke={color || colors.beta}>
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </Svg>
  );
}

const More: React.FC<IconProps> = ({
  color
}) => {
  return (
    <Svg
      fill="none"
      viewBox="0 0 24 24"
      stroke={color || colors.beta}
      width={20} height={20}
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.4}
        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
      />
    </Svg>
  );
}

const Location: React.FC<IconProps> = () => {
  return (
    <Svg fill="none" width={14} height={14} viewBox="0 0 24 24" stroke={colors.teal}>
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.4}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </Svg>
  );
}

const Picture: React.FC<IconProps> = () => {
  return (
    <Svg fill="none" viewBox="0 0 24 24" width={24} height={24} stroke={colors.betaThick}>
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </Svg>
  )
}

const True: React.FC<IconProps> = ({
  size, color
}) => {
  return (
    <Svg fill="none" width={size || 20} height={size || 20} viewBox="0 0 24 24" stroke={color || colors.purple}>
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.4}
        d="M5 13l4 4L19 7"
      />
    </Svg>
  );
}

const ArrowRight: React.FC<IconProps> = ({
  size, color
}) => {
  return (
    <Svg fill="none" width={size || 19} height={size || 19} viewBox="0 0 24 24" stroke={color || colors.purple}>
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.7}
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </Svg>
  )
}

const SmallArrowRight: React.FC<IconProps> = ({
  color
}) => {
  return (
    <Svg fill="none" width={17} height={17} viewBox="0 0 24 24" stroke={color || colors.purple}>
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </Svg>
  )
}

const Plus: React.FC<IconProps> = ({
  color,
  size
}) => {
  return (
    <Svg fill="none" width={size || 24} height={size || 24} viewBox="0 0 24 24" stroke={color || colors.beta}>
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </Svg>
  )
}

const Close: React.FC<IconProps> = ({
  size, color
}) => {
  return (
    <Svg width={size || 17} height={size || 17} fill="none" viewBox="0 0 24 24" stroke={color || colors.teal}>
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </Svg>
  )
}

const Profile: React.FC = () => {
  return (
    <Svg width={22} height={22} fill="none" viewBox="0 0 24 24" stroke={colors.teal}>
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.4}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </Svg>
  )
}

const Lock: React.FC = () => {
  return (
    <Svg width={22} height={22} fill="none" viewBox="0 0 24 24" stroke={colors.teal}>
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.4}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </Svg>
  )
}

export {
  Verified,
  ArrowLeft,
  Heart,
  House,
  Rain,
  Likes,
  Search,
  More,
  Location,
  Picture,
  True,
  ArrowRight,
  Plus,
  SmallArrowRight,
  Close,
  Profile,
  Lock,
  Eye,
  EyeOff
}