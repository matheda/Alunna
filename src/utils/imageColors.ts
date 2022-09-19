import { Image, ImageRequireSource, NativeModules } from 'react-native';
import { AndroidImageColors, IOSImageColors } from '../services/types';

const { ImageColors: RNImageColors } = NativeModules

export type ImageColorsResult = | AndroidImageColors | IOSImageColors

declare function GetColors<C extends { fallback?: string }>(
  url: string,
  config?: C
): Promise<ImageColorsResult>

interface RNImageColorsModule {
  getColors: typeof GetColors
}

const resolveImageSource = (source: string | ImageRequireSource): string => {
  if (typeof source === 'string') {
    return source
  }
  return Image.resolveAssetSource(source).uri
}

const getColors: RNImageColorsModule['getColors'] = async (source, config) => {
  const resolvedSrc = resolveImageSource(source)

  const result: ImageColorsResult = await RNImageColors.getColors(
    resolvedSrc,
    config
  )
  return result
}

export const ImageColors: RNImageColorsModule = {
  getColors
}